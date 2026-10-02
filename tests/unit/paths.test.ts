import { describe, expect, it } from "vitest";
import { basePath, withBase } from "@/lib/paths";

describe("withBase", () => {
  it("returns root-relative paths unchanged when basePath is empty", () => {
    expect(basePath).toBe("");
    expect(withBase("/audio/ep-01.wav")).toBe("/audio/ep-01.wav");
  });

  it("does not touch non-root-relative paths", () => {
    expect(withBase("https://example.com/x.mp3")).toBe(
      "https://example.com/x.mp3",
    );
    expect(withBase("audio/ep-01.wav")).toBe("audio/ep-01.wav");
  });
});
