import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedEpisode } from "@/components/FeaturedEpisode";
import { getFeaturedEpisode } from "@/data/episodes";

const episode = getFeaturedEpisode();

describe("FeaturedEpisode", () => {
  it("shows artwork with alt text, title, and metadata", () => {
    render(<FeaturedEpisode episode={episode} />);
    const img = screen.getByRole("img", { name: episode.artworkAlt });
    expect(img).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: episode.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(episode.shortDescription)).toBeInTheDocument();
    expect(screen.getByText(/Episode 20/)).toBeInTheDocument();
    expect(screen.getByText(/Sep 25, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/53 min/)).toBeInTheDocument();
  });

  it("renders a play control bound to the episode audio", () => {
    const { container } = render(<FeaturedEpisode episode={episode} />);
    const player = container.querySelector("audio");
    expect(player).not.toBeNull();
    expect(player).toHaveAttribute("src", episode.audioSrc);
    expect(player).toHaveAttribute(
      "aria-label",
      expect.stringContaining(episode.title),
    );
  });

  it("links to the episodes page", () => {
    render(<FeaturedEpisode episode={episode} />);
    const link = screen.getByRole("link", { name: /browse all episodes/i });
    expect(link).toHaveAttribute("href", "/episodes");
  });
});
