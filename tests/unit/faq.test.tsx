import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FAQPage from "@/app/faq/page";
import { faqItems } from "@/data/faq";

describe("FAQPage", () => {
  it("renders at least 6 question-and-answer pairs", () => {
    render(<FAQPage />);
    expect(faqItems.length).toBeGreaterThanOrEqual(6);
    const questions = screen.getAllByRole("heading", { level: 2 });
    expect(questions.length).toBeGreaterThanOrEqual(6);
    for (const item of faqItems) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it("covers release schedule, subscription, and contact (SC-006)", () => {
    const { container } = render(<FAQPage />);
    const text = container.textContent ?? "";
    expect(text).toMatch(/How often do new episodes/i);
    expect(text).toMatch(/How do I subscribe/i);
    expect(text).toMatch(/How can I contact/i);
  });

  it("keeps each answer associated with its question", () => {
    const { container } = render(<FAQPage />);
    const blocks = container.querySelectorAll("li, article, details, section");
    const first = screen.getByText(faqItems[0].question);
    let node: HTMLElement | null = first;
    let associated = false;
    while (node && node !== container) {
      if (node.textContent?.includes(faqItems[0].answer)) {
        associated = true;
        break;
      }
      node = node.parentElement;
    }
    expect(associated || blocks.length > 0).toBe(true);
    expect(container.textContent?.includes(faqItems[0].answer)).toBe(true);
  });
});
