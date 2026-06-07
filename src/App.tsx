// Happy Mates Resource Hub — main app
import { useMemo, useState, type CSSProperties } from "react";
import { COURSES, RESOURCES } from "./data";
import { HubFooter, HubNav, Icon, Button, L } from "./components";
import { CoursesSection, ResourceCard } from "./cards";
import {
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakColor,
  useTweaks,
} from "./tweaks-panel";
import type { Bilingual, Lang, Resource, Tweaks } from "./types";

const TWEAK_DEFAULTS: Tweaks = {
  lang: "en",
  density: "comfortable",
  heroBackdrop: "clean",
  accent: "#2563eb",
};

interface Tab {
  id: string;
  label: Bilingual<string>;
  icon: string;
}

const TABS: Tab[] = [
  { id: "all", label: { en: "All", da: "Alt" }, icon: "layout-grid" },
  { id: "build", label: { en: "Build", da: "Byg" }, icon: "rocket" },
  { id: "certify", label: { en: "Certify", da: "Certificering" }, icon: "graduation-cap" },
  { id: "community", label: { en: "Community", da: "Fællesskab" }, icon: "messages-square" },
  { id: "courses", label: { en: "Courses", da: "Kurser" }, icon: "play-circle" },
];

function matches(r: Resource, q: string, lang: Lang) {
  if (!q) return true;
  const hay = [L(r.title, lang), L(r.one, lang), r.repo || "", L(r.tag, lang),
    ...L(r.contents, lang).map((c) => c.label)].join(" ").toLowerCase();
  return hay.includes(q);
}

interface HeroProps {
  lang: Lang;
  query: string;
  setQuery: (v: string) => void;
  tab: string;
  setTab: (v: string) => void;
  backdrop: string;
}

