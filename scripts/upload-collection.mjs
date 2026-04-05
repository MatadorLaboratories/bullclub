/**
 * Upload the full Bull Club collection to Supabase Storage.
 *
 * Usage:
 *   node scripts/upload-collection.mjs
 *
 * Prerequisites:
 *   - Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - Run: npm install @supabase/supabase-js dotenv
 *   - Set ARTWORK_DIR below to the full path of your collection folder
 */

import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ── Config ────────────────────────────────────────────────────────────────────
const ARTWORK_DIR =
  "/Users/callum/My Drive/Matador Labs/Projects 🛠/The Bull Club/Collection Artwork Files/3D Artwork Files/3D Collection/All Assets/Entire Collection";

const BUCKET = "bulls";
const CONCURRENCY = 10; // parallel uploads at once

// Load env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");

const envText = await readFile(envPath, "utf8").catch(() => "");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const supabaseUrl = process.env.SUPABASE_URL ?? env["NEXT_PUBLIC_SUPABASE_URL"];
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? env["SUPABASE_SERVICE_ROLE_KEY"];

if (!supabaseUrl || supabaseUrl.startsWith("your_")) {
  console.error("❌  Set NEXT_PUBLIC_SUPABASE_URL in .env.local first.");
  process.exit(1);
}
if (!serviceKey || serviceKey.startsWith("your_")) {
  console.error("❌  Set SUPABASE_SERVICE_ROLE_KEY in .env.local first.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

// ── Ensure bucket exists ──────────────────────────────────────────────────────
const { data: buckets } = await supabase.storage.listBuckets();
const bucketExists = buckets?.some((b) => b.name === BUCKET);

if (!bucketExists) {
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error) {
    console.error("❌  Failed to create bucket:", error.message);
    process.exit(1);
  }
  console.log(`✅  Created bucket "${BUCKET}"`);
}

// ── Get already-uploaded files ────────────────────────────────────────────────
console.log("🔍  Fetching already-uploaded files...");
let uploaded = new Set();
let page = 0;
while (true) {
  const { data, error } = await supabase.storage.from(BUCKET).list("", {
    limit: 1000,
    offset: page * 1000,
  });
  if (error || !data?.length) break;
  data.forEach((f) => uploaded.add(f.name));
  if (data.length < 1000) break;
  page++;
}
console.log(`   Already uploaded: ${uploaded.size} files`);

// ── Read local files ──────────────────────────────────────────────────────────
const allFiles = (await readdir(ARTWORK_DIR)).filter((f) =>
  /\.(jpg|jpeg|png|gif|webp)$/i.test(f)
);
const toUpload = allFiles.filter((f) => !uploaded.has(f));
console.log(`📦  Files to upload: ${toUpload.length} of ${allFiles.length}`);

if (toUpload.length === 0) {
  console.log("✅  All files already uploaded!");
  process.exit(0);
}

// ── Upload in batches ─────────────────────────────────────────────────────────
let done = 0;
let errors = 0;

async function uploadFile(filename) {
  const filePath = path.join(ARTWORK_DIR, filename);
  const data = await readFile(filePath);
  const ext = path.extname(filename).toLowerCase().replace(".", "");
  const contentType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(filename, data, {
    contentType,
    upsert: false,
  });

  if (error && error.message !== "The resource already exists") {
    errors++;
    console.error(`  ❌ ${filename}: ${error.message}`);
  } else {
    done++;
    if (done % 100 === 0) {
      console.log(`  ⬆️  ${done}/${toUpload.length} uploaded (${errors} errors)`);
    }
  }
}

// Process in chunks of CONCURRENCY
for (let i = 0; i < toUpload.length; i += CONCURRENCY) {
  const chunk = toUpload.slice(i, i + CONCURRENCY);
  await Promise.all(chunk.map(uploadFile));
}

console.log(`\n✅  Done! Uploaded ${done} files. Errors: ${errors}`);
console.log(`\nPublic URL pattern:`);
console.log(`  ${supabaseUrl}/storage/v1/object/public/${BUCKET}/{tokenId}.jpg`);
