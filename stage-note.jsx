// stage-note.jsx — Slide 07 "A note on strategy" (maturity stages as tiers).
// A quieter, reflective slide: copy-left / figures-right editorial note.
// Two variations differ ONLY in the commentary block (A: + recommendation,
// B: pros/cons only, ends neutral).

const SN_W = 1920, SN_H = 1080;
const SN_PINK = '#E6388F', SN_NAVY = '#1A1A40', SN_SLATE = '#6A6C92', SN_PAPER = '#FEFEFE';
const SN_INK = '#3A3A55'; // slightly darker body ink for readable note copy
const SN_MARGIN = 150;

function SnWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', SN_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return; const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', SN_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function SnStageLabel({ children, x }) {
  return (
    <div style={{ position: 'absolute', left: x, transform: 'translateX(-50%)', bottom: -2,
      display: 'flex', alignItems: 'center', gap: 9, whiteSpace: 'nowrap' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: SN_PINK }} />
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: SN_SLATE }}>{children}</span>
    </div>
  );
}

// pro/con item: small-caps lead label + paragraph
function SnPoint({ label, color, children }) {
  return (
    <div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color, marginBottom: 7 }}>{label}</div>
      <p style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17.5, lineHeight: 1.5, color: SN_INK, textWrap: 'pretty' }}>{children}</p>
    </div>
  );
}

function StageNote({ variant }) {
  // figure geometry (image is on white, figures share a baseline)
  const imgW = 880, aspect = 1.825;
  const imgH = imgW / aspect;
  const imgLeft = 940, imgTop = 250;
  const feetFrac = 0.879;
  const centers = [0.1511, 0.4632, 0.7862];
  const labels = ['Baby', 'Youth', 'Adult'];
  return (
    <div style={{ position: 'relative', width: SN_W, height: SN_H, overflow: 'hidden', background: SN_PAPER, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── left: the note ── */}
      <div style={{ position: 'absolute', left: SN_MARGIN, top: 150, width: 660 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 22 }}>
          <span style={{ width: 22, height: 2, background: SN_PINK }} />
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: SN_PINK }}>A note on strategy</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 52, lineHeight: 1.04, letterSpacing: '-0.025em', color: SN_NAVY }}>Vorker, at every stage</h1>

        {/* framing — the studio's neutral setup */}
        <p style={{ margin: '26px 0 0', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18.5, lineHeight: 1.55, color: SN_SLATE, textWrap: 'pretty' }}>
          As discussed, here are Vorker&rsquo;s maturity stages explored as a possible representation of pricing tiers (e.g. free &rarr; pro).
        </p>

        {/* pro / con */}
        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <SnPoint label="Worth considering" color={SN_PINK}>
            The stages are charming, and audiences tend to adore &lsquo;baby&rsquo; versions of characters &mdash; the cuteness could drive affection for the entry tier rather than diminish it.
          </SnPoint>
          <SnPoint label="Worth weighing" color={SN_SLATE}>
            Tying the smallest &lsquo;baby&rsquo; Vorker to the free tier risks signaling that the free product is the less-capable one &mdash; when the goal is for free users to feel they&rsquo;re using something smart and capable, just with usage limits.
          </SnPoint>
        </div>

        {/* recommendation (variation A only) */}
        {variant === 'A' && (
          <div style={{ marginTop: 28, paddingLeft: 20, borderLeft: `2px solid ${SN_PINK}` }}>
            <p style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17.5, lineHeight: 1.5, color: SN_NAVY, textWrap: 'pretty' }}>
              <span style={{ fontWeight: 600 }}>Hannah&rsquo;s recommendation:</span> keep the maturity stages as a delightful brand range, but avoid mapping them directly to capability or pricing tiers &mdash; so no user ever feels they&rsquo;re on the &lsquo;lesser&rsquo; Vorker.
            </p>
          </div>
        )}
      </div>

      {/* ── right: the three stages ── */}
      <div style={{ position: 'absolute', left: imgLeft, top: imgTop, width: imgW, height: imgH }}>
        <img src="assets/vorker_stages.png" alt="" style={{ width: imgW, height: imgH, display: 'block' }} />
        <div style={{ position: 'absolute', left: 0, top: feetFrac * imgH + 34, width: imgW }}>
          {centers.map((cx, i) => <SnStageLabel key={i} x={cx * imgW}>{labels[i]}</SnStageLabel>)}
        </div>
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: SN_MARGIN, bottom: 60 }}><SnWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: SN_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: SN_SLATE }}>
        <span>A note</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: SN_PINK }} /><span style={{ color: SN_NAVY }}>07</span>
      </div>
    </div>
  );
}

function StageNoteA() { return <StageNote variant="A" />; }
function StageNoteB() { return <StageNote variant="B" />; }
window.StageNote = StageNote;
window.StageNoteA = StageNoteA;
window.StageNoteB = StageNoteB;
