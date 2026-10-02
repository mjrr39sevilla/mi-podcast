/**
 * Post-export fix for a Next.js static-export bug (present in 16.3.8):
 * RSC payload files are WRITTEN under nested directories
 * (e.g. out/about/__next.about/__PAGE__.txt) but REQUESTED at flat,
 * dot-separated paths (e.g. /about/__next.about.__PAGE__.txt), causing 404s
 * for Link prefetch/client-navigation on any plain static host.
 *
 * This script copies every nested payload file to its flat dotted path.
 * Harmless if upstream Next.js fixes the mismatch (copies become redundant).
 */
import { readdirSync, statSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
if (!existsSync(OUT)) {
  console.error("flatten-rsc-payloads: out/ not found — run next build first");
  process.exit(1);
}

let copied = 0;

/** Copy every file under payloadDir to topParent/<prefix>.<relpath with dots>. */
function flatten(payloadDir, topParent, prefix) {
  for (const entry of readdirSync(payloadDir)) {
    const full = join(payloadDir, entry);
    if (statSync(full).isDirectory()) {
      flatten(full, topParent, `${prefix}.${entry}`);
    } else {
      const target = join(topParent, `${prefix}.${entry}`);
      if (!existsSync(target)) {
        copyFileSync(full, target);
        copied++;
      }
    }
  }
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (/^__next\./.test(entry)) {
        flatten(full, dir, entry);
      } else {
        walk(full);
      }
    }
  }
}

walk(OUT);
console.log(`flatten-rsc-payloads: copied ${copied} payload file(s)`);
