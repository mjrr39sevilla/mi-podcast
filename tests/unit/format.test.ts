import { describe, expect, it } from "vitest";
import { formatDate, formatDuration } from "@/lib/format";

describe("formatDate", () => {
  it("formats an ISO date as en-US medium date", () => {
    expect(formatDate("2026-03-15")).toBe("Mar 15, 2026");
  });

  it("handles year boundaries in UTC", () => {
    expect(formatDate("2025-12-31")).toBe("Dec 31, 2025");
  });
});

describe("formatDuration", () => {
  it("formats minutes only", () => {
    expect(formatDuration(3180)).toBe("53 min");
    expect(formatDuration(90)).toBe("2 min");
  });

  it("formats exact hours without minutes", () => {
    expect(formatDuration(3600)).toBe("1 hr");
    expect(formatDuration(3599)).toBe("1 hr");
  });

  it("formats hours with minutes", () => {
    expect(formatDuration(5400)).toBe("1 hr 30 min");
  });
});
