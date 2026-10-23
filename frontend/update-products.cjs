const fs = require('fs');
const path = 'src/data/products.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace all rentalPrice values with 1199
content = content.replace(/"rentalPrice": \d+/g, '"rentalPrice": 1199');

// Replace all rentalPeriod values with '1 Day'
content = content.replace(/"rentalPeriod": "[^"]+"/g, '"rentalPeriod": "1 Day"');

fs.writeFileSync(path, content, 'utf8');
console.log('Done - all rental prices set to 1199 and period set to 1 Day');
