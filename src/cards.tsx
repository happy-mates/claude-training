// Happy Mates Resource Hub — resource cards & courses
import { useState } from "react";
import { COURSES, CPN_PATH_HREFS } from "./data";
import { cx, Icon, L, Glow, CopyLine } from "./components";
import { trackEvent, partnershipUrl } from "./analytics";
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

// ── Partnership landing sections ──────────────────────────────────────────

function CheckItem({ icon = "check", color = "var(--hm-primary)", children }: { icon?: string; color?: string; children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5, lineHeight: 1.5 }}>
      <Icon name={icon} size={17} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
      <span>{children}</span>
    </li>
  );
}

function ResponsibilityCard({
  icon, fg, tint, title, items,
}: {
  icon: string; fg: string; tint: string; title: string; items: string[];
}) {
  return (
    <div style={{
      background: "var(--hm-background)", border: "1px solid var(--hm-border)",
      borderRadius: 16, padding: "24px 24px 20px",
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ padding: 11, borderRadius: 12, background: tint, flexShrink: 0 }}>
          <Icon name={icon} size={24} color={fg} />
        </div>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{title}</h3>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => <CheckItem key={i} color={fg}>{item}</CheckItem>)}
      </ul>
    </div>
  );
}

function PartnershipForm({ lang }: { lang: Lang }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("partnership_form_submit", { company, source: "inline-form" });
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 42, padding: "0 14px", fontSize: 15, fontFamily: "inherit",
    border: "1px solid var(--hm-border)", borderRadius: 10, outline: "none",
    background: "var(--hm-background)", color: "var(--hm-foreground)",
    transition: "border-color 150ms",
  };

  if (submitted) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        padding: "40px 24px", background: "rgb(34 197 94 / .08)", borderRadius: 16,
        border: "1px solid rgb(34 197 94 / .25)", textAlign: "center",
      }}>
        <div style={{ padding: 14, borderRadius: "50%", background: "rgb(34 197 94 / .12)" }}>
          <Icon name="check" size={28} color="#16a34a" />
        </div>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
          {L({ en: "Request received — thank you!", da: "Anmodning modtaget — tak!" }, lang)}
        </h3>
        <p style={{ margin: 0, fontSize: 15, color: "var(--hm-muted-foreground)", maxWidth: 400 }}>
          {L({
            en: "We'll be in touch within 2 business days to discuss next steps.",
            da: "Vi kontakter dig inden for 2 arbejdsdage for at drøfte næste skridt.",
          }, lang)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{L({ en: "Your name", da: "Dit navn" }, lang)} *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle}
            placeholder={L({ en: "Niels Hansen", da: "Niels Hansen" }, lang)}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--hm-primary)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hm-border)")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{L({ en: "Work email", da: "Arbejdsmail" }, lang)} *</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle}
            placeholder="niels@happymates.dk"
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--hm-primary)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hm-border)")} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>{L({ en: "Company / team", da: "Virksomhed / team" }, lang)}</label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} style={inputStyle}
          placeholder={L({ en: "Happy Mates", da: "Happy Mates" }, lang)}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--hm-primary)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hm-border)")} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>{L({ en: "Message (optional)", da: "Besked (valgfri)" }, lang)}</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder={L({ en: "Tell us about your integration goals or questions…", da: "Fortæl os om dine integrationsmål eller spørgsmål…" }, lang)}
          rows={4} style={{ ...inputStyle, height: "auto", padding: "10px 14px", resize: "vertical" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--hm-primary)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hm-border)")} />
      </div>
      <button type="submit" className="hm-btn hm-btn-primary" style={{ alignSelf: "flex-start" }}>
        <Icon name="handshake" size={16} />
        {L({ en: "Submit partnership request", da: "Indsend partnerskabsanmodning" }, lang)}
      </button>
      <p style={{ margin: 0, fontSize: 12.5, color: "var(--hm-muted-foreground)" }}>
        {L({
          en: "Expect a response within 2 business days. We'll set up a call to discuss fit and next steps.",
          da: "Forvent svar inden for 2 arbejdsdage. Vi aftaler et opkald for at drøfte match og næste skridt.",
        }, lang)}
      </p>
    </form>
  );
}

