import { Artwork } from "@/components/Artwork";
import { AudioPlayer } from "@/components/AudioPlayer";
import type { Episode } from "@/data/types";
import { formatDate, formatDuration } from "@/lib/format";

interface EpisodeCardProps {
  episode: Episode;
}

/**
 * One episode as an expandable row. Uses native <details> so expansion and
 * playback work without JavaScript (FR-011); summary holds list metadata
 * (FR-002), expanded region holds full detail + player (contracts/pages.md).
 */
export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <details className="group border-b border-ink-line">
      <summary className="flex cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden sm:gap-6">
        <span
          aria-hidden="true"
          className="font-display w-14 shrink-0 text-[length:var(--step-2)] text-accent sm:w-20"
        >
          {String(episode.number).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="sr-only">Episode {episode.number}: </span>
          <h2 className="m-0 text-[length:var(--step-1)] font-medium text-paper">
            {episode.title}
          </h2>
          <span className="mt-1 block text-sm text-muted">
            <time dateTime={episode.releaseDate}>
              {formatDate(episode.releaseDate)}
            </time>
            <span aria-hidden="true"> · </span>
            {formatDuration(episode.durationSeconds)}
          </span>
          <span className="mt-2 block max-w-prose text-sm text-paper-dim">
            {episode.shortDescription}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-accent transition-transform group-open:rotate-90"
        >
          ▸
        </span>
      </summary>

      <div className="grid gap-6 pb-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:pl-26">
        <Artwork
          src={episode.artworkSrc}
          alt={episode.artworkAlt}
          label={String(episode.number).padStart(2, "0")}
          className="w-full max-w-56 rounded-xl border border-ink-line"
        />
        <div className="flex flex-col gap-4">
          <p className="text-paper-dim">{episode.description}</p>
          <AudioPlayer
            src={episode.audioSrc}
            label={`Play episode ${episode.number}: ${episode.title}`}
          />
        </div>
      </div>
    </details>
  );
}
