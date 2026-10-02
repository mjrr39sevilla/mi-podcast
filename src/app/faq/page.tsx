import type { Metadata } from "next";
import { FAQItem } from "@/components/FAQItem";
import { faqItems } from "@/data/faq";
import { showInfo } from "@/data/episodes";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${showInfo.title} — release schedule, how to subscribe, and how to get in touch.`,
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mb-10 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">
          Good to Know
        </p>
        <h1 className="text-[length:var(--step-3)] text-paper">
          Frequently Asked Questions
        </h1>
        <p className="max-w-prose text-paper-dim">
          Answers to the questions we hear most — and if yours is missing, the
          contact details are below.
        </p>
      </header>

      <ul className="grid gap-4">
        {faqItems.map((item) => (
          <FAQItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
