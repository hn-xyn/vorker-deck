// animation.jsx — "Animation" section (slides 26–29).
// How to bring Vorker to life with image-to-video tools. Honest, tentative
// framing — starting recommendations from limited hands-on exploration, not a
// verdict. Same white-gallery system as the rest of the deck; cartoon frames
// sit on pure white so they blend. Chrome pink #E6388F; soft pink #FDACEC is
// the section's signature accent (motion glow + arrows).

const AN_W = 1920, AN_H = 1080;
const AN_PINK = '#E6388F', AN_SOFT = '#FDACEC', AN_LILAC = '#B7A6E8';
const AN_NAVY = '#1A1A40', AN_SLATE = '#6A6C92', AN_INK = '#3A3A55', AN_PAPER = '#FFFFFF';
const AN_MARGIN = 150;
const AN_BASE = 880; // shared ground line for standing figures
const AN_SANS = "'Plus Jakarta Sans', sans-serif";
const AN_DISP = "'Bricolage Grotesque', sans-serif";
const AN_CARDSHADOW = '0 26px 70px -34px rgba(26,26,64,0.30), 0 5px 16px -10px rgba(26,26,64,0.10)';
const AN_FRAMESHADOW = '0 22px 56px -30px rgba(26,26,64,0.34), 0 4px 12px -8px rgba(26,26,64,0.10)';

/* ── shared chrome ─────────────────────────────────────────────────────── */
function AnWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', AN_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', AN_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function AnEyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: AN_PINK }} />
      <span style={{ fontFamily: AN_SANS, fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: AN_PINK, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function AnFooter({ page }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: AN_MARGIN, bottom: 60 }}><AnWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: AN_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: AN_SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: AN_SLATE }}>
        <span>Animation</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: AN_PINK }} /><span style={{ color: AN_NAVY }}>{page}</span>
      </div>
    </React.Fragment>
  );
}

function AnSlide({ page, children }) {
  return (
    <div style={{ position: 'relative', width: AN_W, height: AN_H, overflow: 'hidden', background: AN_PAPER, fontFamily: AN_SANS }}>
      {children}
      <AnFooter page={page} />
    </div>
  );
}

