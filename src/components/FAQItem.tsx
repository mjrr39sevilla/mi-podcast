import type { FAQItem as FAQItemType } from "@/data/types";

interface FAQItemProps {
  item: FAQItemType;
}

/**
 * One Q/A pair: heading question with its answer in the same list item —
 * always visible, no interaction required (FR-004, contracts/pages.md).
 */
export function FAQItem({ item }: FAQItemProps) {
  return (
    <li className="rounded-2xl border border-ink-line bg-ink-soft p-6">
      <h2 className="m-0 text-[length:var(--step-1)] text-accent">
        {item.question}
      </h2>
      <p className="mt-3 text-paper-dim">{item.answer}</p>
    </li>
  );
}
