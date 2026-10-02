import type { FAQItem } from "./types";

/** ≥ 6 items; covers release schedule, subscription, and contact (FR-004, SC-006). */
export const faqItems: FAQItem[] = [
  {
    id: "faq-release-schedule",
    question: "How often do new episodes come out?",
    answer:
      "New episodes are released every Friday, roughly once a week. Occasional bonus episodes may appear between regular releases — subscribing is the best way to hear them first.",
  },
  {
    id: "faq-how-to-subscribe",
    question: "How do I subscribe to the show?",
    answer:
      "Open the Episodes page, pick an episode, and use your preferred podcast app or player to follow Midnight Ink. Episodes also stream directly on this site — no account required.",
  },
  {
    id: "faq-contact",
    question: "How can I contact the hosts?",
    answer:
      "For feedback, press, or partnership inquiries, reach the team at hello@midnightink.example. We read everything, and we reply to as much as we can.",
  },
  {
    id: "faq-episode-length",
    question: "How long is a typical episode?",
    answer:
      "Episodes run between about 30 and 60 minutes. Each episode's exact duration is shown next to its title on the Episodes page so you can plan your commute.",
  },
  {
    id: "faq-suggest-guest",
    question: "Can I suggest a guest or topic?",
    answer:
      "Yes. Send a short note with the person or topic you have in mind, why it matters, and how to reach them. The best suggestions come with one question you would ask yourself.",
  },
  {
    id: "faq-transcripts",
    question: "Are transcripts available?",
    answer:
      "Transcripts are in progress for the current season. Until they arrive, every episode includes full written descriptions on this site so you can skim before you listen.",
  },
  {
    id: "faq-cost",
    question: "Is the podcast free to listen to?",
    answer:
      "Yes — all episodes are free, with no paywall and no account. The site is open to everyone, and every episode plays right from the page.",
  },
];
