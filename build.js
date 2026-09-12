const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
  fs.mkdirSync(path.join(distDir, 'css'));
  fs.mkdirSync(path.join(distDir, 'js'));
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function build() {
  console.log('Building Vanyam static assets...');

  // CSS
  const cssFiles = ['css/style.css', 'css/animations.css', 'css/responsive.css'];
  for (const file of cssFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const minified = new CleanCSS({}).minify(content).styles;
    fs.writeFileSync(path.join(distDir, file), minified);
    console.log(`Minified ${file}`);
  }

  // JS
  const jsFiles = ['js/main.js', 'js/map.js', 'js/gallery.js', 'js/wildlife.js', 'js/quiz.js'];
  for (const file of jsFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const minified = await minify(content);
      fs.writeFileSync(path.join(distDir, file), minified.code);
      console.log(`Minified ${file}`);
    }
  }

  // Copy others
  fs.copyFileSync('index.html', path.join(distDir, 'index.html'));
  fs.copyFileSync('manifest.json', path.join(distDir, 'manifest.json'));
  fs.copyFileSync('favicon.svg', path.join(distDir, 'favicon.svg'));

  // Copy pages directory
  copyDirRecursive('pages', path.join(distDir, 'pages'));

  // Copy assets directory recursively
  copyDirRecursive('assets', path.join(distDir, 'assets'));

  // Update index.html in dist to remove whitespaces (simple minify)
  let html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  html = html.replace(/\s{2,}/g, ' ').replace(/<!--.*?-->/g, '');
  fs.writeFileSync(path.join(distDir, 'index.html'), html);

  console.log('Build completed! Distribution ready in /dist');
}

build().catch(console.error);
