// Happy Mates Resource Hub — resource cards & courses
import { COURSES } from "./data";
import { cx, Icon, L, Glow, CopyLine } from "./components";
import type {
  Accent,
  ContentItem,
  Domain,
  ExamStat,
  Lang,
  LangGuide,
  Resource,
  ResourceLink,
  Video,
} from "./types";

function LinkRow({ links, lang, accent }: { links: ResourceLink[]; lang: Lang; accent: Accent }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto", paddingTop: 4 }}>
      {links.map((l, i) => (
        <a key={i} href={l.href} target="_blank" rel="noopener"
          className={cx("hm-btn", l.primary ? "" : "hm-btn-outline")}
          style={l.primary
            ? { textDecoration: "none", background: accent.fg, color: "white", border: "1px solid transparent" }
            : { textDecoration: "none" }}>
          {l.icon && <Icon name={l.icon} size={15} />}
          {L(l.label, lang)}
        </a>
      ))}
    </div>
  );
}

function ContentList({ items, accent }: { items: ContentItem[]; accent: Accent }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 4px", display: "flex", flexDirection: "column", gap: 9 }}>
      {items.map((c, i) => (
        <li key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 14, lineHeight: 1.45 }}>
          <Icon name={c.icon} size={17} color={accent.fg} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>{c.label}</span>
        </li>
      ))}
    </ul>
  );
}

