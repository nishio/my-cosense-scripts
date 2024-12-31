const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

async function runMinify() {
  const srcDir = path.join(__dirname, 'src');
  const outDir = path.join(__dirname, 'scripts');

  // Ensure outDir exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  // Collect .user.js files
  const scripts = fs.readdirSync(srcDir).filter(f => f.endsWith('.user.js'));
  for (const file of scripts) {
    const filePath = path.join(srcDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Preserve the UserScript metadata block
    // e.g., (// ==UserScript== ... // ==/UserScript==)
    const match = content.match(/(\/\/\s*==UserScript==[\s\S]*?\/\/\s*==\/UserScript==)/);
    let metadata = '';
    if (match) {
      metadata = match[1];
      // remove from main content to avoid confusing the minifier
      content = content.replace(metadata, '');
    }

    // Minify the rest
    const result = await minify(content, { 
      // Keep function names to ensure scripts work properly
      keep_fnames: true,
      // Keep console.log for debugging as per requirements
      compress: {
        drop_console: false
      }
    });
    const finalScript = `${metadata}\n${result.code}`;
    fs.writeFileSync(path.join(outDir, file), finalScript, 'utf8');
    console.log(`Minified ${file} -> scripts/${file}`);
  }
}

runMinify().catch(err => {
  console.error(err);
  process.exit(1);
});
