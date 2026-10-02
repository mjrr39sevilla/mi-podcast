import type { Metadata } from "next";
import { EpisodeCard } from "@/components/EpisodeCard";
import { episodes, showInfo } from "@/data/episodes";

export const metadata: Metadata = {
  title: "Episodes",
  description: `Every episode of ${showInfo.title}, newest first — ${episodes.length} conversations about craft, attention, and the things we make.`,
};

export default function EpisodesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">
          The Catalogue
        </p>
        <h1 className="text-[length:var(--step-3)] text-paper">Episodes</h1>
        <p className="max-w-prose text-paper-dim">
          {episodes.length} episodes, newest first. Select any episode to read
          the full description and listen.
        </p>
      </header>

      <ol className="border-t border-ink-line">
        {episodes.map((episode) => (
          <li key={episode.id}>
            <EpisodeCard episode={episode} />
          </li>
        ))}
      </ol>
    </div>
  );
}