// language PDF pills (Architect card)
function LangPills({ langs, base, lang }: { langs: LangGuide[]; base: string; lang: Lang }) {
  return (
    <div>
      <div className="hm-eyebrow" style={{ marginBottom: 9 }}>{L({ en: "Guide languages — direct to PDF", da: "Guidesprog — direkte til PDF" }, lang)}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {langs.map((g) => (
          <a key={g.code} href={base + g.file + ".pdf"} target="_blank" rel="noopener" title={"PDF · " + g.code} style={{
            display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 999,
            border: "1px solid var(--hm-border)", background: "var(--hm-background)", fontSize: 12.5, fontWeight: 600,
            color: "var(--hm-foreground)", textDecoration: "none", letterSpacing: ".03em",
            transition: "border-color 150ms, color 150ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ea580c"; e.currentTarget.style.color = "#ea580c"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--hm-border)"; e.currentTarget.style.color = "var(--hm-foreground)"; }}>
            {g.code}<Icon name="file-down" size={12} style={{ opacity: .55 }} />
          </a>
        ))}
      </div>
    </div>
  );
}

// exam stats + weighted domain bars (Architect2 card)
function DomainBlock({ data, lang }: { data: { exam: ExamStat[]; domains: Domain[]; domainBase: string }; lang: Lang }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {data.exam.map((e, i) => (
          <div key={i} style={{ flex: 1, background: "var(--hm-muted)", borderRadius: 10, padding: "9px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 17, fontWeight: 700, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>{e.v}</div>
            <div style={{ fontSize: 11, color: "var(--hm-muted-foreground)", marginTop: 2 }}>{L(e.k, lang)}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.domains.map((d) => (
          <a key={d.n} href={data.domainBase + d.f + ".md"} target="_blank" rel="noopener" style={{ textDecoration: "none", color: "inherit", display: "block" }} className="domain-row">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--hm-muted-foreground)", width: 14, fontVariantNumeric: "tabular-nums" }}>{d.n}</span>
              <span style={{ flex: 1, fontSize: 13, lineHeight: 1.3 }}>{L(d.t, lang)}</span>
              <span style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: "tabular-nums", color: "#6366f1", width: 32, textAlign: "right" }}>{d.w}%</span>
            </div>
            <div style={{ height: 5, background: "var(--hm-muted)", borderRadius: 99, marginTop: 5, overflow: "hidden", marginLeft: 24 }}>
              <div style={{ height: "100%", width: (d.w / 27 * 100) + "%", background: "linear-gradient(90deg,#6366f1,#a855f7)", borderRadius: 99 }} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function VideoEmbed({ video, lang }: { video: Video; lang: Lang }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 12, overflow: "hidden", border: "1px solid var(--hm-border)" }}>
      <iframe
        src={video.src}
        title={L(video.title, lang)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function Note({ children, accent }: { children: React.ReactNode; accent: Accent }) {
  return (
    <div style={{
      display: "flex", gap: 9, alignItems: "flex-start", fontSize: 12.5, lineHeight: 1.5,
      color: "var(--hm-muted-foreground)", background: accent.tint, borderRadius: 10, padding: "10px 12px",
    }}>
      <Icon name="info" size={15} color={accent.fg} style={{ flexShrink: 0, marginTop: 1 }} />
      <span>{children}</span>
    </div>
  );
}

export function ResourceCard({ data, lang, density }: { data: Resource; lang: Lang; density: string }) {
  const a = data.accent;
  const pad = density === "compact" ? 22 : 28;
  const gap = density === "compact" ? 14 : 18;
  return (
    <Glow from={a.from} to={a.to}>
      <article style={{
        background: "var(--hm-background)", border: "1px solid rgb(37 99 235 / .14)", borderRadius: 16,
        padding: pad, height: "100%", display: "flex", flexDirection: "column", gap,
      }}>
        <header style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ padding: 11, borderRadius: 12, background: a.tint, flexShrink: 0 }}>
            <Icon name={data.icon} size={26} color={a.fg} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: a.fg, background: a.tint, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>{L(data.tag, lang)}</span>
              {data.repo && <code style={{ fontSize: 11.5, color: "var(--hm-muted-foreground)", fontFamily: "var(--hm-font-mono)" }}>{data.repo}</code>}
            </div>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-.01em" }}>{L(data.title, lang)}</h3>
          </div>
        </header>

        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--hm-muted-foreground)", textWrap: "pretty" }}>{L(data.one, lang)}</p>

        <ContentList items={L(data.contents, lang)} accent={a} />

        {data.clone && <CopyLine text={data.clone} lang={lang} />}
        {data.video && <VideoEmbed video={data.video} lang={lang} />}
        {data.langs && data.langBase && <LangPills langs={data.langs} base={data.langBase} lang={lang} />}
        {data.exam && data.domains && data.domainBase && <DomainBlock data={{ exam: data.exam, domains: data.domains, domainBase: data.domainBase }} lang={lang} />}
        {data.note && <Note accent={a}>{L(data.note, lang)}</Note>}

        <LinkRow links={data.links} lang={lang} accent={a} />
      </article>
    </Glow>
  );
}

export function CoursesSection({ lang, query }: { lang: Lang; query: string }) {
  const q = query.trim().toLowerCase();
  const list = COURSES.filter((c) => !q || c.t.toLowerCase().includes(q) || L(c.d, lang).toLowerCase().includes(q));
  if (q && list.length === 0) return null;
  return (
    <section id="courses" style={{ scrollMarginTop: 76 }}>
      <SectionHead
        eyebrow={L({ en: "Free to everyone", da: "Gratis for alle" }, lang)}
        title={L({ en: "Free courses from Anthropic Academy", da: "Gratis kurser fra Anthropic Academy" }, lang)}
        sub={L({ en: "Thirteen self-paced courses and certificates — no partner access required.", da: "Tretten kurser og certifikater i eget tempo — ingen partneradgang krævet." }, lang)}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {list.map((c) => (
          <a key={c.href} href={c.href} target="_blank" rel="noopener" className="course-tile" style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", textDecoration: "none",
            background: "var(--hm-background)", border: "1px solid var(--hm-border)", borderRadius: 12, color: "inherit",
            transition: "border-color 150ms, box-shadow 150ms, transform 150ms",
          }}>
            <Icon name="play-circle" size={20} color="var(--hm-primary)" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.25 }}>{c.t}</div>
              <div style={{ fontSize: 12.5, color: "var(--hm-muted-foreground)", marginTop: 1 }}>{L(c.d, lang)}</div>
            </div>
            <Icon name="arrow-up-right" size={16} style={{ opacity: .4, flexShrink: 0 }} />
          </a>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div className="hm-eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>
      <h2 style={{ margin: 0, fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.1 }}>{title}</h2>
      {sub && <p style={{ margin: "8px 0 0", fontSize: 16, color: "var(--hm-muted-foreground)", lineHeight: 1.5, maxWidth: 620 }}>{sub}</p>}
    </div>
  );
}
