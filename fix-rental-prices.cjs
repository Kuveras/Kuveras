/**
 * Updates each product's rentalPrice = Math.round(salePrice * 0.30)
 * where salePrice is the bold discounted/selling price displayed on the product page.
 * Formula: Rental Price = Bold Selling Price × 0.30
 * Example: Original MRP ₹11,710, Bold Selling Price ₹8,197 -> Rental Price (30%) ₹2,459
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'src', 'data', 'products.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Ensure import of calculateRentalPrice
if (!content.includes("import { calculateRentalPrice }")) {
  content = content.replace(
    "import type { Product, Coupon, Testimonial } from '../types';",
    "import type { Product, Coupon, Testimonial } from '../types';\nimport { calculateRentalPrice } from '../utils/pricing';"
  );
}

// Rename `export const PRODUCTS: Product[] = [` to `const RAW_PRODUCTS: Product[] = [` if needed
if (content.includes("export const PRODUCTS: Product[] = [")) {
  content = content.replace("export const PRODUCTS: Product[] = [", "const RAW_PRODUCTS: Product[] = [");
}

let updatedCount = 0;

// Match each product block between { and } in RAW_PRODUCTS
// and compute rentalPrice from salePrice
content = content.replace(
  /("salePrice":\s*(\d+),[\s\S]*?"originalRentalPrice":\s*)\d+(,\s*"rentalPrice":\s*)\d+/g,
  (match, prefix, salePriceStr, middle) => {
    const salePrice = parseInt(salePriceStr, 10);
    const newRental = Math.round(salePrice * 0.30);
    updatedCount++;
    return `${prefix}${salePrice}${middle}${newRental}`;
  }
);

// Update or ensure the dynamic PRODUCTS getter uses salePrice
const dynamicGetterPattern = /\/\*\*[\s\S]*?export const PRODUCTS: Product\[\] = RAW_PRODUCTS\.map\([\s\S]*?\n\}\);\n/m;
const dynamicWrapper = `/**
 * Automatically calculate rental price (Rental Price = Bold Selling Price × 0.30)
 * for all products, ensuring that whenever a product's bold selling price changes,
 * its rental price automatically updates.
 */
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((product) => {
  const p = { ...product };
  Object.defineProperty(p, 'rentalPrice', {
    get() {
      const selling = this.salePrice !== undefined && this.salePrice !== null ? this.salePrice : this.price;
      return calculateRentalPrice(selling);
    },
    set(v: number) {
      Object.defineProperty(this, 'rentalPrice', {
        value: v,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    },
    enumerable: true,
    configurable: true,
  });
  return p;
});
`;

if (dynamicGetterPattern.test(content)) {
  content = content.replace(dynamicGetterPattern, dynamicWrapper);
} else {
  content = content.replace(
    /\n\s*export const AVAILABLE_COUPONS: Coupon\[\] = \[/,
    `\n${dynamicWrapper}\nexport const AVAILABLE_COUPONS: Coupon[] = [`
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Updated ${updatedCount} products to 30% rental price based on bold selling price.`);
