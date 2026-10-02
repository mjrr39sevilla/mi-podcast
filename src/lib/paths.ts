/**
 * Inlined at build time from NEXT_PUBLIC_BASE_PATH (see next.config.ts).
 * Empty string for local dev and root deployments.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a root-relative path ("/audio/x.wav") with the deployment base
 * path. Plain <audio>/<img> sources are not rewritten by Next.js, so raw
 * data paths must go through this helper. next/image and next/link apply
 * the base path themselves — do not double-apply.
 */
export function withBase(path: string): string {
  if (!basePath || !path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
