const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const packagePath = path.join(__dirname, "..", "extension.zip");

fs.rmSync(distDir, { recursive: true, force: true });
fs.rmSync(packagePath, { force: true });
