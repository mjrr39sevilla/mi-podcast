import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import EpisodesPage from "@/app/episodes/page";
import { episodes } from "@/data/episodes";

describe("EpisodesPage", () => {
  it("lists exactly 20 episodes, newest-first with unique numbers 1-20", () => {
    const { container } = render(<EpisodesPage />);
    const items = container.querySelectorAll("details");
    expect(items.length).toBe(20);

    const seen = new Set<number>();
    items.forEach((item, index) => {
      const expectedNumber = 20 - index;
      const text = item.textContent ?? "";
      expect(text).toContain(`Episode ${expectedNumber}`);
      seen.add(expectedNumber);
    });
    expect([...seen].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 20 }, (_, i) => i + 1),
    );
  });

  it("shows full metadata for the newest episode", () => {
    const { container } = render(<EpisodesPage />);
    const newest = episodes[0];
    const first = container.querySelector("details");
    expect(first).not.toBeNull();
    const newestItem = within(first as HTMLElement);
    expect(
      newestItem.getByRole("heading", { name: newest.title }),
    ).toBeInTheDocument();
    expect(newestItem.getByText("Sep 25, 2026")).toBeInTheDocument();
    expect(newestItem.getByText("53 min")).toBeInTheDocument();
    expect(newestItem.getByText(newest.shortDescription)).toBeInTheDocument();
  });

  it("renders artwork with alt text and a play control per episode", () => {
    const { container } = render(<EpisodesPage />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(20);
    for (const img of images) {
      expect(img.getAttribute("alt")).toBeTruthy();
    }
    const players = container.querySelectorAll("audio");
    expect(players.length).toBe(20);
    for (const player of players) {
      expect(player.getAttribute("src")).toMatch(/^\/audio\/ep-\d{3}\.wav$/);
    }
  });

  it("shows complete metadata for the oldest episode", () => {
    const { container } = render(<EpisodesPage />);
    const items = container.querySelectorAll("details");
    const oldest = within(items[items.length - 1] as HTMLElement);
    expect(oldest.getByText(/First Light/)).toBeInTheDocument();
    expect(oldest.getByText("May 15, 2026")).toBeInTheDocument();
  });
});
