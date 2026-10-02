import type { Metadata } from "next";
import { showInfo } from "@/data/episodes";

export const metadata: Metadata = {
  title: "About",
  description: `About ${showInfo.title} — ${showInfo.tagline}`,
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">
          The Show
        </p>
        <h1 className="text-[length:var(--step-3)] text-paper">
          About {showInfo.title}
        </h1>
        <p className="text-[length:var(--step-1)] text-paper-dim">
          {showInfo.tagline}
        </p>
      </header>

      <section aria-labelledby="premise-heading" className="max-w-prose">
        <h2
          id="premise-heading"
          className="text-[length:var(--step-2)] text-paper"
        >
          What is {showInfo.title}?
        </h2>
        <p className="mt-4 text-paper-dim">{showInfo.description}</p>
      </section>

      <hr className="rule my-12" />

      <section aria-labelledby="hosts-heading">
        <h2
          id="hosts-heading"
          className="text-[length:var(--step-2)] text-paper"
        >
          The hosts
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {showInfo.hosts.map((host) => (
            <li
              key={host.name}
              className="rounded-2xl border border-ink-line bg-ink-soft p-6"
            >
              <div className="flex items-center gap-4">
                <span
                  role="img"
                  aria-label={host.avatarAlt}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-display text-lg text-accent"
                >
                  {initials(host.name)}
                </span>
                <div>
                  <p className="text-lg text-paper">{host.name}</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted">
                    {host.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-paper-dim">{host.bio}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
