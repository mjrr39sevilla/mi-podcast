import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { AudioPlayer } from "@/components/AudioPlayer";
import type { Episode } from "@/data/types";
import { formatDate, formatDuration } from "@/lib/format";

interface FeaturedEpisodeProps {
  episode: Episode;
}

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  return (
    <article className="grid items-center gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12 lg:gap-16">
      <div className="relative mx-auto w-full max-w-sm md:max-w-none">
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-3xl bg-accent/15 blur-2xl"
        />
        <Artwork
          src={episode.artworkSrc}
          alt={episode.artworkAlt}
          priority
          className="relative w-full rounded-2xl border border-ink-line shadow-2xl shadow-black/40"
        />
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Featured Episode
        </p>
        <h2 className="text-[length:var(--step-3)] text-paper">
          {episode.title}
        </h2>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="rounded-full border border-ink-line px-2.5 py-0.5">
            Episode {episode.number}
          </span>
          <time dateTime={episode.releaseDate}>
            {formatDate(episode.releaseDate)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{formatDuration(episode.durationSeconds)}</span>
        </p>
        <p className="max-w-prose text-paper-dim">{episode.shortDescription}</p>

        <div className="mt-1">
          <AudioPlayer
            src={episode.audioSrc}
            label={`Play episode ${episode.number}: ${episode.title}`}
          />
        </div>

        <p className="text-sm text-muted">{episode.description}</p>

        <Link
          href="/episodes"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-strong"
        >
          Browse all episodes
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
