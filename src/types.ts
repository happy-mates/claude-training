// Happy Mates Resource Hub — shared types

export type Lang = "en" | "da";

/** A value that is either plain (language-neutral) or a bilingual { en, da } pair. */
export type Bilingual<T> = T | { en: T; da: T };

export interface ContentItem {
  icon: string;
  label: string;
}

export interface ResourceLink {
  label: Bilingual<string>;
  href: string;
  primary?: boolean;
  icon?: string;
}

export interface Accent {
  from: string;
  to: string;
  tint: string;
  fg: string;
}

export interface LangGuide {
  code: string;
  file: string;
}

export interface Video {
  src: string;
  title: Bilingual<string>;
}

export interface ExamStat {
  k: Bilingual<string>;
  v: string;
}

export interface Domain {
  n: string;
  w: number;
  t: Bilingual<string>;
  f: string;
}

export type ResourceCategory = "build" | "certify" | "community";

export interface Resource {
  id: string;
  cat: ResourceCategory;
  icon: string;
  accent: Accent;
  tag: Bilingual<string>;
  title: Bilingual<string>;
  repo: string | null;
  one: Bilingual<string>;
  contents: Bilingual<ContentItem[]>;
  links: ResourceLink[];
  clone?: string;
  video?: Video;
  note?: Bilingual<string>;
  langs?: LangGuide[];
  langBase?: string;
  exam?: ExamStat[];
  domains?: Domain[];
  domainBase?: string;
}

export interface Course {
  t: string;
  d: Bilingual<string>;
  href: string;
}

export interface Tweaks {
  lang: Lang;
  density: "comfortable" | "compact";
  heroBackdrop: "clean" | "photo";
  accent: string;
}