export function PartnershipSection({ lang }: { lang: Lang }) {
  return (
    <section id="partnership" style={{ scrollMarginTop: 76, display: "flex", flexDirection: "column", gap: 56 }}>

      {/* ── The Ask (expanded) ── */}
      <div>
        <SectionHead
          eyebrow={L({ en: "The Ask", da: "Anmodningen" }, lang)}
          title={L({ en: "What we want from Claude / Anthropic", da: "Hvad vi ønsker fra Claude / Anthropic" }, lang)}
          sub={L({
            en: "Happy Mates is building a conversational assistance layer inside its platform. We're asking Anthropic for API access, integration collaboration, and pilot support to make it work — safely and at scale.",
            da: "Happy Mates bygger et konversationshjælpelag inde i sin platform. Vi beder Anthropic om API-adgang, integrationssamarbejde og pilotstøtte for at få det til at fungere — sikkert og i stor skala.",
          }, lang)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <SupportCard icon="rocket" fg="#2563eb" tint="rgb(37 99 235 / .1)"
            title={L({ en: "Key objective", da: "Nøglemål" }, lang)}>
            {L({
              en: "Integrate Claude into the Happy Mates user flow to deliver smarter, context-aware help — targeting a 30 % uplift in task-completion rate during the 8-week pilot.",
              da: "Integrer Claude i Happy Mates brugerflow for at levere smartere, kontekstbevidst hjælp — med mål om 30 % stigning i opgaveafslutningsrate under 8-ugers piloten.",
            }, lang)}
          </SupportCard>
          <SupportCard icon="bar-chart-2" fg="#0d9488" tint="rgb(20 184 166 / .1)"
            title={L({ en: "Success metric", da: "Succesmetrik" }, lang)}>
            {L({
              en: "Primary: ≥ 30 % task-completion uplift vs. baseline. Secondary: ≥ 80 % user satisfaction score (CSAT) on AI-assisted sessions during the pilot period.",
              da: "Primær: ≥ 30 % stigning i opgaveafslutning ift. baseline. Sekundær: ≥ 80 % brugertilfredshed (CSAT) på AI-assisterede sessioner i pilotperioden.",
            }, lang)}
          </SupportCard>
        </div>
      </div>

      {/* ── Responsibilities ── */}
      <div id="responsibilities" style={{ scrollMarginTop: 76 }}>
        <SectionHead
          eyebrow={L({ en: "Responsibilities — who does what", da: "Ansvar — hvem gør hvad" }, lang)}
          title={L({ en: "Clear, actionable ownership", da: "Klart, handlingsorienteret ejerskab" }, lang)}
          sub={L({
            en: "Each party has defined commitments so the pilot can move fast without ambiguity.",
            da: "Hver part har definerede forpligtelser, så piloten kan bevæge sig hurtigt uden tvetydighed.",
          }, lang)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          <ResponsibilityCard
            icon="building-2" fg="#2563eb" tint="rgb(37 99 235 / .1)"
            title={L({ en: "Happy Mates will…", da: "Happy Mates vil…" }, lang)}
            items={[
              L({ en: "Provide 1 backend engineer + 1 PM for the integration (timeline: 8 weeks).", da: "Stille 1 backend-ingeniør + 1 PM til integrationen (tidsramme: 8 uger)." }, lang),
              L({ en: "Share domain data and example conversation flows for tuning.", da: "Dele domænedata og eksempelsamtaleflows til finjustering." }, lang),
              L({ en: "Own user testing, feedback collection, and product rollout.", da: "Eje brugertestning, feedback-indsamling og produktudrulning." }, lang),
              L({ en: "Publish a public case study on outcomes (pending approval).", da: "Udgive en offentlig case study om resultater (afventer godkendelse)." }, lang),
            ]}
          />
          <ResponsibilityCard
            icon="sparkles" fg="#7c3aed" tint="rgb(124 58 237 / .1)"
            title={L({ en: "Claude / Anthropic will…", da: "Claude / Anthropic vil…" }, lang)}
            items={[
              L({ en: "Provide API access, test credentials, and recommended integration patterns.", da: "Stille API-adgang, testlgitimationsoplysninger og anbefalede integrationsmønstre til rådighed." }, lang),
              L({ en: "Offer up to 8 hours of engineering collaboration for integration troubleshooting.", da: "Tilbyde op til 8 timers ingeniørsamarbejde til integrationsfejlsøgning." }, lang),
              L({ en: "Share safety and compliance guidance relevant to user-facing AI features.", da: "Dele sikkerheds- og compliancevejledning relevant for brugervendte AI-funktioner." }, lang),
              L({ en: "Provide a dedicated partner contact for escalations.", da: "Stille en dedikeret partnerkontakt til eskalationer til rådighed." }, lang),
            ]}
          />
          <ResponsibilityCard
            icon="handshake" fg="#ea580c" tint="rgb(249 115 22 / .1)"
            title={L({ en: "Joint activities", da: "Fælles aktiviteter" }, lang)}
            items={[
              L({ en: "Weekly 30-min sync during the integration phase.", da: "Ugentlig 30-min synkronisering i integrationsfasen." }, lang),
              L({ en: "Shared roadmap and success-criteria sign-off before kick-off.", da: "Fælles roadmap og godkendelse af succeskriterierne inden kick-off." }, lang),
              L({ en: "Joint review at week 4 (mid-point check) and week 8 (final pilot readout).", da: "Fælles gennemgang i uge 4 (midtvejstjek) og uge 8 (afsluttende pilotgennemgang)." }, lang),
              L({ en: "Shared reporting dashboard accessible to both teams.", da: "Fælles rapporteringsdashboard tilgængeligt for begge teams." }, lang),
            ]}
          />
        </div>
      </div>

      {/* ── Support & Resources ── */}
      <div id="support" style={{ scrollMarginTop: 76 }}>
        <SectionHead
          eyebrow={L({ en: "Support & resources", da: "Støtte og ressourcer" }, lang)}
          title={L({ en: "How each party will be supported", da: "Hvordan hver part vil blive støttet" }, lang)}
          sub={L({
            en: "Named contacts, clear channels, and defined SLAs so nothing gets lost.",
            da: "Navngivne kontakter, klare kanaler og definerede SLA'er, så intet går tabt.",
          }, lang)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <SupportCard icon="wrench" fg="#2563eb" tint="rgb(37 99 235 / .1)"
            title={L({ en: "Technical support", da: "Teknisk support" }, lang)}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckItem color="#2563eb">{L({ en: "Dedicated Anthropic engineering contact for troubleshooting & code review.", da: "Dedikeret Anthropic-ingeniørkontakt til fejlsøgning og kodegennemgang." }, lang)}</CheckItem>
              <CheckItem color="#2563eb">{L({ en: "Shared Slack channel (or ticketing) for async support.", da: "Delt Slack-kanal (eller billetsystem) til asynkron support." }, lang)}</CheckItem>
              <CheckItem color="#2563eb">{L({ en: "Scheduled office hours (2 × 1 h/week) during the pilot.", da: "Planlagte kontortider (2 × 1 t/uge) under piloten." }, lang)}</CheckItem>
            </ul>
          </SupportCard>
          <SupportCard icon="users" fg="#0d9488" tint="rgb(20 184 166 / .1)"
            title={L({ en: "Product support", da: "Produktsupport" }, lang)}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckItem color="#0d9488">{L({ en: "Named PM contacts on both sides for prioritisation decisions.", da: "Navngivne PM-kontakter på begge sider til prioriteringsbeslutninger." }, lang)}</CheckItem>
              <CheckItem color="#0d9488">{L({ en: "Go/no-go review gate at week 4 with both PMs present.", da: "Go/no-go gennemgangspunkt i uge 4 med begge PM'er til stede." }, lang)}</CheckItem>
              <CheckItem color="#0d9488">{L({ en: "Design-review session for any Claude-facing UI components.", da: "Designgennemgangssession for enhver Claude-vendt UI-komponent." }, lang)}</CheckItem>
            </ul>
          </SupportCard>
          <SupportCard icon="bar-chart-2" fg="#7c3aed" tint="rgb(124 58 237 / .1)"
            title={L({ en: "Analytics & measurement", da: "Analyse og måling" }, lang)}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckItem color="#7c3aed">{L({ en: "Weekly metrics report shared with both teams (completion rate, CSAT, latency).", da: "Ugentlig metrikrapport delt med begge teams (afslutningsrate, CSAT, latenstid)." }, lang)}</CheckItem>
              <CheckItem color="#7c3aed">{L({ en: "Real-time dashboard read access for Anthropic's partner team.", da: "Realtids dashboard-læseadgang for Anthropics partnerteam." }, lang)}</CheckItem>
              <CheckItem color="#7c3aed">{L({ en: "Final pilot readout document at week 8.", da: "Endelig pilotrapport i uge 8." }, lang)}</CheckItem>
            </ul>
          </SupportCard>
          <SupportCard icon="shield-check" fg="#ea580c" tint="rgb(249 115 22 / .1)"
            title={L({ en: "Legal & compliance", da: "Juridisk og compliance" }, lang)}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckItem color="#ea580c">{L({ en: "NDA turnaround: 5 business days from first contact.", da: "NDA-behandlingstid: 5 arbejdsdage fra første kontakt." }, lang)}</CheckItem>
              <CheckItem color="#ea580c">{L({ en: "Pilot agreement signed before any API credentials are shared.", da: "Pilotaftale underskrevet inden API-legitimationsoplysninger deles." }, lang)}</CheckItem>
              <CheckItem color="#ea580c">{L({ en: "Anthropic safety & usage policy review included in onboarding.", da: "Anthropic sikkerheds- og brugspolitikgennemgang inkluderet i onboarding." }, lang)}</CheckItem>
            </ul>
          </SupportCard>
        </div>
      </div>

      {/* ── Benefits & Use-cases ── */}
      <div id="benefits" style={{ scrollMarginTop: 76 }}>
        <SectionHead
          eyebrow={L({ en: "Benefits & use-cases", da: "Fordele og anvendelsestilfælde" }, lang)}
          title={L({ en: "Why this matters for Happy Mates users", da: "Hvorfor det er vigtigt for Happy Mates-brugere" }, lang)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {([
            {
              icon: "message-circle", fg: "#2563eb", tint: "rgb(37 99 235 / .1)",
              title: { en: "Smarter in-app help", da: "Smartere in-app hjælp" },
              body: {
                en: "Claude understands the context of the user's current task and replies with step-by-step guidance — cutting average support-ticket time by an estimated 40 %.",
                da: "Claude forstår konteksten af brugerens aktuelle opgave og svarer med trin-for-trin vejledning — og reducerer estimeret gennemsnitlig supportsagsbehandlingstid med 40 %.",
              },
            },
            {
              icon: "shield-check", fg: "#0d9488", tint: "rgb(20 184 166 / .1)",
              title: { en: "Safe, policy-compliant answers", da: "Sikre, politikoverholdende svar" },
              body: {
                en: "Anthropic's safety layer ensures Claude never surfaces harmful, off-brand, or non-compliant content — critical for Happy Mates' regulated user base.",
                da: "Anthropics sikkerhedslag sikrer, at Claude aldrig viser skadeligt, off-brand eller ikke-kompatibelt indhold — afgørende for Happy Mates' regulerede brugerbasis.",
              },
            },
            {
              icon: "rocket", fg: "#7c3aed", tint: "rgb(124 58 237 / .1)",
              title: { en: "Faster onboarding", da: "Hurtigere onboarding" },
              body: {
                en: "New Happy Mates users guided by Claude complete their profile and first task 2 × faster than those using static documentation — validated in pre-pilot user tests.",
                da: "Nye Happy Mates-brugere, der vejledes af Claude, fuldfører deres profil og første opgave 2 × hurtigere end dem, der bruger statisk dokumentation — valideret i pre-pilot brugertests.",
              },
            },
          ] as const).map((card) => (
            <SupportCard key={card.icon} icon={card.icon} fg={card.fg} tint={card.tint}
              title={L(card.title, lang)}>
              {L(card.body, lang)}
            </SupportCard>
          ))}
        </div>
      </div>

      {/* ── Social proof ── */}
      <div style={{ background: "var(--hm-muted)", borderRadius: 16, padding: "32px 28px" }}>
        <div className="hm-eyebrow" style={{ marginBottom: 14, textAlign: "center" }}>
          {L({ en: "Why Claude + Happy Mates", da: "Hvorfor Claude + Happy Mates" }, lang)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, textAlign: "center" }}>
          {([
            { stat: "10+", label: { en: "team members on the CPN learning path", da: "teammedlemmer på CPN-læringsforløbet" } },
            { stat: "8 wks", label: { en: "target pilot timeline", da: "målrettet pilottidsramme" } },
            { stat: "30 %", label: { en: "projected task-completion uplift", da: "forventet stigning i opgaveafslutning" } },
            { stat: "2026", label: { en: "target GA launch year", da: "mål for GA-lanceringår" } },
          ] as const).map((item) => (
            <div key={item.stat}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--hm-primary)", letterSpacing: "-.02em" }}>{item.stat}</div>
              <div style={{ fontSize: 13.5, color: "var(--hm-muted-foreground)", marginTop: 4, lineHeight: 1.4 }}>{L(item.label, lang)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Next steps & CTAs ── */}
      <div id="next-steps" style={{ scrollMarginTop: 76, display: "flex", flexDirection: "column", gap: 28 }}>
        <SectionHead
          eyebrow={L({ en: "Next steps", da: "Næste skridt" }, lang)}
          title={L({ en: "Ready to move forward?", da: "Klar til at gå videre?" }, lang)}
          sub={L({
            en: "Submit a partnership request below or reach out directly — we'll reply within 2 business days.",
            da: "Indsend en partnerskabsanmodning nedenfor, eller kontakt os direkte — vi svarer inden for 2 arbejdsdage.",
          }, lang)}
        />

        {/* Quick-link CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a
            href={partnershipUrl("next-steps-primary")}
            target="_blank" rel="noopener"
            className="hm-btn hm-btn-primary"
            style={{ textDecoration: "none" }}
            onClick={() => trackEvent("partnership_cta_click", { cta: "next-steps-primary" })}
          >
            <Icon name="handshake" size={16} />
            {L({ en: "Open partnership form", da: "Åbn partnerskabsskema" }, lang)}
          </a>
          <a
            href="mailto:niels@happymates.dk?subject=Claude%20Partnership%20%E2%80%94%20Request%20for%20technical%20sandbox"
            className="hm-btn hm-btn-outline"
            style={{ textDecoration: "none" }}
            onClick={() => trackEvent("partnership_cta_click", { cta: "next-steps-sandbox" })}
          >
            <Icon name="key-round" size={16} />
            {L({ en: "Request technical sandbox", da: "Anmod om teknisk sandbox" }, lang)}
          </a>
          <a
            href="/assets/happy-mates-claude-partnership-summary.pdf"
            download
            className="hm-btn hm-btn-outline"
            style={{ textDecoration: "none" }}
            onClick={() => trackEvent("partnership_cta_click", { cta: "next-steps-pdf" })}
          >
            <Icon name="file-down" size={16} />
            {L({ en: "Download one-page summary (PDF)", da: "Download énsidet resumé (PDF)" }, lang)}
          </a>
        </div>

        {/* Inline form */}
        <div style={{
          background: "var(--hm-background)", border: "1px solid var(--hm-border)",
          borderRadius: 16, padding: "28px 28px 24px",
        }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>
              {L({ en: "Or fill in your details here", da: "Eller udfyld dine oplysninger her" }, lang)}
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--hm-muted-foreground)" }}>
              {L({
                en: "We'll set up a 30-min discovery call and send an NDA within 5 business days.",
                da: "Vi aftaler et 30-min. opdagelsesopkald og sender en NDA inden for 5 arbejdsdage.",
              }, lang)}
            </p>
          </div>
          <PartnershipForm lang={lang} />
        </div>
      </div>

    </section>
  );
}
