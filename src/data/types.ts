export interface Episode {
  /** Unique kebab-case slug, stable for the site's lifetime */
  id: string;
  /** Unique, 1–20; 20 is the newest episode */
  number: number;
  /** Non-empty, ≤ 80 chars */
  title: string;
  /** Non-empty, ≤ 500 chars; full detail text */
  description: string;
  /** Non-empty, ≤ 160 chars; list/card excerpt */
  shortDescription: string;
  /** ISO YYYY-MM-DD, unique; descending order = newest-first */
  releaseDate: string;
  /** Seconds, > 0 and ≤ 7200 */
  durationSeconds: number;
  /** Relative path under /public/audio/* */
  audioSrc: string;
  /** Relative path under /public/artwork/* */
  artworkSrc: string;
  /** Non-empty alt text */
  artworkAlt: string;
}

export interface Host {
  name: string;
  role: string;
  bio: string;
  avatarAlt: string;
}

export interface ShowInformation {
  title: string;
  tagline: string;
  description: string;
  hosts: Host[];
  featuredEpisodeId: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
