/* hp-shared.jsx — shared building blocks for the Vorker homepage directions.
   Exports: Ico, Wordmark, Nav, NavPill, SearchBar, Suggestions, TaskCards,
   Logos, useTypewriter.  All to window. */

const { useState, useEffect, useRef } = React;

/* ---------- icon set ---------- */
function Ico({ n, cls, s = 18 }) {
  const c = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", className: cls };
  const p = {
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>,
    doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
    share: <><circle cx="6" cy="12" r="2.4" /><circle cx="17" cy="6" r="2.4" /><circle cx="17" cy="18" r="2.4" /><path d="M8.2 11l6.6-3.6M8.2 13l6.6 3.6" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    calendar: <><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /></>,
    users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 4.2a3.2 3.2 0 0 1 0 6.1M21 20c0-2.6-1.5-4.5-3.6-5.2" /></>,
    sparkle: <><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" /></>,
    bolt: <><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></>,
    paperclip: <><path d="M21 11l-8.5 8.5a5 5 0 0 1-7-7L14 4a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.6 1.6 0 0 1-2.3-2.3l7.8-7.8" /></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
    arrowUp: <><path d="M12 19V5M5 12l7-7 7 7" /></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    play: <><path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none" /></>,
    flag: <><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></>,
    pen: <><path d="M4 20l4-1L19 8a2 2 0 0 0-3-3L5 16z" /><path d="M14 6l3 3" /></>,
    check: <><path d="M4 12l5 5L20 6" /></>,
  };
  return <svg {...c}>{p[n]}</svg>;
}

/* ---------- wordmark ---------- */
// Handwritten brush mark (wordmark_1.svg) inlined + recolored: navy letters
// with the signature standalone pink period. Geometric mark (wordmark_2/1) is
// a plain <img>.
function HandWordmark({ h = 26, ink = "#1A1A40", pink = "#FF5C9E" }) {
  const ref = useRef(null);
  useEffect(() => {
    let alive = true;
    fetch("assets/wordmark_1.svg").then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector("svg");
      if (!svg) return;
      svg.style.height = h + "px"; svg.style.width = "auto"; svg.style.display = "block";
      const paths = Array.from(svg.querySelectorAll("path"));
      paths.forEach((p) => p.setAttribute("fill", ink));
      // the period is the smallest, right-most isolated glyph
      let period = null, best = Infinity, bestX = -Infinity;
      paths.forEach((p) => {
        let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const ar = b.width / b.height;
        if (ar > 0.55 && ar < 1.8 && b.x > bestX) { bestX = b.x; period = p; best = b.width * b.height; }
      });
      if (period) period.setAttribute("fill", pink);
    }).catch(() => {});
    return () => { alive = false; };
  }, [h, ink, pink]);
  return <span ref={ref} style={{ display: "block", height: h }} />;
}

function Wordmark({ dark, hand, h = 26 }) {
  if (hand) return <HandWordmark h={h} ink={dark ? "#ffffff" : "#1A1A40"} />;
  return <img src={dark ? "assets/wordmark_1.svg" : "assets/wordmark_2.svg"} alt="Vorker" style={{ height: h, display: "block" }} />;
}

/* ---------- typewriter ---------- */
function useTypewriter(phrases, { type = 46, hold = 1700, erase = 26 } = {}) {
  const [txt, setTxt] = useState("");
  const i = useRef(0); const ch = useRef(0); const mode = useRef("type");
  useEffect(() => {
    let t;
    const tick = () => {
      const cur = phrases[i.current % phrases.length];
      if (mode.current === "type") {
        ch.current++;
        setTxt(cur.slice(0, ch.current));
        if (ch.current >= cur.length) { mode.current = "hold"; t = setTimeout(tick, hold); return; }
        t = setTimeout(tick, type);
      } else if (mode.current === "hold") {
        mode.current = "erase"; t = setTimeout(tick, erase);
      } else {
        ch.current--;
        setTxt(cur.slice(0, Math.max(0, ch.current)));
        if (ch.current <= 0) { mode.current = "type"; i.current++; t = setTimeout(tick, 280); return; }
        t = setTimeout(tick, erase);
      }
    };
    t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);
  return txt;
}

/* ---------- nav ---------- */
const NAV_LINKS = ["Product", "How it works", "Pricing", "Company"];
function Nav({ dark, hand, links = NAV_LINKS, cta = "Get started", style }) {
  return (
    <nav className={"hp-nav" + (dark ? " on-dark" : "")} style={style}>
      <Wordmark dark={dark} hand={hand} h={26} />
      <div className="links">{links.map((l) => <a key={l} href="#">{l}</a>)}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <a href="#" className="signin">Sign in</a>
        <button className="btn btn-pink btn-sm">{cta}</button>
      </div>
    </nav>
  );
}
function NavPill({ hand, links = NAV_LINKS, cta = "Get started", style }) {
  return (
    <nav className="hp-navpill" style={style}>
      <div style={{ display: "flex", alignItems: "center", gap: 38 }}>
        <Wordmark hand={hand} h={24} />
        <div className="links" style={{ display: "flex", gap: 28 }}>{links.map((l) => <a key={l} href="#" style={{ fontSize: 15, fontWeight: 500, textDecoration: "none", color: "var(--ink-2)" }}>{l}</a>)}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a href="#" style={{ fontSize: 15, fontWeight: 600, textDecoration: "none", color: "var(--ink)" }}>Sign in</a>
        <button className="btn btn-pink btn-sm">{cta}</button>
      </div>
    </nav>
  );
}

/* ---------- search bar (showpiece) ---------- */
function SearchBar({ dark, phrases, showMic, style }) {
  const typed = useTypewriter(phrases);
  return (
    <div className={"sbar" + (dark ? " dark" : "")} style={style}>
      <div className="pin">V</div>
      <div className="field"><span className="ph">{typed}</span><span className="cur" /></div>
      <div className="tools">
        <button className="icbtn" aria-label="attach"><Ico n="paperclip" s={20} /></button>
        {showMic && <button className="icbtn" aria-label="voice"><Ico n="mic" s={20} /></button>}
        <button className="send" aria-label="send"><Ico n="arrowUp" s={21} /></button>
      </div>
    </div>
  );
}

/* ---------- suggestion chips ---------- */
function Suggestions({ items, dark, style }) {
  return (
    <div className={"sugg" + (dark ? " on-dark" : "")} style={style}>
      {items.map((c) => <div className="chip" key={c.t}><Ico n={c.i} cls="ci" />{c.t}</div>)}
    </div>
  );
}

/* ---------- task cards (reference 'try one of these') ---------- */
function TaskCards({ items }) {
  return (
    <div className="taskgrid">
      {items.map((c) => (
        <div className="taskcard" key={c.q}>
          <div className="ic" style={{ background: c.bg, color: c.fg }}><Ico n={c.i} s={20} /></div>
          <p className="q">{c.q}</p>
          <div className="cat"><span>{c.cat}</span><span className="go"><Ico n="arrowRight" s={13} /></span></div>
        </div>
      ))}
    </div>
  );
}

/* ---------- integration strip ---------- */
function Logos({ items, dark, style }) {
  return (
    <div className={"logos" + (dark ? " on-dark" : "")} style={style}>
      {items.map((l) => <span className="wm" key={l}>{l}</span>)}
    </div>
  );
}

Object.assign(window, { Ico, Wordmark, HandWordmark, Nav, NavPill, SearchBar, Suggestions, TaskCards, Logos, useTypewriter });
