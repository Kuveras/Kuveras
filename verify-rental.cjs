const fs = require('fs');
const content = fs.readFileSync('frontend/src/data/products.ts', 'utf8');
const nameRe = /"name":\s*"([^"]+)"/g;
const priceRe = /"price":\s*(\d+)/g;
const salePriceRe = /"salePrice":\s*(\d+)/g;
const rentRe = /"rentalPrice":\s*(\d+)/g;

const names = [], prices = [], salePrices = [], rents = [];
let m;
while ((m = nameRe.exec(content)) !== null) names.push(m[1]);
while ((m = priceRe.exec(content)) !== null) prices.push(parseInt(m[1]));
while ((m = salePriceRe.exec(content)) !== null) salePrices.push(parseInt(m[1]));
while ((m = rentRe.exec(content)) !== null) rents.push(parseInt(m[1]));

console.log('Product                          | MRP (Strike) | Bold Selling | Rental (30%) | OK?');
console.log('─'.repeat(82));
let allOk = true;
for (let i = 0; i < names.length; i++) {
  const expected = Math.round(salePrices[i] * 0.30);
  const ok = rents[i] === expected;
  if (!ok) allOk = false;
  if (i < 10 || !ok) {
    const name = (names[i] || '').substring(0, 30).padEnd(32);
    console.log(name, '|', String(prices[i]).padStart(12), '|', String(salePrices[i]).padStart(12), '|', String(rents[i]).padStart(12), '|', ok ? 'YES' : 'NO');
  }
}
console.log('─'.repeat(82));
console.log(`Total verified: ${names.length} products. All 30% of bold selling price accurate: ${allOk ? 'YES' : 'NO'}`);
