import { FeaturedEpisode } from "@/components/FeaturedEpisode";
import { getFeaturedEpisode, showInfo } from "@/data/episodes";

export default function Home() {
  const featured = getFeaturedEpisode();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 py-12 sm:py-16 lg:py-20">
      <section aria-labelledby="hero-heading" className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">
          A podcast about the craft behind the things we make
        </p>
        <h1
          id="hero-heading"
          className="mt-5 text-[length:var(--step-4)] text-paper"
        >
          {showInfo.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[length:var(--step-1)] text-paper-dim">
          {showInfo.tagline}
        </p>
      </section>

      <hr className="rule" />

      <section aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="sr-only">
          Featured episode
        </h2>
        <FeaturedEpisode episode={featured} />
      </section>
    </div>
  );
}
