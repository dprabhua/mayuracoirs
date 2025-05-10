// build/minify-css.js
// Usage: node build/minify-css.js
// Requires: npm install clean-css

const fs = require('fs');
const CleanCSS = require('clean-css');

const inputPath = 'styles.css';
const outputPath = 'styles.min.css';

try {
  const source = fs.readFileSync(inputPath, 'utf8');
  const output = new CleanCSS({ level: 2 }).minify(source);
  if (output.errors.length) {
    console.error('Minification errors:', output.errors);
    process.exit(1);
  }
  fs.writeFileSync(outputPath, output.styles, 'utf8');
  console.log(`Minified ${inputPath} → ${outputPath}`);
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
} 