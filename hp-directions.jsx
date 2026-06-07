/* hp-directions.jsx — four full homepage directions for Vorker.
   Each: scene hero + signature search bar + 1–2 more sections.
   Distinct background, typography direction, and UI treatment.
   Exports PageSummit, PageSkyline, PageExpress, PageRidge to window. */

const SUGG_GENERIC = [
  { t: "Find new customers near me", i: "search" },
  { t: "Summarize last quarter", i: "chart" },
  { t: "Post our weekly update", i: "share" },
  { t: "Draft an industry report", i: "doc" },
];

const TASKS = [
  { q: "Find new customers near me and draft intros", cat: "Sales", i: "search", bg: "#fdeaf4", fg: "#FF5C9E" },
  { q: "Summarize last quarter's numbers", cat: "Finance", i: "chart", bg: "#eae6fb", fg: "#7c5cf0" },
  { q: "Post this week's update on LinkedIn", cat: "Marketing", i: "share", bg: "#e6f0ff", fg: "#4f86f7" },
  { q: "Reply to the overnight support emails", cat: "Support", i: "mail", bg: "#e6f6ec", fg: "#2faa63" },
];

const INTEGRATIONS = ["Gmail", "Slack", "Notion", "QuickBooks", "Stripe", "HubSpot"];

const SKILLS = ["Invoices & billing", "Follow-up emails", "Scheduling", "Social posts", "Lead research", "Weekly reports", "Customer support", "Data entry"];