/* tentative-status pill */
function AnExploreTag({ children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#FCEAF4', borderRadius: 999, padding: '8px 16px 8px 12px' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: AN_PINK }} />
      <span style={{ fontFamily: AN_SANS, fontSize: 13.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C32C76', whiteSpace: 'nowrap' }}>{children}</span>
    </span>
  );
}

/* small label: dot + uppercase */
function AnTinyLabel({ children, color = AN_SLATE }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
      <span style={{ fontFamily: AN_SANS, fontSize: 13.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

/* left-bar callout (matches deck's takeaway pattern) */
function AnCallout({ label, children, max = 1320 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
      <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: AN_PINK, flexShrink: 0 }} />
      <div>
        <div style={{ fontFamily: AN_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: AN_PINK, marginBottom: 8 }}>{label}</div>
        <p style={{ margin: 0, fontFamily: AN_DISP, fontWeight: 400, fontSize: 21, lineHeight: 1.42, color: AN_NAVY, maxWidth: max, textWrap: 'pretty' }}>{children}</p>
      </div>
    </div>
  );
}

/* ── start/end frame primitives ────────────────────────────────────────── */
function AnFrame({ src, size, glow }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {glow && <div style={{ position: 'absolute', left: '50%', top: '54%', width: size * 0.92, height: size * 0.92, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,172,236,0.42) 0%, rgba(253,172,236,0) 70%)' }} />}
      <div style={{ position: 'relative', width: size, height: size, borderRadius: 24, background: '#fff', border: '1px solid rgba(26,26,64,0.07)', boxShadow: AN_FRAMESHADOW, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={src} alt="" style={{ width: '90%', height: '90%', objectFit: 'contain', display: 'block' }} />
      </div>
    </div>
  );
}

function AnStartEndLabel({ kind }) {
  const isEnd = kind === 'END';
  const color = isEnd ? AN_PINK : AN_SLATE;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
      <span style={{ fontFamily: AN_SANS, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color }}>{kind}</span>
    </div>
  );
}

function AnArrow() {
  return (
    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#FCEAF4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 0 8px rgba(253,172,236,0.16)' }}>
      <span style={{ color: AN_PINK, fontSize: 26, fontWeight: 700, lineHeight: 1, marginTop: -2 }}>&rarr;</span>
    </div>
  );
}

function AnPair({ title, sub, startSrc, endSrc, size }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 26 }}>
        <div style={{ fontFamily: AN_DISP, fontWeight: 500, fontSize: 26, color: AN_NAVY, letterSpacing: '-0.012em' }}>{title}</div>
        <div style={{ fontFamily: AN_SANS, fontSize: 15.5, color: AN_SLATE, marginTop: 5 }}>{sub}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnFrame src={startSrc} size={size} />
          <AnStartEndLabel kind="START" />
        </div>
        <AnArrow />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnFrame src={endSrc} size={size} glow />
          <AnStartEndLabel kind="END" />
        </div>
      </div>
    </div>
  );
}

/* ── 26 · Section opener ───────────────────────────────────────────────── */
function AnimOpener() {
  return (
    <AnSlide page="29">
      <div style={{ position: 'absolute', left: AN_MARGIN, top: 212, width: 720 }}>
        <AnEyebrow>Animation</AnEyebrow>
        <h1 style={{ margin: '26px 0 0', fontFamily: AN_DISP, fontWeight: 500, fontSize: 66, lineHeight: 1.0, letterSpacing: '-0.03em', color: AN_NAVY }}>Bringing Vorker<br />to life.</h1>
        <div style={{ marginTop: 24 }}><AnExploreTag>Cartoon style · the natural fit</AnExploreTag></div>

        <p style={{ margin: '36px 0 0', fontFamily: AN_SANS, fontSize: 20, lineHeight: 1.55, color: AN_INK, textWrap: 'pretty', maxWidth: 600 }}>
          Cartoon Vorker is the natural style for small animations &mdash; and across both tools we tried, one technique stood out above the rest.
        </p>
        <p style={{ margin: '20px 0 0', fontFamily: AN_DISP, fontWeight: 400, fontSize: 25, lineHeight: 1.4, color: AN_NAVY, textWrap: 'pretty', maxWidth: 600 }}>
          Define a <span style={{ color: AN_PINK }}>start frame</span> and an <span style={{ color: AN_PINK }}>end frame</span>, then let the tool animate the space between.
        </p>
        <p style={{ margin: '30px 0 0', fontFamily: AN_SANS, fontSize: 15.5, lineHeight: 1.5, color: AN_SLATE, textWrap: 'pretty', maxWidth: 560 }}>
          Tentative starting recommendations from limited hands-on exploration &mdash; a head start, not the final word.
        </p>
      </div>

      {/* hero — the celebration jump, alive */}
      <div style={{ position: 'absolute', left: 1430, top: 540, transform: 'translate(-50%,-50%)', width: 720, height: 720 }}>
        <div style={{ position: 'absolute', left: '50%', top: '52%', width: 600, height: 600, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,172,236,0.5) 0%, rgba(253,172,236,0.16) 45%, rgba(253,172,236,0) 70%)' }} />
        <img src="assets/anim_celebrate_end_cut.png" alt="" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', height: 700, width: 'auto', display: 'block' }} />
      </div>
    </AnSlide>
  );
}

/* ── 27 · The start/end frame technique ────────────────────────────────── */
function AnimTechnique() {
  return (
    <AnSlide page="30">
      <div style={{ position: 'absolute', left: AN_MARGIN, top: 96 }}><AnEyebrow>The core method</AnEyebrow></div>
      <h1 style={{ position: 'absolute', left: AN_MARGIN, top: 134, width: 660, margin: 0, fontFamily: AN_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: AN_NAVY }}>Two frames, and the space between.</h1>
      <p style={{ position: 'absolute', left: 900, top: 150, width: 740, margin: 0, fontFamily: AN_SANS, fontSize: 18, lineHeight: 1.55, color: AN_SLATE, textWrap: 'pretty' }}>
        Generate a start and an end frame in ChatGPT, then hand both to the tool. The same discipline as image prompting applies &mdash; keep everything identical and change only what should move.
      </p>

      {/* the two example pairs */}
      <div style={{ position: 'absolute', left: AN_MARGIN, right: AN_MARGIN, top: 322, display: 'flex', justifyContent: 'center', gap: 132 }}>
        <AnPair title="Idea" sub="Calm at the desk → eureka moment" startSrc="assets/anim_idea_start.png" endSrc="assets/anim_idea_end.png" size={300} />
        <AnPair title="Celebration" sub="Ready crouch → joyful jump" startSrc="assets/anim_celebrate_start.png" endSrc="assets/anim_celebrate_end.png" size={300} />
      </div>

      <div style={{ position: 'absolute', left: AN_MARGIN, right: AN_MARGIN, bottom: 118 }}>
        <AnCallout label="The discipline + a tip">
          Keep the character, composition and framing identical between frames &mdash; change only the pose and expression. And choose frames that imply motion (a crouch before a jump, a calm face before a reaction), so the in-between has somewhere to go.
        </AnCallout>
      </div>
    </AnSlide>
  );
}

/* ── 28 · The two tools ────────────────────────────────────────────────── */
function AnPoint({ children, kind }) {
  const color = kind === 'plus' ? AN_PINK : AN_SLATE;
  return (
    <li style={{ display: 'grid', gridTemplateColumns: '18px 1fr', columnGap: 12, alignItems: 'start' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, marginTop: 9 }} />
      <span style={{ fontFamily: AN_SANS, fontSize: 16.5, lineHeight: 1.45, color: AN_INK, textWrap: 'pretty' }}>{children}</span>
    </li>
  );
}

function AnToolCard({ mono, monoBg, monoColor, name, role, bestFor, strengths, limits }) {
  return (
    <div style={{ flex: 1, borderRadius: 26, background: '#FFFFFF', border: '1px solid rgba(26,26,64,0.07)', boxShadow: AN_CARDSHADOW, padding: '36px 40px 38px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 58, height: 58, borderRadius: 16, background: monoBg, color: monoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: AN_DISP, fontWeight: 600, fontSize: 28, flexShrink: 0 }}>{mono}</div>
        <div>
          <div style={{ fontFamily: AN_DISP, fontWeight: 500, fontSize: 30, color: AN_NAVY, lineHeight: 1.05, letterSpacing: '-0.018em' }}>{name}</div>
          <div style={{ fontFamily: AN_SANS, fontSize: 16, color: AN_SLATE, marginTop: 4 }}>{role}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '26px 0 6px' }}>
        {bestFor.map((b) => (
          <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F6F3FC', border: '1px solid rgba(26,26,64,0.06)', borderRadius: 999, padding: '9px 15px', fontFamily: AN_SANS, fontSize: 15, fontWeight: 600, color: AN_NAVY, whiteSpace: 'nowrap' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: AN_LILAC }} />{b}
          </span>
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(26,26,64,0.08)', margin: '24px 0 26px' }} />

      <div style={{ fontFamily: AN_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: AN_PINK, marginBottom: 14 }}>Strengths</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
        {strengths.map((s, i) => <AnPoint key={i} kind="plus">{s}</AnPoint>)}
      </ul>

      <div style={{ fontFamily: AN_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: AN_SLATE, margin: '26px 0 14px' }}>Where it falls short</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
        {limits.map((s, i) => <AnPoint key={i} kind="minus">{s}</AnPoint>)}
      </ul>
    </div>
  );
}

function AnimTools() {
  return (
    <AnSlide page="31">
      <div style={{ position: 'absolute', left: AN_MARGIN, top: 90 }}><AnEyebrow>Choosing a tool</AnEyebrow></div>
      <h1 style={{ position: 'absolute', left: AN_MARGIN, top: 128, margin: 0, fontFamily: AN_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: AN_NAVY }}>Two tools, two jobs.</h1>
      <p style={{ position: 'absolute', left: 820, top: 144, width: 800, margin: 0, fontFamily: AN_SANS, fontSize: 18, lineHeight: 1.55, color: AN_SLATE, textWrap: 'pretty' }}>
        Both turn start/end frames into motion. What differs is control vs. ease &mdash; here&rsquo;s a rough sense of when to reach for each.
      </p>

      <div style={{ position: 'absolute', left: AN_MARGIN, right: AN_MARGIN, top: 264, display: 'flex', gap: 40 }}>
        <AnToolCard mono="M" monoBg="#F1ECFB" monoColor="#4B3A9E" name="Midjourney" role="Quick, general social clips"
          bestFor={['Instagram ads', 'X / Twitter posts', 'Short-form']}
          strengths={['Nicer, more intuitive interface to work in.', 'Solid for general short-form clips where you don\u2019t need exact control.']}
          limits={['Limited precision \u2014 ask for 2s and it pads to ~5s with invented motion.', 'Not ideal for tight product-UI micro-animations.']} />
        <AnToolCard mono="K" monoBg="#FCEAF4" monoColor="#C32C76" name="Kling" role="When you need motion control"
          bestFor={['Specific motion', 'Start / end workflow', 'More directed clips']}
          strengths={['More granular control over the motion when you need specifics.', 'Built around the start \u2192 end frame workflow.']}
          limits={['Clunkier, less intuitive interface.', 'Still imperfect \u2014 you can\u2019t dial in everything.']} />
      </div>

      <div style={{ position: 'absolute', left: AN_MARGIN, right: AN_MARGIN, bottom: 116 }}>
        <AnCallout label="Bottom line">
          Reach for <span style={{ color: AN_PINK }}>Midjourney</span> for quick, general social clips, and <span style={{ color: AN_PINK }}>Kling</span> when you need more control over the motion. Neither is ideal yet for precise product-UI animation.
        </AnCallout>
      </div>
    </AnSlide>
  );
}

/* ── 29 · What's unresolved ─────────────────────────────────────────────── */
function AnNotePoint({ label, color, children }) {
  return (
    <div>
      <div style={{ fontFamily: AN_SANS, fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color, marginBottom: 7 }}>{label}</div>
      <p style={{ margin: 0, fontFamily: AN_SANS, fontSize: 17.5, lineHeight: 1.5, color: AN_INK, textWrap: 'pretty' }}>{children}</p>
    </div>
  );
}

function AnimStatus() {
  const figH = 600, figAR = 318 / 381, figW = figH * figAR;
  return (
    <AnSlide page="32">
      <div style={{ position: 'absolute', left: AN_MARGIN, top: 168, width: 720 }}>
        <AnEyebrow>Where this stands</AnEyebrow>
        <h1 style={{ margin: '24px 0 0', fontFamily: AN_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.04, letterSpacing: '-0.025em', color: AN_NAVY }}>A snapshot, not a verdict.</h1>
        <p style={{ margin: '26px 0 0', fontFamily: AN_SANS, fontSize: 18.5, lineHeight: 1.55, color: AN_SLATE, textWrap: 'pretty' }}>
          This is an early read from limited hands-on testing. The tools are moving fast, so treat it as a moment in time &mdash; the point is to give the team a head start, not the final word.
        </p>

        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <AnNotePoint label="What's here" color={AN_PINK}>
            A technique that works today &mdash; start and end frames &mdash; and a rough sense of when to reach for each tool.
          </AnNotePoint>
          <AnNotePoint label="What's still open" color={AN_SLATE}>
            How far the precision can be pushed, and how each tool changes from here. Plenty left to explore.
          </AnNotePoint>
        </div>

        <div style={{ marginTop: 28, paddingLeft: 20, borderLeft: `2px solid ${AN_PINK}` }}>
          <p style={{ margin: 0, fontFamily: AN_SANS, fontSize: 17.5, lineHeight: 1.5, color: AN_NAVY, textWrap: 'pretty' }}>
            <span style={{ fontWeight: 600 }}>Treat these as starting points.</span> Keep experimenting, re-test as the tools evolve, and push the animations further than we have.
          </p>
        </div>
      </div>

      {/* calm thinking figure */}
      <div style={{ position: 'absolute', top: AN_BASE - figH, left: 1420, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <div style={{ position: 'relative', width: figW, height: figH }}>
          <div style={{ position: 'absolute', left: '50%', top: '46%', width: figH * 0.86, height: figH * 0.86, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,172,236,0.34) 0%, rgba(253,172,236,0) 70%)' }} />
          <img src="assets/cv_thinking_cut.png" alt="" style={{ position: 'relative', height: figH, width: figW, display: 'block' }} />
        </div>
        <AnTinyLabel>Still figuring it out</AnTinyLabel>
      </div>
    </AnSlide>
  );
}

window.AnimOpener = AnimOpener;
window.AnimTechnique = AnimTechnique;
window.AnimTools = AnimTools;
window.AnimStatus = AnimStatus;
