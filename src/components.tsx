// Happy Mates Resource Hub — primitives & chrome
import { useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  CirclePlay,
  Compass,
  Copy,
  ExternalLink,
  FileCheck,
  FileDown,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Info,
  KeyRound,
  Languages,
  LayoutGrid,
  ListChecks,
  type LucideProps,
  MessageCircle,
  MessagesSquare,
  Notebook,
  NotebookPen,
  RotateCcw,
  Rocket,
  Search,
  SearchX,
  Sparkles,
  Terminal,
  Ticket,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { RESOURCES } from "./data";
import type { Bilingual, Lang } from "./types";

export const cx = (...xs: Array<string | false | null | undefined>): string =>
  xs.filter(Boolean).join(" ");

// bilingual accessor: pass {en,da} or a plain value
export function L<T>(v: Bilingual<T>, lang: Lang): T {
  return v && typeof v === "object" && "en" in (v as object)
    ? ((v as Record<Lang, T>)[lang] ?? (v as Record<"en", T>).en)
    : (v as T);
}

// Registry of the lucide icons referenced by the data + UI, keyed by the
// kebab-case names used throughout. "play-circle" maps to the canonical CirclePlay.
const ICONS: Record<string, ComponentType<LucideProps>> = {
  "arrow-up-right": ArrowUpRight,
  award: Award,
  "book-open": BookOpen,
  "calendar-days": CalendarDays,
  check: Check,
  compass: Compass,
  copy: Copy,
  "external-link": ExternalLink,
  "file-check": FileCheck,
  "file-down": FileDown,
  "file-text": FileText,
  github: Github,
  globe: Globe,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  "heart-handshake": HeartHandshake,
  info: Info,
  "key-round": KeyRound,
  languages: Languages,
  "layout-grid": LayoutGrid,
  "list-checks": ListChecks,
  "message-circle": MessageCircle,
  "messages-square": MessagesSquare,
  notebook: Notebook,
  "notebook-pen": NotebookPen,
  "play-circle": CirclePlay,
  "rotate-ccw": RotateCcw,
  rocket: Rocket,
  search: Search,
  "search-x": SearchX,
  sparkles: Sparkles,
  terminal: Terminal,
  ticket: Ticket,
  users: Users,
  wrench: Wrench,
  x: X,
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
}

export const Icon = ({ name, size = 16, color, style }: IconProps) => {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} color={color} style={style} />;
};

export function Logo({ size = 40 }: { size?: number }) {
  return <img src="/assets/happy-mates-logo.svg" alt="" width={size} height={size} style={{ display: "block" }} />;
}

export function Wordmark({ size = 18 }: { size?: number }) {
  return (
    <span className="hm-wordmark" style={{ fontSize: size, fontWeight: 800, letterSpacing: ".03em" }}>
      HAPPY MATES
    </span>
  );
}

type ButtonVariant = "primary" | "outline" | "ghost" | "success";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "default" | "lg" | "sm";
}

export function Button({ variant = "primary", size = "default", children, className, ...rest }: ButtonProps) {
  const variantClass = {
    primary: "hm-btn hm-btn-primary",
    outline: "hm-btn hm-btn-outline",
    ghost: "hm-btn hm-btn-ghost",
    success: "hm-btn hm-btn-success",
  }[variant] || "hm-btn";
  const sizeClass = size === "lg" ? "hm-btn-lg" : size === "sm" ? "hm-btn-sm" : "";
  return (
    <button className={cx(variantClass, sizeClass, className)} {...rest}>{children}</button>
  );
}

interface GlowProps {
  from: string;
  to: string;
  radius?: number;
  opacity?: number;
  hoverOpacity?: number;
  children: ReactNode;
  style?: CSSProperties;
}

// Gradient glow wrapper — the brand's signature card elevation
export function Glow({ from, to, radius = 18, opacity = 0.22, hoverOpacity = 0.42, children, style }: GlowProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{ position: "relative", isolation: "isolate", height: "100%", ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        position: "absolute", inset: -4, borderRadius: radius,
        background: `linear-gradient(90deg, ${from}, ${to})`,
        filter: "blur(14px)", opacity: hover ? hoverOpacity : opacity, zIndex: -1,
        transition: "opacity 300ms var(--hm-ease)",
      }} />
      {children}
    </div>
  );
}

// Copy-to-clipboard pill for the git clone line
export function CopyLine({ text, lang }: { text: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }).catch(() => {});
  };
  return (
    <button onClick={copy} title={L({ en: "Copy", da: "Kopiér" }, lang)} style={{
      display: "flex", alignItems: "center", gap: 10, width: "100%",
      fontFamily: "var(--hm-font-mono)", fontSize: 12.5, textAlign: "left",
      background: "var(--hm-muted)", border: "1px solid var(--hm-border)",
      borderRadius: 10, padding: "9px 12px", cursor: "pointer", color: "var(--hm-foreground)",
      transition: "border-color 150ms var(--hm-ease)",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--hm-primary)")}
    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--hm-border)")}>
      <Icon name="terminal" size={14} style={{ opacity: .55, flexShrink: 0 }} />
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{text}</span>
      <Icon name={copied ? "check" : "copy"} size={14} style={{ color: copied ? "var(--hm-success)" : "var(--hm-muted-foreground)", flexShrink: 0 }} />
    </button>
  );
}

