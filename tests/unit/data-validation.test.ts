import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { episodes, getFeaturedEpisode, showInfo } from "@/data/episodes";
import { faqItems } from "@/data/faq";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("episode data validation (data-model.md rules 1-7)", () => {
  it("rule 1: exactly 20 episodes", () => {
    expect(episodes.length).toBe(20);
  });

  it("rule 2: id, number, and releaseDate are unique", () => {
    const ids = new Set(episodes.map((e) => e.id));
    const numbers = new Set(episodes.map((e) => e.number));
    const dates = new Set(episodes.map((e) => e.releaseDate));
    expect(ids.size).toBe(20);
    expect(numbers.size).toBe(20);
    expect(dates.size).toBe(20);
  });

  it("rule 3: featuredEpisodeId resolves to an existing episode", () => {
    const featured = getFeaturedEpisode();
    expect(episodes).toContain(featured);
    expect(featured.id).toBe(showInfo.featuredEpisodeId);
  });

  it("rule 4: every audioSrc and artworkSrc points to an existing file in public/", () => {
    for (const episode of episodes) {
      for (const src of [episode.audioSrc, episode.artworkSrc]) {
        expect(src.startsWith("/")).toBe(true);
        const filePath = path.join(process.cwd(), "public", src);
        expect(fs.existsSync(filePath), `missing asset: ${src}`).toBe(true);
      }
    }
  });

  it("rule 5: episodes are sorted newest-first (releaseDate descending)", () => {
    const dates = episodes.map((e) => e.releaseDate);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
  });

  it("rule 5b: number ordering matches date ordering (20 is newest)", () => {
    for (let i = 0; i < episodes.length - 1; i++) {
      expect(episodes[i].number).toBeGreaterThan(episodes[i + 1].number);
      expect(Date.parse(episodes[i].releaseDate)).toBeGreaterThan(
        Date.parse(episodes[i + 1].releaseDate),
      );
    }
    expect(episodes.map((e) => e.number)).toEqual(
      Array.from({ length: 20 }, (_, i) => 20 - i),
    );
  });

  it("rule 6: at least 6 FAQ items covering schedule, subscribe, and contact", () => {
    expect(faqItems.length).toBeGreaterThanOrEqual(6);
    const text = faqItems.map((f) => `${f.question} ${f.answer}`).join(" ");
    expect(text).toMatch(/release|schedule|how often/i);
    expect(text).toMatch(/subscribe|follow|app/i);
    expect(text).toMatch(/contact|reach|email|hello@/i);
  });

  it("rule 7: field length and format constraints hold", () => {
    for (const e of episodes) {
      expect(e.title.length).toBeGreaterThan(0);
      expect(e.title.length).toBeLessThanOrEqual(80);
      expect(e.description.length).toBeGreaterThan(0);
      expect(e.description.length).toBeLessThanOrEqual(500);
      expect(e.shortDescription.length).toBeGreaterThan(0);
      expect(e.shortDescription.length).toBeLessThanOrEqual(160);
      expect(e.releaseDate).toMatch(ISO_DATE);
      expect(e.durationSeconds).toBeGreaterThan(0);
      expect(e.durationSeconds).toBeLessThanOrEqual(7200);
      expect(e.artworkAlt.length).toBeGreaterThan(0);
      expect(Number.isInteger(e.number)).toBe(true);
      expect(e.number).toBeGreaterThanOrEqual(1);
      expect(e.number).toBeLessThanOrEqual(20);
    }
    for (const f of faqItems) {
      expect(f.question.length).toBeGreaterThan(0);
      expect(f.question.length).toBeLessThanOrEqual(120);
      expect(f.answer.length).toBeGreaterThan(0);
      expect(f.answer.length).toBeLessThanOrEqual(600);
    }
    expect(showInfo.title.length).toBeGreaterThan(0);
    expect(showInfo.tagline.length).toBeGreaterThan(0);
    expect(showInfo.tagline.length).toBeLessThanOrEqual(100);
    expect(showInfo.description.length).toBeGreaterThan(0);
    expect(showInfo.hosts.length).toBeGreaterThanOrEqual(1);
    for (const h of showInfo.hosts) {
      expect(h.name.length).toBeGreaterThan(0);
      expect(h.role.length).toBeGreaterThan(0);
      expect(h.bio.length).toBeGreaterThan(0);
      expect(h.bio.length).toBeLessThanOrEqual(300);
      expect(h.avatarAlt.length).toBeGreaterThan(0);
    }
  });

  it("rule 8: episode ids are kebab-case slugs", () => {
    for (const e of episodes) {
      expect(e.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});
