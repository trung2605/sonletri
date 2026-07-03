import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";

const PHOTOS_DIR = join(import.meta.dirname, "..", "src", "assets", "photos");
const MAX_WIDTH = 1920;
const QUALITY = 78;

const exts = new Set([".jpg", ".jpeg", ".png", ".jfif"]);

const files = readdirSync(PHOTOS_DIR).filter((f) => exts.has(extname(f).toLowerCase()));

for (const file of files) {
  const inputPath = join(PHOTOS_DIR, file);
  const outputPath = join(PHOTOS_DIR, `${basename(file, extname(file))}.webp`);
  const beforeSize = statSync(inputPath).size;

  const image = sharp(inputPath);
  const meta = await image.metadata();
  const resizeWidth = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : undefined;

  await image
    .resize({ width: resizeWidth })
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  const afterSize = statSync(outputPath).size;
  const pct = (100 - (afterSize / beforeSize) * 100).toFixed(0);
  console.log(
    `${file} -> ${basename(outputPath)}: ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB (-${pct}%)`
  );
}
