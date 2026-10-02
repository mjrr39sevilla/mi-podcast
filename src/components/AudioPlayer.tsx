"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";

interface AudioPlayerProps {
  src: string;
  label: string;
}

/**
 * Native <audio controls> wrapper: keyboard accessible and functional
 * without JavaScript (FR-009, FR-011). Shows a visible error state when
 * playback media fails to load (FR-010).
 */
export function AudioPlayer({ src, label }: AudioPlayerProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <p
        role="alert"
        className="rounded-xl border border-danger/60 bg-danger/10 px-4 py-3 text-sm text-paper"
      >
        This episode&apos;s audio is unavailable right now — the written
        description above is still fully readable.
      </p>
    );
  }

  return (
    <audio
      controls
      preload="none"
      src={withBase(src)}
      aria-label={label}
      onError={() => setFailed(true)}
      className="w-full min-w-0"
    />
  );
}
