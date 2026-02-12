const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const packagePath = path.join(rootDir, "extension.zip");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const filesToCopy = ["manifest.json", "README.md", "src/logo.png"];
for (const file of filesToCopy) {
  const src = path.join(rootDir, file);
  const dest = path.join(distDir, path.basename(file));
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(packagePath)) {
  fs.rmSync(packagePath, { force: true });
}

try {
  execSync("zip -r ../extension.zip .", {
    cwd: distDir,
    stdio: "inherit",
  });
} catch (err) {
  console.error("Failed to create extension.zip. Ensure the 'zip' utility is available.");
  throw err;
}