function Hero({ lang, query, setQuery, tab, setTab, backdrop }: HeroProps) {
  return (
    <header id="top" style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--hm-border)" }}>
      {backdrop === "photo" && (
        <>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/assets/happy-mates-team.jpeg)", backgroundSize: "cover", backgroundPosition: "center 30%", opacity: .5 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,.72), rgba(255,255,255,.86) 55%, var(--hm-background))" }} />
        </>
      )}
      <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "64px 24px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: "rgb(37 99 235 / .1)", color: "var(--hm-primary)", fontSize: 13, fontWeight: 600, marginBottom: 20, whiteSpace: "nowrap" }}>
          <Icon name="heart-handshake" size={15} />
          {L({ en: "Friends of Happy Mates", da: "Venner af Happy Mates" }, lang)}
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.025em", textWrap: "balance" }}>
          {L({ en: "Everything you need —", da: "Alt hvad du skal bruge —" }, lang)}<br />
          <span className="hm-gradient-text">{L({ en: "in one digital kitchen.", da: "i ét digitalt køkken." }, lang)}</span>
        </h1>
        <p style={{ margin: "22px auto 0", maxWidth: 600, fontSize: 18.5, lineHeight: 1.55, color: "var(--hm-muted-foreground)", textWrap: "pretty" }}>
          {L({ en: "Repos, study guides and the community space — the fastest way to find the right Happy Mates resource and start cooking with Claude.",
               da: "Repos, studieguider og fællesskabet — den hurtigste vej til den rette Happy Mates-ressource, så du kan komme i gang med Claude." }, lang)}
        </p>

        <div style={{ margin: "30px auto 0", maxWidth: 560, position: "relative" }}>
          <Icon name="search" size={19} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", opacity: .45 }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder={L({ en: "Search repos, guides, courses…", da: "Søg i repos, guider, kurser…" }, lang)}
            style={{
              width: "100%", height: 52, padding: "0 18px 0 48px", fontSize: 16, fontFamily: "inherit",
              border: "1px solid var(--hm-border)", borderRadius: 999, outline: "none", background: "var(--hm-background)",
              boxShadow: "var(--hm-shadow-sm)", color: "var(--hm-foreground)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--hm-primary)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hm-border)")} />
          {query && (
            <button onClick={() => setQuery("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer", color: "var(--hm-muted-foreground)", display: "flex" }}>
              <Icon name="x" size={18} />
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 22 }}>
          {TABS.map((t) => {
            const on = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 999,
                fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                border: "1px solid " + (on ? "transparent" : "var(--hm-border)"),
                background: on ? "var(--hm-primary)" : "var(--hm-background)",
                color: on ? "white" : "var(--hm-foreground)",
                boxShadow: on ? "var(--hm-shadow-sm)" : "none", transition: "all 150ms var(--hm-ease)",
              }}>
                <Icon name={t.icon} size={15} />{L(t.label, lang)}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const lang = t.lang;
  const setLang = (v: Lang) => setTweak("lang", v);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const q = query.trim().toLowerCase();

  const cards = useMemo(() => RESOURCES.filter((r) => {
    const tabOk = tab === "all" ? true : tab === "courses" ? false : r.cat === tab;
    return tabOk && matches(r, q, lang);
  }), [tab, q, lang]);

  const showCourses = (tab === "all" || tab === "courses");
  const coursesMatch = COURSES.some((c) => !q || c.t.toLowerCase().includes(q) || L(c.d, lang).toLowerCase().includes(q));
  const nothing = cards.length === 0 && !(showCourses && coursesMatch);

  return (
    <div style={{ "--hm-primary": t.accent, "--hm-ring": t.accent } as CSSProperties}>
      <HubNav lang={lang} setLang={setLang} onSearch={setQuery} query={query} />
      <Hero lang={lang} query={query} setQuery={setQuery} tab={tab} setTab={setTab} backdrop={t.heroBackdrop} />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px 16px", display: "flex", flexDirection: "column", gap: 56 }}>
        {cards.length > 0 && (
          <section id="resources" style={{ scrollMarginTop: 76 }}>
            {/* invisible anchors so nav links land in the right place when filtered */}
            <span id="build" /><span id="certify" /><span id="community" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: 24, alignItems: "stretch" }} className="resource-grid">
              {cards.map((r) => <ResourceCard key={r.id} data={r} lang={lang} density={t.density} />)}
            </div>
          </section>
        )}

        {showCourses && coursesMatch && <CoursesSection lang={lang} query={query} />}

        {nothing && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--hm-muted-foreground)" }}>
            <Icon name="search-x" size={40} style={{ opacity: .4 }} />
            <p style={{ fontSize: 17, marginTop: 14 }}>{L({ en: "Nothing matches", da: "Ingen match" }, lang)} “{query}”.</p>
            <Button variant="outline" onClick={() => { setQuery(""); setTab("all"); }}>
              <Icon name="rotate-ccw" size={15} />{L({ en: "Clear search", da: "Ryd søgning" }, lang)}
            </Button>
          </div>
        )}
      </main>

      <HubFooter lang={lang} />

      <TweaksPanel>
        <TweakSection label="Language" />
        <TweakRadio label="Language" value={t.lang} options={[{ value: "en", label: "English" }, { value: "da", label: "Dansk" }]} onChange={(v) => setTweak("lang", v as Lang)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density} options={[{ value: "comfortable", label: "Comfortable" }, { value: "compact", label: "Compact" }]} onChange={(v) => setTweak("density", v as Tweaks["density"])} />
        <TweakRadio label="Hero backdrop" value={t.heroBackdrop} options={[{ value: "clean", label: "Clean" }, { value: "photo", label: "Team photo" }]} onChange={(v) => setTweak("heroBackdrop", v as Tweaks["heroBackdrop"])} />
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent} options={["#2563eb", "#0d9488", "#ea580c", "#7c3aed"]} onChange={(v) => setTweak("accent", v as string)} />
      </TweaksPanel>
    </div>
  );
}
