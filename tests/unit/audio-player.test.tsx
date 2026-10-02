import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AudioPlayer } from "@/components/AudioPlayer";

describe("AudioPlayer", () => {
  it("renders a native audio control with an accessible label", () => {
    const { container } = render(
      <AudioPlayer src="/audio/ep-01.mp3" label="Play episode 1" />,
    );
    const audio = container.querySelector("audio");
    expect(audio).toBeTruthy();
    expect(audio?.getAttribute("aria-label")).toBe("Play episode 1");
    expect(audio?.getAttribute("preload")).toBe("none");
  });

  it("shows an error alert when the media fails to load (FR-010)", () => {
    const { container } = render(
      <AudioPlayer src="/audio/broken.mp3" label="Play episode 2" />,
    );
    fireEvent.error(container.querySelector("audio")!);
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toContain("unavailable");
    expect(container.querySelector("audio")).toBeNull();
  });
});
