#!/usr/bin/env node

/**
 * Compress and normalize public images for production.
 * Usage: node scripts/compress-public-images.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "../frontend/public");
const SUPPORTED_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg"]);

const KB = 1024;

function formatKB(bytes) {
  return `${(bytes / KB).toFixed(1)} KB`;
}

function listImageFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .map((file) => path.join(dir, file));
}

function getImagePolicy(filename) {
  const lower = filename.toLowerCase();

  if (lower === "favicon.webp") {
    return { maxWidth: 192, maxHeight: 192, quality: 70 };
  }

  if (lower === "logo.webp") {
    return { maxWidth: 1200, quality: 68 };
  }

  if (/^logo-(64|96|128)\.webp$/.test(lower)) {
    return { quality: 66 };
  }

  if (/-320w\.webp$/.test(lower)) {
    return { maxWidth: 320, quality: 62 };
  }

  if (/-640w\.webp$/.test(lower)) {
    return { maxWidth: 640, quality: 66 };
  }

  if (/-960w\.webp$/.test(lower)) {
    return { maxWidth: 960, quality: 70 };
  }

  if (/^(garage|salon|bistro|boulangerie)[12]\.webp$/.test(lower)) {
    return { maxWidth: 1080, quality: 72 };
  }

  return { quality: 72 };
}

async function optimizeImage(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const beforeSize = fs.statSync(filePath).size;
  const policy = getImagePolicy(filename);
  const tmpPath = `${filePath}.tmp`;

  let pipeline = sharp(filePath);
  const metadata = await pipeline.metadata();

  if (policy.maxWidth || policy.maxHeight) {
    pipeline = pipeline.resize(policy.maxWidth || null, policy.maxHeight || null, {
      fit: "inside",
      withoutEnlargement: true
    });
  }

  if (ext === ".webp") {
    await pipeline
      .webp({
        quality: policy.quality,
        effort: 6
      })
      .toFile(tmpPath);
  } else if (ext === ".png") {
    await pipeline
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        quality: Math.min(100, Math.round((policy.quality / 72) * 90))
      })
      .toFile(tmpPath);
  } else {
    await pipeline
      .jpeg({
        quality: policy.quality,
        mozjpeg: true
      })
      .toFile(tmpPath);
  }

  const afterSize = fs.statSync(tmpPath).size;

  if (afterSize <= beforeSize) {
    fs.renameSync(tmpPath, filePath);
  } else {
    fs.unlinkSync(tmpPath);
  }

  const finalSize = fs.statSync(filePath).size;
  const saved = beforeSize - finalSize;

  return {
    filename,
    width: metadata.width || 0,
    height: metadata.height || 0,
    beforeSize,
    finalSize,
    saved
  };
}

async function ensureOgImage() {
  const sourceLogo = path.join(PUBLIC_DIR, "logo.webp");
  const ogPath = path.join(PUBLIC_DIR, "logo2.webp");

  if (!fs.existsSync(sourceLogo)) return null;

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(sourceLogo)
          .resize(380, 380, { fit: "inside", withoutEnlargement: true })
          .toBuffer(),
        top: 125,
        left: 410
      }
    ])
    .webp({ quality: 74, effort: 6 })
    .toFile(ogPath);

  return ogPath;
}

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    throw new Error(`Missing public directory: ${PUBLIC_DIR}`);
  }

  const imageFiles = listImageFiles(PUBLIC_DIR);
  const totalBefore = imageFiles.reduce((acc, file) => acc + fs.statSync(file).size, 0);

  const results = [];
  for (const file of imageFiles) {
    results.push(await optimizeImage(file));
  }

  const ogPath = await ensureOgImage();
  if (ogPath) {
    const ogSize = fs.statSync(ogPath).size;
    results.push({
      filename: path.basename(ogPath),
      width: 1200,
      height: 630,
      beforeSize: ogSize,
      finalSize: ogSize,
      saved: 0
    });
  }

  const refreshedFiles = listImageFiles(PUBLIC_DIR);
  const totalAfter = refreshedFiles.reduce((acc, file) => acc + fs.statSync(file).size, 0);
  const totalSaved = totalBefore - totalAfter;

  console.log(`Processed ${results.length} files`);
  console.log(`Total before: ${formatKB(totalBefore)}`);
  console.log(`Total after : ${formatKB(totalAfter)}`);
  console.log(`Saved       : ${formatKB(totalSaved)}`);

  const topGains = results
    .filter((item) => item.saved > 0)
    .sort((a, b) => b.saved - a.saved)
    .slice(0, 10);

  if (topGains.length > 0) {
    console.log("\nTop savings:");
    topGains.forEach((item) => {
      console.log(
        `- ${item.filename}: ${formatKB(item.beforeSize)} -> ${formatKB(item.finalSize)} (saved ${formatKB(item.saved)})`
      );
    });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

