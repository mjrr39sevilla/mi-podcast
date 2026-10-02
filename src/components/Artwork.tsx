"use client";

import Image from "next/image";
import { useState } from "react";
import { withBase } from "@/lib/paths";

interface ArtworkProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Rendered inside the placeholder when the image fails (e.g. "20") */
  label?: string;
}

/**
 * Episode artwork with a branded fallback: if the image fails to load,
 * a styled placeholder with the show monogram is shown and the layout
 * keeps its aspect ratio (spec edge case: "artwork fails to load").
 */
export function Artwork({
  src,
  alt,
  className,
  priority,
  label,
}: ArtworkProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={
          "flex aspect-square items-center justify-center bg-ink-soft " +
          (className ?? "")
        }
      >
        <span className="font-display text-4xl text-accent" aria-hidden="true">
          {label ?? "MI"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={withBase(src)}
      alt={alt}
      width={640}
      height={640}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? undefined : "lazy"}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
