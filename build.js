const fs = require("node:fs");
const path = require("node:path");
const { minify } = require("terser");

async function runMinify() {
  const srcDir = path.join(__dirname, "src");
  const outDir = path.join(__dirname, "scripts");

  // Ensure outDir exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  // Collect .user.js files excluding entry-point.user.js
  const scripts = fs
    .readdirSync(srcDir)
    .filter((f) => f.endsWith(".user.js") && f !== "entry-point.user.js");
  let combinedContent = "";

  for (const file of scripts) {
    const filePath = path.join(srcDir, file);
    let content = fs.readFileSync(filePath, "utf8");

    // Preserve the UserScript metadata block
    const match = content.match(
      /(\/\/\s*==UserScript==[\s\S]*?\/\/\s*==\/UserScript==)/
    );
    let metadata = "";
    if (match) {
      metadata = match[1];
      content = content.replace(metadata, "");
    }

    combinedContent += `\n${content}`;
  }

  // Minify the combined content
  const result = await minify(combinedContent, {
    keep_fnames: true,
    compress: {
      drop_console: false,
    },
  });

  const finalScript = `${result.code}`;
  fs.writeFileSync(
    path.join(outDir, "combined-scripts.user.js"),
    finalScript,
    "utf8"
  );
  console.log(`Minified combined scripts -> scripts/combined-scripts.user.js`);
}

runMinify().catch((err) => {
  console.error(err);
  process.exit(1);
});
