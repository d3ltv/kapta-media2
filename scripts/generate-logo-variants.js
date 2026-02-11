#!/usr/bin/env node

/**
 * Generate lightweight logo variants for responsive usage.
 * Usage: node scripts/generate-logo-variants.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const INPUT = path.join(__dirname, "../frontend/public/logo.webp");
const OUTPUT_DIR = path.join(__dirname, "../frontend/public");
const SIZES = [64, 96, 128];
const QUALITY = 68;

async function run() {
  if (!fs.existsSync(INPUT)) {
    throw new Error(`Missing source logo: ${INPUT}`);
  }

  const image = sharp(INPUT);
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error("Could not read source logo dimensions.");
  }

  console.log(`Source: ${metadata.width}x${metadata.height}`);

  for (const size of SIZES) {
    const output = path.join(OUTPUT_DIR, `logo-${size}.webp`);
    await image
      .clone()
      .resize(size, size, {
        fit: "inside",
        withoutEnlargement: true
      })
      .webp({
        quality: QUALITY,
        effort: 6
      })
      .toFile(output);

    const bytes = fs.statSync(output).size;
    console.log(`Generated ${path.basename(output)} (${Math.round(bytes / 1024)} KB)`);
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