function IntegrationStrip({ dark }) {
  return (
    <section style={{ padding: "0 60px 84px" }}>
      <div style={{ borderTop: dark ? "1px solid rgba(255,255,255,.14)" : "1px solid var(--line)", paddingTop: 40, display: "flex", alignItems: "center", gap: 56 }}>
        <span className="hp-mono" style={{ fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ink-3)", whiteSpace: "nowrap" }}>Works where<br />you already work</span>
        <Logos items={INTEGRATIONS} dark={dark} />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   A — SUMMIT · hike sunset · Sora · calm & aspirational
   ════════════════════════════════════════════════════════════════ */
function PageSummit() {
  return (
    <div className="hp">
      <section className="hp-scene" style={{ height: 772 }}>
        <img className="bg" src="assets/world_hike.png" alt="Vorker reaching the summit" style={{ objectPosition: "80% 44%" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(96deg, rgba(255,248,244,.93) 0%, rgba(255,248,244,.52) 26%, rgba(255,248,244,.1) 44%, transparent 54%)" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(180deg, transparent 80%, var(--cream) 100%)" }} />
        <div className="hp-z" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "30px 60px 0" }}><Nav hand /></div>
          <div style={{ flex: 1, padding: "0 60px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 720 }}>
            <div className="eyebrow-line"><span className="ln" />The AI coworker</div>
            <h1 className="disp-jk" style={{ fontSize: 66, color: "var(--ink)", margin: "22px 0 0", maxWidth: 600 }}>
              Run your business with <span className="acc">words.</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 430, margin: "26px 0 0", fontWeight: 400 }}>
              Tell Vorker what you need. It turns a sentence into done — across the tools you already use.
            </p>
          </div>
        </div>
      </section>

      <div style={{ padding: "0 60px", marginTop: -52, position: "relative", zIndex: 5 }}>
        <div style={{ maxWidth: 720 }}>
          <SearchBar phrases={["Plan my week and block focus time", "Find 20 leads near me and draft intros", "Turn these notes into a client proposal"]} showMic />
          <div style={{ marginTop: 22 }}><Suggestions items={SUGG_GENERIC.slice(0, 3)} /></div>
        </div>
      </div>

      <section style={{ padding: "120px 60px 96px" }}>
        <div className="sec-eyebrow">How it works</div>
        <h2 className="disp-jk" style={{ fontSize: 44, margin: "16px 0 56px", maxWidth: 620, color: "var(--ink)" }}>
          One sentence in. The work comes out <span className="acc">done.</span>
        </h2>
        <div className="steprow">
          {[
            { n: "01", t: "Ask in plain words", d: "Type what you need, the way you'd tell a teammate. No menus, no setup." },
            { n: "02", t: "Vorker takes action", d: "It works across your email, docs and tools — gathering, drafting, sending." },
            { n: "03", t: "You review & ship", d: "See exactly what it did, tweak anything, and approve in a click." },
          ].map((s) => (
            <div className="step" key={s.n}>
              <div className="num">{s.n}</div>
              <div className="divider" />
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <IntegrationStrip />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   B — SKYLINE · rainbow · Bricolage · bright & playful
   ════════════════════════════════════════════════════════════════ */
function PageSkyline() {
  const bento = [
    { t: "Inbox, handled", d: "Triage, reply and follow up — your inbox at zero by lunch.", i: "mail", bg: "#fdeaf4", fg: "#FF5C9E", col: "span 2" },
    { t: "Always on time", d: "Schedules, reminders and recaps that just happen.", i: "calendar", bg: "#e6f0ff", fg: "#4f86f7", col: "span 1" },
    { t: "Find the leads", d: "Research prospects and draft the first hello.", i: "search", bg: "#e6f6ec", fg: "#2faa63", col: "span 1" },
    { t: "Posts that ship", d: "Social, newsletters and updates — written in your voice.", i: "share", bg: "#f3eafd", fg: "#7c5cf0", col: "span 2" },
  ];
  return (
    <div className="hp">
      <section className="hp-scene" style={{ height: 772 }}>
        <img className="bg" src="assets/world_rainbow.png" alt="Vorker moving work forward" style={{ objectPosition: "76% 20%" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(100deg, rgba(247,250,255,.62) 0%, rgba(247,250,255,.2) 26%, transparent 44%)" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(180deg, transparent 80%, var(--cream) 100%)" }} />
        <div className="hp-z" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "26px 40px 0" }}><NavPill /></div>
          <div style={{ flex: 1, padding: "64px 60px 0", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 720 }}>
            <h1 className="disp-jk" style={{ fontSize: 64, color: "var(--ink)", margin: 0, lineHeight: 1.04 }}>
              Less busywork.<br />More <span className="acc">business.</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 420, margin: "28px 0 38px", fontWeight: 500 }}>
              Vorker is the AI coworker that runs the day-to-day, so you can do the part only you can.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-pink">Try Vorker free <span className="arr">→</span></button>
              <button className="btn btn-ghost"><Ico n="play" s={15} /> See how it works</button>
            </div>
          </div>
        </div>
      </section>

      <div style={{ padding: "0 60px", marginTop: -46, position: "relative", zIndex: 5 }}>
        <SearchBar phrases={["Email last month's invoices to my accountant", "Write a launch post for our new service", "Build a list of 30 cafés to pitch this week"]} />
        <div style={{ marginTop: 18 }}>
          <Suggestions items={[
            { t: "Sales", i: "search" }, { t: "Marketing", i: "share" }, { t: "Operations", i: "calendar" }, { t: "Research", i: "doc" }, { t: "Support", i: "mail" },
          ]} />
        </div>
      </div>

      <section style={{ padding: "104px 60px 96px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--pink)", marginBottom: 14 }}><span className="dot" />Everything off your plate</div>
            <h2 className="disp-jk" style={{ fontSize: 46, margin: 0, color: "var(--ink)" }}>A whole team's worth of <span className="acc">done.</span></h2>
          </div>
          <button className="btn btn-ink btn-sm">See all skills <span className="arr">→</span></button>
        </div>
        <div className="bento" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {bento.map((b) => (
            <div className="bcard" key={b.t} style={{ gridColumn: b.col, background: b.bg }}>
              <div className="bic" style={{ background: "#fff", color: b.fg, boxShadow: "0 8px 18px -8px rgba(26,26,64,.25)" }}><Ico n={b.i} s={22} /></div>
              <h3 style={{ color: "var(--ink)" }}>{b.t}</h3>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   C — EXPRESS · delivery cart · Space Grotesk · efficient (reference layout)
   ════════════════════════════════════════════════════════════════ */
function PageExpress() {
  return (
    <div className="hp">
      <section className="hp-scene" style={{ height: 700 }}>
        <img className="bg" src="assets/world_delivery.png" alt="Vorker delivering finished work" style={{ objectPosition: "74% 46%" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(98deg, rgba(244,242,252,.8) 0%, rgba(244,242,252,.34) 26%, transparent 46%)" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(180deg, transparent 80%, var(--cream) 100%)" }} />
        <div className="hp-z" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "30px 60px 0" }}><Nav hand /></div>
          <div style={{ flex: 1, padding: "0 60px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 660 }}>
            <div className="eyebrow-mono" style={{ color: "var(--pink)" }}>● Your AI coworker</div>
            <h1 className="disp-jk" style={{ fontSize: 66, color: "var(--ink)", margin: "18px 0 0", maxWidth: 540, lineHeight: 1.04 }}>
              Hand it off.<br />Consider it <span className="acc">done.</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 420, margin: "26px 0 0", fontWeight: 400 }}>
              Vorker picks up the day-to-day busywork and delivers it back finished.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 60px 96px" }}>
        <div style={{ marginTop: -44, position: "relative", zIndex: 5 }}>
          <SearchBar phrases={["Plan tomorrow and send the team a recap", "Chase the three overdue invoices", "Draft this week's customer update"]} showMic />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "44px 0 18px" }}>
          <span className="sec-eyebrow" style={{ color: "var(--ink-3)" }}>Try one of these</span>
          <span className="hp-mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>↵ to send · ⌘K for commands</span>
        </div>
        <TaskCards items={TASKS} />
      </section>

      <IntegrationStrip />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   D — RIDGE · mountain (alt render) · Unbounded · bold & rounded
   ════════════════════════════════════════════════════════════════ */
function PageRidge() {
  return (
    <div className="hp">
      <section className="hp-scene" style={{ height: 740 }}>
        <img className="bg" src="assets/opt_hike_a.png" alt="Vorker climbing toward the summit" style={{ objectPosition: "78% 42%" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(96deg, rgba(252,246,248,.92) 0%, rgba(252,246,248,.5) 26%, rgba(252,246,248,.08) 44%, transparent 54%)" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(180deg, transparent 80%, var(--cream) 100%)" }} />
        <div className="hp-z" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "30px 60px 0" }}><Nav /></div>
          <div style={{ flex: 1, padding: "0 60px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 680 }}>
            <div className="eyebrow" style={{ color: "var(--pink)", marginBottom: 22 }}><span className="dot" />Your AI coworker</div>
            <h1 className="disp-jk" style={{ fontSize: 62, color: "var(--ink)", margin: 0, maxWidth: 560 }}>
              Do more of what <span className="acc">matters.</span>
            </h1>
            <p style={{ fontSize: 19.5, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 420, margin: "26px 0 0", fontWeight: 400 }}>
              Vorker handles the rest — quietly, in the background, across the tools you already use.
            </p>
          </div>
        </div>
      </section>

      <div style={{ padding: "0 60px", marginTop: -48, position: "relative", zIndex: 5 }}>
        <div style={{ maxWidth: 760 }}>
          <SearchBar phrases={["Draft and send this month's client update", "Reconcile last week's expenses", "Find 15 partners to reach out to"]} showMic />
        </div>
      </div>

      <section style={{ padding: "112px 60px 100px" }}>
        <div style={{ maxWidth: 760 }}>
          <div className="sec-eyebrow">One coworker</div>
          <h2 className="disp-jk" style={{ fontSize: 44, margin: "18px 0 0", color: "var(--ink)" }}>
            Every task you'd rather <span className="acc">not do.</span>
          </h2>
        </div>
        <div className="sugg" style={{ marginTop: 40, gap: 14 }}>
          {SKILLS.map((s) => (
            <div className="chip" key={s} style={{ fontSize: 17, padding: "14px 22px", borderRadius: 14 }}>
              <Ico n="check" cls="ci" s={18} />{s}
            </div>
          ))}
        </div>
      </section>

      <IntegrationStrip />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   A — REFINED · shared lower body (how-it-works + integrations)
   ════════════════════════════════════════════════════════════════ */
const SUMMIT_PHRASES = [
  "Plan my week and block focus time",
  "Find 20 leads near me and draft intros",
  "Turn these notes into a client proposal",
];

function SummitBody() {
  const items = [
    { n: "01", t: "Plugs into the tools you already use", d: "Gmail, Slack, your docs and invoices — Vorker works where you already work. Nothing to migrate, nothing new to learn." },
    { n: "02", t: "Learns how your business works", d: "It picks up your clients, your tone and your routines — and gets sharper the more you work together." },
    { n: "03", t: "Handles the repetitive day-to-day", d: "The operational busywork that quietly eats your week, taken off your plate and done." },
  ];
  return (
    <section style={{ padding: "120px 60px 110px" }}>
      <div className="sec-eyebrow">What Vorker does</div>
      <h2 className="disp-jk" style={{ fontSize: 46, margin: "16px 0 62px", maxWidth: 740, color: "var(--ink)" }}>
        Built to feel less like software. More like <span className="acc">support.</span>
      </h2>
      <div className="steprow">
        {items.map((s) => (
          <div className="step" key={s.n}>
            <div className="num">{s.n}</div>
            <div className="divider" />
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* A1 — reframe: type held in a tighter left column, background unchanged */
function PageSummitOpt1() {
  return (
    <div className="hp refined">
      <section className="hp-scene" style={{ height: 772 }}>
        <img className="bg" src="assets/world_hike.png" alt="Vorker reaching the summit" style={{ objectPosition: "80% 44%" }} />
        {/* stronger left white wash so type stays legible over any sky */}
        <div className="hp-scrim" style={{ background: "linear-gradient(96deg, rgba(255,248,244,.98) 0%, rgba(255,248,244,.78) 24%, rgba(255,248,244,.32) 42%, transparent 56%)" }} />
        {/* top wash lifts the nav (Sign in) over darker areas */}
        <div className="hp-scrim" style={{ background: "linear-gradient(180deg, rgba(255,248,244,.72) 0%, transparent 17%)" }} />
        <div className="hp-scrim" style={{ background: "linear-gradient(180deg, transparent 80%, var(--cream) 100%)" }} />
        <div className="hp-z" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "30px 60px 0" }}><Nav hand /></div>
          <div style={{ flex: 1, padding: "0 60px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 560 }}>
            <div className="eyebrow-line"><span className="ln" />Supercharged for business</div>
            <h1 className="disp-jk" style={{ fontSize: 58, color: "var(--ink)", margin: "22px 0 0", maxWidth: 510 }}>
              Meet your coworker who never <span className="acc">clocks out.</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 420, margin: "26px 0 0", fontWeight: 400 }}>
              Tell Vorker what you need, the way you'd tell a teammate. It turns a sentence into done — across the tools you already use.
            </p>
          </div>
        </div>
      </section>

      <div style={{ padding: "0 60px", marginTop: -52, position: "relative", zIndex: 5 }}>
        <SearchBar phrases={SUMMIT_PHRASES} showMic />
        <div style={{ marginTop: 22 }}><Suggestions items={SUGG_GENERIC} /></div>
      </div>

      <SummitBody />
    </div>
  );
}

/* A2 — zoom & shift: character pushed to the right edge, more open sky for type */
function PageSummitOpt2_removed() {
  return null;
}

Object.assign(window, { PageSummit, PageSkyline, PageExpress, PageRidge, PageSummitOpt1 });