interface HubNavProps {
  lang: Lang;
  setLang: (v: Lang) => void;
  onSearch: (v: string) => void;
  query: string;
}

// Sticky top nav
export function HubNav({ lang, setLang, onSearch, query }: HubNavProps) {
  const link = (label: string, target: string) => (
    <a href={"#" + target} style={{ fontSize: 14, textDecoration: "none", color: "var(--hm-foreground)", transition: "color 150ms" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--hm-primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--hm-foreground)")}>{label}</a>
  );
  const teamsHref = RESOURCES.find((r) => r.id === "teams")!.links[0].href;
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.85)",
      borderBottom: "1px solid var(--hm-border)", padding: "12px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
      backdropFilter: "saturate(180%) blur(8px)",
    }}>
      <a href="#top" style={{ display: "flex", gap: 11, alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
        <Logo size={34} /><Wordmark size={17} />
      </a>
      <div className="hub-nav-links" style={{ display: "flex", gap: 22, alignItems: "center" }}>
        {link(L({ en: "Build", da: "Byg" }, lang), "build")}
        {link(L({ en: "Certify", da: "Certificering" }, lang), "certify")}
        {link(L({ en: "Community", da: "Fællesskab" }, lang), "community")}
        {link(L({ en: "Courses", da: "Kurser" }, lang), "courses")}
        {link(L({ en: "Friends", da: "Venner" }, lang), "friends")}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
        <div className="hub-nav-search" style={{
          display: "flex", alignItems: "center", gap: 8, height: 34, padding: "0 12px",
          background: "var(--hm-muted)", borderRadius: 999, border: "1px solid var(--hm-border)",
        }}>
          <Icon name="search" size={15} style={{ opacity: .5 }} />
          <input value={query} onChange={(e) => onSearch(e.target.value)}
            placeholder={L({ en: "Search…", da: "Søg…" }, lang)}
            style={{ border: "none", background: "transparent", outline: "none", fontSize: 13.5, width: 120, fontFamily: "inherit", color: "var(--hm-foreground)" }} />
        </div>
        <LangToggle lang={lang} setLang={setLang} />
        <a href={teamsHref} target="_blank" rel="noopener" className="hm-btn hm-btn-primary" style={{ textDecoration: "none" }}>
          <Icon name="messages-square" size={15} />{L({ en: "Open Teams", da: "Åbn Teams" }, lang)}
        </a>
      </div>
    </nav>
  );
}

export function LangToggle({ lang, setLang }: { lang: Lang; setLang: (v: Lang) => void }) {
  return (
    <div style={{ display: "flex", border: "1px solid var(--hm-border)", borderRadius: 999, overflow: "hidden", height: 30 }}>
      {(["en", "da"] as const).map((code) => (
        <button key={code} onClick={() => setLang(code)} style={{
          border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, padding: "0 11px",
          letterSpacing: ".04em",
          background: lang === code ? "var(--hm-primary)" : "transparent",
          color: lang === code ? "white" : "var(--hm-muted-foreground)",
          transition: "background 150ms, color 150ms",
        }}>{code.toUpperCase()}</button>
      ))}
    </div>
  );
}

export function HubFooter({ lang }: { lang: Lang }) {
  const links: Array<{ label: Bilingual<string>; href: string; icon: string }> = [
    { label: "happy-mates on GitHub", href: "https://github.com/happy-mates", icon: "github" },
    { label: { en: "Anthropic Academy", da: "Anthropic Academy" }, href: "https://anthropic.skilljar.com", icon: "graduation-cap" },
    { label: { en: "Claude Partner Network", da: "Claude Partner Network" }, href: "https://claude.com/partners", icon: "users" },
    { label: "Claude docs", href: "https://platform.claude.com/docs", icon: "book-open" },
  ];
  return (
    <footer style={{ background: "rgb(241 245 249 / .5)", borderTop: "1px solid var(--hm-border)", padding: "48px 24px 28px", marginTop: 8 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ maxWidth: 320 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
            <Logo size={28} /><b style={{ fontSize: 16 }}>Happy Mates</b>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--hm-muted-foreground)", margin: 0 }}>
            {L({ en: "A shared kitchen for friends of Happy Mates — every recipe, repo and link in one place.", da: "Et fælles køkken for venner af Happy Mates — alle opskrifter, repos og links samme sted." }, lang)}
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5,
              color: "var(--hm-muted-foreground)", textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--hm-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--hm-muted-foreground)")}>
              <Icon name={l.icon} size={15} />{L(l.label, lang)}
            </a>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1120, margin: "36px auto 0", paddingTop: 22, borderTop: "1px solid var(--hm-border)", textAlign: "center", fontSize: 12.5, color: "var(--hm-muted-foreground)" }}>
        © 2026 Happy Mates · {L({ en: "Made with a warm heart and a curly brain.", da: "Lavet med et varmt hjerte og en krøllet hjerne." }, lang)}
      </div>
    </footer>
  );
}
