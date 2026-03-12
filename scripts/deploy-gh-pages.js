import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');
const tempDir = path.join(projectRoot, '.gh-pages-deploy');
const GITHUB_REPO = 'https://github.com/MiguelGonzalezAlvarez/Web-How-Poor-Calculator.git';

try {
  console.log('Preparing deploy...');
  
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });
  
  console.log('Copying dist files...');
  copyDir(distPath, tempDir);
  
  console.log('Initializing git in temp directory...');
  execSync('git init', { cwd: tempDir, stdio: 'inherit' });
  execSync('git config user.email "deploy@gh-pages"', { cwd: tempDir, stdio: 'inherit' });
  execSync('git config user.name "Deploy Bot"', { cwd: tempDir, stdio: 'inherit' });
  
  console.log('Committing files...');
  execSync('git add -A', { cwd: tempDir, stdio: 'inherit' });
  execSync('git commit -m "Deploy to GitHub Pages"', { cwd: tempDir, stdio: 'inherit' });
  
  console.log('Pushing to gh-pages...');
  execSync(`git push -f ${GITHUB_REPO} HEAD:gh-pages`, {
    cwd: tempDir,
    stdio: 'inherit'
  });
  
  fs.rmSync(tempDir, { recursive: true });
  console.log('\n✅ Deploy complete!');
} catch (error) {
  console.error('\n❌ Deploy failed:', error.message);
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }
  globalThis.process.exit(1);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}