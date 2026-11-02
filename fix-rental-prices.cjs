/**
 * Updates each product's rentalPrice = Math.round(price * 0.30)
 * and originalRentalPrice = price (the original/actual jewellery MRP).
 * Formula: Rental Price = Actual Jewellery Price × 0.30
 * Example: Actual Price ₹11,500 -> Rental Price (30%) ₹3,450
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

// Rename `export const PRODUCTS: Product[] = [` to `const RAW_PRODUCTS: Product[] = [`
if (content.includes("export const PRODUCTS: Product[] = [")) {
  content = content.replace("export const PRODUCTS: Product[] = [", "const RAW_PRODUCTS: Product[] = [");
}

let updatedCount = 0;

// Replace each product's rentalPrice with Math.round(price * 0.30)
content = content.replace(
  /"price":\s*(\d+),([\s\S]*?)"originalRentalPrice":\s*\d+,\s*"rentalPrice":\s*\d+,/g,
  (match, priceStr, middle) => {
    const price = parseInt(priceStr, 10);
    const newRental = Math.round(price * 0.30);
    updatedCount++;
    return `"price": ${price},${middle}"originalRentalPrice": ${price}, "rentalPrice": ${newRental},`;
  }
);

// If dynamic PRODUCTS wrapper is not yet present, insert it before AVAILABLE_COUPONS
if (!content.includes("export const PRODUCTS: Product[] = RAW_PRODUCTS.map")) {
  const dynamicWrapper = `
/**
 * Automatically calculate rental price (Rental Price = Actual Price × 0.30)
 * for all products, ensuring that whenever a product's actual price changes,
 * its rental price automatically updates.
 */
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((product) => {
  const p = { ...product };
  Object.defineProperty(p, 'rentalPrice', {
    get() {
      return calculateRentalPrice(this.price);
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
  content = content.replace(
    /\n\s*export const AVAILABLE_COUPONS: Coupon\[\] = \[/,
    `${dynamicWrapper}export const AVAILABLE_COUPONS: Coupon[] = [`
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Updated ${updatedCount} products to 30% rental price.`);
