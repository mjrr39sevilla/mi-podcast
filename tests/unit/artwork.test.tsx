import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Artwork } from "@/components/Artwork";

describe("Artwork", () => {
  it("renders the image when it loads", () => {
    render(<Artwork src="/artwork/ep-20.png" alt="Cover art for episode 20" />);
    const img = screen.getByRole("img", { name: "Cover art for episode 20" });
    expect(img.tagName).toBe("IMG");
  });

  it("swaps to a branded placeholder with the label on error", () => {
    render(
      <Artwork
        src="/artwork/broken.png"
        alt="Cover art for episode 7"
        label="07"
      />,
    );
    const img = screen.getByRole("img", { name: "Cover art for episode 7" });
    fireEvent.error(img);
    const placeholder = screen.getByRole("img", {
      name: "Cover art for episode 7",
    });
    expect(placeholder.tagName).toBe("DIV");
    expect(placeholder.textContent).toBe("07");
  });

  it("falls back to the MI monogram when no label is given", () => {
    render(<Artwork src="/artwork/broken.png" alt="Show artwork" />);
    fireEvent.error(screen.getByRole("img", { name: "Show artwork" }));
    expect(screen.getByRole("img", { name: "Show artwork" }).textContent).toBe(
      "MI",
    );
  });
});
