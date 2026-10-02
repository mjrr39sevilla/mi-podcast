import type { Episode, ShowInformation } from "./types";

/**
 * Single source of truth for all episode content (Constitution IV).
 * Exactly 20 mocked episodes — no feed, no database (FR-005).
 * Listed newest-first: number 20 is the latest release (FR-012).
 */
export const episodes: Episode[] = [
  {
    id: "ep-020-architecture-of-silence",
    number: 20,
    title: "The Architecture of Silence",
    description:
      "What happens when we design for pauses instead of pixels? This week we visit recording studios, libraries, and one very quiet café to understand how silence is composed, protected, and sold — and what digital products might learn from rooms built to be still.",
    shortDescription:
      "How silence is composed, protected, and sold — and what digital products might learn from rooms built to be still.",
    releaseDate: "2026-09-25",
    durationSeconds: 3180,
    audioSrc: "/audio/ep-020.wav",
    artworkSrc: "/artwork/ep-020.svg",
    artworkAlt: "Cover art for episode 20, The Architecture of Silence",
  },
  {
    id: "ep-019-ink-and-interface",
    number: 19,
    title: "Ink and Interface",
    description:
      "A type designer and a product designer walk into a podcast. We trace the century-old rules of typographic hierarchy into modern interfaces, and ask whether the screen has inherited the discipline of the page or simply borrowed its aesthetics.",
    shortDescription:
      "Century-old typographic rules meet modern interfaces — has the screen inherited the page's discipline?",
    releaseDate: "2026-09-18",
    durationSeconds: 2940,
    audioSrc: "/audio/ep-019.wav",
    artworkSrc: "/artwork/ep-019.svg",
    artworkAlt: "Cover art for episode 19, Ink and Interface",
  },
  {
    id: "ep-018-slow-software",
    number: 18,
    title: "Slow Software",
    description:
      "The slow movement reached your laptop. We talk with teams deliberately shipping less, maintenance as craft, and why an application that lasts ten years might be a more ambitious goal than one that launches in ten weeks.",
    shortDescription:
      "Shipping less on purpose: maintenance as craft, and why lasting ten years beats launching in ten weeks.",
    releaseDate: "2026-09-11",
    durationSeconds: 2760,
    audioSrc: "/audio/ep-018.wav",
    artworkSrc: "/artwork/ep-018.svg",
    artworkAlt: "Cover art for episode 18, Slow Software",
  },
  {
    id: "ep-017-craft-of-constraint",
    number: 17,
    title: "The Craft of Constraint",
    description:
      "Two hundred words. One color. Four bars of music. Creators across disciplines explain how arbitrary limits sharpen taste, force invention, and turn blank canvases into decisions worth defending.",
    shortDescription:
      "How arbitrary limits — 200 words, one color, four bars — sharpen taste and force invention.",
    releaseDate: "2026-09-04",
    durationSeconds: 3060,
    audioSrc: "/audio/ep-017.wav",
    artworkSrc: "/artwork/ep-017.svg",
    artworkAlt: "Cover art for episode 17, The Craft of Constraint",
  },
  {
    id: "ep-016-letters-from-the-latent-space",
    number: 16,
    title: "Letters from the Latent Space",
    description:
      "Artists, archivists, and researchers describe working alongside generative models: the prompt as draft, the dataset as memory, and the uneasy question of what authorship means when the muse has a version number.",
    shortDescription:
      "The prompt as draft, the dataset as memory, and authorship when the muse has a version number.",
    releaseDate: "2026-08-28",
    durationSeconds: 3420,
    audioSrc: "/audio/ep-016.wav",
    artworkSrc: "/artwork/ep-016.svg",
    artworkAlt: "Cover art for episode 16, Letters from the Latent Space",
  },
  {
    id: "ep-015-what-we-keep",
    number: 15,
    title: "What We Keep",
    description:
      "From family recipe cards to deprecated file formats, we explore the objects and files we refuse to throw away — and the quiet curatorial work of deciding what a life, or a company, considers worth preserving.",
    shortDescription:
      "The quiet curatorial work of deciding what a life — or a company — considers worth preserving.",
    releaseDate: "2026-08-21",
    durationSeconds: 2880,
    audioSrc: "/audio/ep-015.wav",
    artworkSrc: "/artwork/ep-015.svg",
    artworkAlt: "Cover art for episode 15, What We Keep",
  },
  {
    id: "ep-014-last-analog-hour",
    number: 14,
    title: "The Last Analog Hour",
    description:
      "A radio engineer, a vinyl pressing plant owner, and a mechanical watchmaker walk us through the last hour of their working day — rituals, maintenance, and the tactile intelligence that machines still cannot automate.",
    shortDescription:
      "Rituals, maintenance, and the tactile intelligence that machines still cannot automate.",
    releaseDate: "2026-08-14",
    durationSeconds: 3300,
    audioSrc: "/audio/ep-014.wav",
    artworkSrc: "/artwork/ep-014.svg",
    artworkAlt: "Cover art for episode 14, The Last Analog Hour",
  },
  {
    id: "ep-013-margins-and-meaning",
    number: 13,
    title: "Margins & Meaning",
    description:
      "Editors, bookbinders, and one landscape architect make the case for whitespace: why the edges of a page, a garden, or a sprint are where intention lives — and what gets lost when everything is filled in.",
    shortDescription:
      "Why the edges of a page, a garden, or a sprint are where intention lives.",
    releaseDate: "2026-08-07",
    durationSeconds: 2640,
    audioSrc: "/audio/ep-013.wav",
    artworkSrc: "/artwork/ep-013.svg",
    artworkAlt: "Cover art for episode 13, Margins and Meaning",
  },
  {
    id: "ep-012-grammar-of-color",
    number: 12,
    title: "A Grammar of Color",
    description:
      "Why do certain palettes feel expensive and others tired? A painter and a color theorist decode temperature, contrast, and cultural memory — then react live to the palette of this very website.",
    shortDescription:
      "Temperature, contrast, and cultural memory — why some palettes feel expensive and others tired.",
    releaseDate: "2026-07-31",
    durationSeconds: 3120,
    audioSrc: "/audio/ep-012.wav",
    artworkSrc: "/artwork/ep-012.svg",
    artworkAlt: "Cover art for episode 12, A Grammar of Color",
  },
  {
    id: "ep-011-night-shift-economy",
    number: 11,
    title: "The Night Shift Economy",
    description:
      "Bakers, moderators, nurses, and batch-job schedulers: a field report from the people who work while the west sleeps, and what their hours reveal about automation, empathy, and the true cost of always-on services.",
    shortDescription:
      "A field report from the people who work while the west sleeps — and what always-on really costs.",
    releaseDate: "2026-07-24",
    durationSeconds: 3540,
    audioSrc: "/audio/ep-011.wav",
    artworkSrc: "/artwork/ep-011.svg",
    artworkAlt: "Cover art for episode 11, The Night Shift Economy",
  },
  {
    id: "ep-010-field-notes-on-focus",
    number: 10,
    title: "Field Notes on Focus",
    description:
      "Ten episodes in, we pause for a study session. A cognitive scientist, a stonemason, and a competitive pianist compare notes on deep attention: how it is trained, how it is fractured, and how to protect an hour of it.",
    shortDescription:
      "How deep attention is trained, fractured, and how to protect an hour of it.",
    releaseDate: "2026-07-17",
    durationSeconds: 2820,
    audioSrc: "/audio/ep-010.wav",
    artworkSrc: "/artwork/ep-010.svg",
    artworkAlt: "Cover art for episode 10, Field Notes on Focus",
  },
  {
    id: "ep-009-cartographers-dilemma",
    number: 9,
    title: "The Cartographer's Dilemma",
    description:
      "Every map lies a little. We follow cartographers, wayfinding designers, and a game level artist through projection choices, omission, and the surprising ethics of helping strangers find their way.",
    shortDescription:
      "Every map lies a little — projection choices, omission, and the ethics of helping strangers navigate.",
    releaseDate: "2026-07-10",
    durationSeconds: 3000,
    audioSrc: "/audio/ep-009.wav",
    artworkSrc: "/artwork/ep-009.svg",
    artworkAlt: "Cover art for episode 9, The Cartographer's Dilemma",
  },
  {
    id: "ep-008-rhythm-and-routine",
    number: 8,
    title: "Rhythm & Routine",
    description:
      "Commuters, monastics, and stand-up comedians share the daily beats that structure their lives — and we ask whether routine is a cage, a metronome, or simply the grammar that makes spontaneity legible.",
    shortDescription:
      "Is routine a cage, a metronome, or the grammar that makes spontaneity legible?",
    releaseDate: "2026-07-03",
    durationSeconds: 2700,
    audioSrc: "/audio/ep-008.wav",
    artworkSrc: "/artwork/ep-008.svg",
    artworkAlt: "Cover art for episode 8, Rhythm and Routine",
  },
  {
    id: "ep-007-objects-with-memory",
    number: 7,
    title: "Objects with Memory",
    description:
      "A worn suitcase, a bug-riddled floppy disk, a grandmother's cast-iron pan. Designers and historians discuss patina, provenance, and why the things we keep carry stories their makers never intended.",
    shortDescription:
      "Patina, provenance, and why the things we keep carry stories their makers never intended.",
    releaseDate: "2026-06-26",
    durationSeconds: 3180,
    audioSrc: "/audio/ep-007.wav",
    artworkSrc: "/artwork/ep-007.svg",
    artworkAlt: "Cover art for episode 7, Objects with Memory",
  },
  {
    id: "ep-006-the-long-edit",
    number: 6,
    title: "The Long Edit",
    description:
      "Novice writers revise for hours; masters revise for years. We sit with an film editor, a copy chief, and a songwriter to learn what they cut, what they save, and how they know the difference.",
    shortDescription:
      "What editors cut, what they save, and how they know the difference — hours versus years.",
    releaseDate: "2026-06-19",
    durationSeconds: 3060,
    audioSrc: "/audio/ep-006.wav",
    artworkSrc: "/artwork/ep-006.svg",
    artworkAlt: "Cover art for episode 6, The Long Edit",
  },
  {
    id: "ep-005-signals-in-the-static",
    number: 5,
    title: "Signals in the Static",
    description:
      "From shortwave numbers stations to modern incident alerts, a look at communication under stress: how messages are designed to survive noise, mistrust, and the limits of the channels carrying them.",
    shortDescription:
      "How messages are designed to survive noise, mistrust, and the limits of their channels.",
    releaseDate: "2026-06-12",
    durationSeconds: 2940,
    audioSrc: "/audio/ep-005.wav",
    artworkSrc: "/artwork/ep-005.svg",
    artworkAlt: "Cover art for episode 5, Signals in the Static",
  },
  {
    id: "ep-004-rooms-that-think",
    number: 4,
    title: "Rooms That Think",
    description:
      "Libraries, studios, and control rooms shaped the work done inside them. Architects and occupants ask whether a space can hold an intention — and what we lose when every room becomes the same glowing rectangle.",
    shortDescription:
      "Can a space hold an intention — and what we lose when every room becomes the same glowing rectangle.",
    releaseDate: "2026-06-05",
    durationSeconds: 3300,
    audioSrc: "/audio/ep-004.wav",
    artworkSrc: "/artwork/ep-004.svg",
    artworkAlt: "Cover art for episode 4, Rooms That Think",
  },
  {
    id: "ep-003-patina-of-time",
    number: 3,
    title: "The Patina of Time",
    description:
      "Why do we treasure the well-worn over the brand-new? We trace patina through furniture restoration, software maintenance, and city sidewalks — the aesthetics of evidence that something has been loved.",
    shortDescription:
      "The aesthetics of evidence — why we treasure the well-worn over the brand-new.",
    releaseDate: "2026-05-29",
    durationSeconds: 2760,
    audioSrc: "/audio/ep-003.wav",
    artworkSrc: "/artwork/ep-003.svg",
    artworkAlt: "Cover art for episode 3, The Patina of Time",
  },
  {
    id: "ep-002-making-room-for-boredom",
    number: 2,
    title: "Making Room for Boredom",
    description:
      "Boredom has a PR problem. Psychologists and a professional daydreamer make the case that the idle gap — waiting rooms, long walks, lift rides — is where the best ideas queue up to arrive.",
    shortDescription:
      "The idle gap — waiting rooms, long walks — is where the best ideas queue up to arrive.",
    releaseDate: "2026-05-22",
    durationSeconds: 2580,
    audioSrc: "/audio/ep-002.wav",
    artworkSrc: "/artwork/ep-002.svg",
    artworkAlt: "Cover art for episode 2, Making Room for Boredom",
  },
  {
    id: "ep-001-first-light",
    number: 1,
    title: "First Light: An Introduction",
    description:
      "The very first transmission. Hosts Avery Lin and Jonah Reyes introduce Midnight Ink — what the show will explore, why long-form conversation still matters, and the single question every episode will circle back to.",
    shortDescription:
      "Hosts Avery Lin and Jonah Reyes introduce Midnight Ink and the question every episode circles back to.",
    releaseDate: "2026-05-15",
    durationSeconds: 1980,
    audioSrc: "/audio/ep-001.wav",
    artworkSrc: "/artwork/ep-001.svg",
    artworkAlt: "Cover art for episode 1, First Light",
  },
];

