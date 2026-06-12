// Happy Mates Resource Hub — resource cards & courses
import { COURSES, CPN_PATH_HREFS } from "./data";
import { cx, Icon, L, Glow, CopyLine } from "./components";
import type {
  Accent,
  ContentItem,
  Course,
  Domain,
  ExamStat,
  Lang,
  LangGuide,
  Resource,
  ResourceLink,
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

export function FriendsSection({ lang }: { lang: Lang }) {
  const cpnCourses = CPN_PATH_HREFS
    .map((href) => COURSES.find((c) => c.href === href))
    .filter(Boolean) as Course[];

  return (
    <section id="friends" style={{ scrollMarginTop: 76 }}>
      <SectionHead
        eyebrow={L({ en: "Support our journey", da: "Støt vores rejse" }, lang)}
        title={L({ en: "Friends of Happy Mates", da: "Venner af Happy Mates" }, lang)}
        sub={L({
          en: "Help us become a certified Claude Partner — join our certification journey and get Claude Pro on us.",
          da: "Hjælp os med at blive et certificeret Claude Partner — deltag i vores certificeringsrejse og få Claude Pro af os.",
        }, lang)}
      />

      {/* ── How you can support ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 40 }}>
        <SupportCard
          icon="graduation-cap"
          fg="#2563eb"
          tint="rgb(37 99 235 / .1)"
          title={L({ en: "Get a Skill Jar account", da: "Få en Skill Jar-konto" }, lang)}
        >
          {L({ en: "You'll need a ", da: "Du skal bruge en " }, lang)}
          <code style={{ background: "var(--hm-muted)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>@happymates.dk</code>
          {L({ en: " email address. Request one from ", da: "-mailadresse. Anmod om en hos " }, lang)}
          <a href="mailto:niels@happymates.dk" style={{ color: "var(--hm-primary)", textDecoration: "none", fontWeight: 600 }}>
            niels@happymates.dk
          </a>.
        </SupportCard>

        <SupportCard
          icon="sparkles"
          fg="#ea580c"
          tint="rgb(249 115 22 / .1)"
          title={L({ en: "Try Claude Pro Free", da: "Prøv Claude Pro gratis" }, lang)}
        >
          {L({
            en: "Get a 2-month Claude Pro licence on us when you help out by completing the CPN learning path.",
            da: "Få en 2-måneders Claude Pro-licens af os, når du hjælper ved at gennemføre CPN-læringsforløbet.",
          }, lang)}
        </SupportCard>
      </div>

      {/* ── Partner requirements ─── */}
      <div style={{ marginBottom: 40 }}>
        <div className="hm-eyebrow" style={{ marginBottom: 14 }}>
          {L({ en: "Partner requirements & programme steps", da: "Partnerkrav og programtrin" }, lang)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {([
            {
              n: "1",
              title: L({ en: "Enrol ten team members in Anthropic Academy", da: "Tilmeld ti teammedlemmer til Anthropic Academy" }, lang),
              body: L({
                en: "Complete the CPN learning path. Ideal participants: delivery leads, architects, and key contributors for customer engagements.",
                da: "Gennemfør CPN-læringsforløbet. Ideelle deltagere: leveranceledere, arkitekter og nøglebidragydere til kundeengagementer.",
              }, lang),
            },
            {
              n: "2",
              title: L({ en: "Confirm completion", da: "Bekræft gennemførelse" }, lang),
              body: L({
                en: "Once all ten complete the path, confirm completion so Anthropic can unlock the Claude Certified Architect Foundations (CCAF) technical certification.",
                da: "Når alle ti har gennemført forløbet, bekræft gennemførelse, så Anthropic kan låse op for den tekniske certificering Claude Certified Architect Foundations (CCAF).",
              }, lang),
            },
          ] as const).map((step) => (
            <div key={step.n} style={{
              display: "flex", gap: 14, alignItems: "flex-start",
              background: "var(--hm-muted)", borderRadius: 12, padding: "16px 18px",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: "var(--hm-primary)",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>{step.n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--hm-muted-foreground)" }}>{step.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CPN Learning Path courses ─── */}
      <div className="hm-eyebrow" style={{ marginBottom: 10 }}>
        {L({ en: "Claude Partner Network Learning Path", da: "Claude Partner Network-læringsforløb" }, lang)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {cpnCourses.map((c, i) => (
          <a key={c.href} href={c.href} target="_blank" rel="noopener" className="course-tile" style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", textDecoration: "none",
            background: "var(--hm-background)", border: "1px solid var(--hm-border)", borderRadius: 12, color: "inherit",
            transition: "border-color 150ms, box-shadow 150ms, transform 150ms",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgb(37 99 235 / .1)", color: "var(--hm-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>{i + 1}</div>
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

function SupportCard({
  icon, fg, tint, title, children,
}: {
  icon: string; fg: string; tint: string; title: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "var(--hm-background)", border: "1px solid var(--hm-border)",
      borderRadius: 14, padding: "22px 22px 20px",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ padding: 10, borderRadius: 10, background: tint, flexShrink: 0 }}>
          <Icon name={icon} size={22} color={fg} />
        </div>
        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: 1.25 }}>{title}</h4>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--hm-muted-foreground)" }}>{children}</div>
    </div>
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
