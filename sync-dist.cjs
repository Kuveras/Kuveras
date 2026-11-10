const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('frontend/dist');
const destDir = path.resolve('backend/dist');

if (fs.existsSync(srcDir)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('✅ Synchronized frontend/dist to backend/dist successfully.');
} else {
  console.warn('⚠️ frontend/dist does not exist.');
}