export const showInfo: ShowInformation = {
  title: "Midnight Ink",
  tagline: "Long-form conversations, composed after dark.",
  description:
    "Midnight Ink is a podcast about the craft behind the things we make — software, type, rooms, records, and rituals. Each episode is a slow conversation with someone who pays attention to detail, recorded in the quiet hours and edited like a letter worth keeping.",
  hosts: [
    {
      name: "Avery Lin",
      role: "Host & Producer",
      bio: "Avery has spent a decade editing long-form audio and still believes the best questions are the ones you write down and then don't ask.",
      avatarAlt: "Portrait illustration of host Avery Lin",
    },
    {
      name: "Jonah Reyes",
      role: "Co-host, Sound Design",
      bio: "Jonah mixes every episode and collects obsolete formats. He argues that silence is an instrument, and he has the meters to prove it.",
      avatarAlt: "Portrait illustration of co-host Jonah Reyes",
    },
  ],
  featuredEpisodeId: "ep-020-architecture-of-silence",
};

export function getFeaturedEpisode(): Episode {
  const featured = episodes.find((e) => e.id === showInfo.featuredEpisodeId);
  if (!featured) {
    throw new Error(
      `featuredEpisodeId "${showInfo.featuredEpisodeId}" does not resolve to an episode`,
    );
  }
  return featured;
}
