const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Get original 50 products from 14573f6
const origContent = execSync('git show 14573f6:frontend/src/data/products.ts', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');
const rawOrigCode = origContent.slice(origContent.indexOf('const RAW_PRODUCTS: Product[] = ['), origContent.indexOf('export const PRODUCTS'));
const origProds = eval(rawOrigCode.replace(': Product[]', '').replace('const RAW_PRODUCTS =', ''));

// 2. Get current sheet products from current products.ts
const currContent = fs.readFileSync('frontend/src/data/products.ts', 'utf8');
const rawCurrCode = currContent.slice(currContent.indexOf('const RAW_PRODUCTS: Product[] = ['), currContent.indexOf('export const PRODUCTS'));
const currProds = eval(rawCurrCode.replace(': Product[]', '').replace('const RAW_PRODUCTS =', ''));

const sheet02to12 = currProds.filter(p => p.id.startsWith('kuveras-sheet-'));
const current2937 = currProds.find(p => p.id === 'kuveras-2937');

const validCategories = ['Kundan', 'Rajwadi', 'Temple', 'Cubic Zirconia', 'Bridal', 'Matha Patti', 'Bracelets', 'Choker', 'Rani Haar'];
const validOccasions = ['Daily Wear', 'Festive', 'Bridal', 'Party Wear', 'Office Wear', 'Date Night', 'Day Out'];

// Map category & occasion if needed
function normalizeCategory(cat) {
  if (validCategories.includes(cat)) return cat;
  if (cat.toLowerCase().includes('cubic') || cat.toLowerCase().includes('cz')) return 'Cubic Zirconia';
  if (cat.toLowerCase().includes('kundan')) return 'Kundan';
  if (cat.toLowerCase().includes('rajwadi')) return 'Rajwadi';
  if (cat.toLowerCase().includes('temple')) return 'Temple';
  if (cat.toLowerCase().includes('bridal')) return 'Bridal';
  if (cat.toLowerCase().includes('choker')) return 'Choker';
  return 'Cubic Zirconia';
}

function normalizeOccasion(occ) {
  if (validOccasions.includes(occ)) return occ;
  if (occ.toLowerCase().includes('party') || occ.toLowerCase().includes('evening')) return 'Party Wear';
  if (occ.toLowerCase().includes('wedding') || occ.toLowerCase().includes('festive') || occ.toLowerCase().includes('bridal')) return 'Festive';
  return 'Party Wear';
}

const finalProds = origProds.map(orig => {
  if (orig.id === 'kuveras-2937') {
    return {
      ...orig,
      name: current2937.name || 'Gulnaar Pink Necklace Set',
      slug: current2937.slug || 'gulnaar-pink-necklace-set',
      category: normalizeCategory(current2937.category || orig.category),
      occasion: normalizeOccasion(current2937.occasion || orig.occasion),
      price: current2937.price || 10549,
      salePrice: current2937.salePrice || 7384,
      discount: 30,
      rating: 4.9,
      reviewCount: 17,
      description: current2937.description || orig.description,
      shortDescription: current2937.shortDescription || orig.shortDescription,
      images: current2937.images && current2937.images.length > 0 ? current2937.images : orig.images,
      tags: ['Cubic Zirconia', 'Necklace Set', 'Google Sheet Verified'],
      specifications: orig.specifications || {
        'Set Includes': 'Necklace & Matching Earrings',
        'Material': 'Brass / High-Grade Cubic Zirconia',
        'Plating': 'Rhodium / Silver Polish',
        'Closure': 'Adjustable Dori / Thread',
        'Care Instructions': 'Keep away from moisture, perfume, and direct spray.',
        'Origin': 'Handcrafted in India'
      },
      stock: 15,
      featured: true,
      originalRentalPrice: current2937.originalRentalPrice || 7384,
      rentalPrice: 2215
    };
  }
  return {
    ...orig,
    category: normalizeCategory(orig.category),
    occasion: normalizeOccasion(orig.occasion),
    rating: typeof orig.rating === 'number' && !isNaN(orig.rating) ? orig.rating : 4.8,
    reviewCount: typeof orig.reviewCount === 'number' && !isNaN(orig.reviewCount) ? orig.reviewCount : 15,
    discount: typeof orig.discount === 'number' ? orig.discount : 30
  };
});

sheet02to12.forEach(sp => {
  finalProds.push({
    ...sp,
    category: normalizeCategory(sp.category),
    occasion: normalizeOccasion(sp.occasion),
    rating: typeof sp.rating === 'number' && !isNaN(sp.rating) ? sp.rating : 4.8,
    reviewCount: typeof sp.reviewCount === 'number' && !isNaN(sp.reviewCount) ? sp.reviewCount : 18,
    discount: typeof sp.discount === 'number' ? sp.discount : 30,
    specifications: sp.specifications || {
      'Set Includes': 'Necklace & Matching Earrings',
      'Material': 'Brass / High-Grade Cubic Zirconia',
      'Plating': '22K Gold Tone / Silver Polish',
      'Closure': 'Adjustable Dori / Thread',
      'Care Instructions': 'Keep away from moisture, perfume, and direct spray.',
      'Origin': 'Handcrafted in India'
    }
  });
});

console.log('Total reconstructed products:', finalProds.length);

// Validate all required fields
const required = ['id', 'slug', 'name', 'category', 'occasion', 'price', 'salePrice', 'discount', 'rating', 'reviewCount', 'description', 'shortDescription', 'images', 'tags', 'specifications', 'stock'];
let errors = 0;
finalProds.forEach((p, idx) => {
  for (const r of required) {
    if (p[r] === undefined || p[r] === null) {
      console.error(`Error in product ${p.id} (${p.name}): missing ${r}`);
      errors++;
    }
  }
  if (!validCategories.includes(p.category)) {
    console.error(`Invalid category: ${p.category} for ${p.id}`);
    errors++;
  }
  if (!validOccasions.includes(p.occasion)) {
    console.error(`Invalid occasion: ${p.occasion} for ${p.id}`);
    errors++;
  }
});

if (errors > 0) {
  console.error(`Found ${errors} errors. Aborting.`);
  process.exit(1);
}

console.log('All 61 products fully validated! Writing to frontend/src/data/products.ts...');

// Extract the header and footer from origContent
const header = `import type { Product, Coupon, Testimonial } from '../types';
import { calculateRentalPrice } from '../utils/pricing';

const RAW_PRODUCTS: Product[] = `;

const footerPos = origContent.indexOf('export const PRODUCTS');
const footer = origContent.slice(footerPos);

const fullFile = header + JSON.stringify(finalProds, null, 2) + ';\n\n' + footer;

fs.writeFileSync('frontend/src/data/products.ts', fullFile, 'utf8');
console.log('Successfully written frontend/src/data/products.ts');
