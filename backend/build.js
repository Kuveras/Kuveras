import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Build Process for Hostinger Deployment...');

const frontendDir = path.join(__dirname, '../frontend');
const srcDist = path.join(frontendDir, 'dist');
const targetDist = path.join(__dirname, 'dist');

if (fs.existsSync(frontendDir)) {
  console.log('📦 Installing frontend dependencies & building bundle...');
  try {
    execSync('npm install', { cwd: frontendDir, stdio: 'inherit' });
    execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Failed during frontend build:', err.message);
  }

  if (fs.existsSync(srcDist)) {
    console.log('🚚 Copying compiled frontend/dist to backend/dist...');
    if (fs.existsSync(targetDist)) {
      fs.rmSync(targetDist, { recursive: true, force: true });
    }
    fs.cpSync(srcDist, targetDist, { recursive: true, force: true });
    console.log('✅ Frontend assets successfully bundled into backend/dist!');
  } else {
    console.warn('⚠️ Frontend dist folder not found after build!');
  }
} else {
  console.warn('⚠️ Frontend directory not found at ../frontend');
}
