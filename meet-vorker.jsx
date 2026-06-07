// meet-vorker.jsx — Slide 02 "Meet Vorker" — product-turnaround character intro.
// Three variations share one white-gallery system; only copy density / layout
// changes between them. Carries the locked wordmark (slate "vorker" + pink dot).

const S2_W = 1920;
const S2_H = 1080;

const PINK = '#E6388F';
const NAVY = '#1A1A40';
const SLATE = '#6A6C92';
const PAPER = '#F8F6F7'; // matches the photos' studio backdrop so figures blend

const MARGIN = 150;
const BASE_Y = 884; // shared ground line — every figure's feet land here

// ── locked wordmark (inlined SVG, two-tone: slate letters + pink period) ──
function Wordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg')
      .then((r) => r.text())
      .then((txt) => {
        if (!alive || !ref.current) return;
        ref.current.innerHTML = txt;
        const svg = ref.current.querySelector('svg');
        if (!svg) return;
        svg.style.height = height + 'px';
        svg.style.width = 'auto';
        svg.style.display = 'block';
        const paths = Array.from(svg.querySelectorAll('path'));
        paths.forEach((p) => p.setAttribute('fill', SLATE));
        const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
        const vbArea = (vb[2] || 1) * (vb[3] || 1);
        let period = null, bestX = -Infinity;
        paths.forEach((p) => {
          let b; try { b = p.getBBox(); } catch (e) { return; }
          if (!b || !b.width || !b.height) return;
          const aspect = b.width / b.height;
          const areaRatio = (b.width * b.height) / vbArea;
          if (aspect > 0.6 && aspect < 1.6 && areaRatio < 0.02 && b.x > bestX) { bestX = b.x; period = p; }
        });
        if (period) period.setAttribute('fill', PINK);
      });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

// small-caps view label with the recurring pink-dot accent
function Label({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: PINK, display: 'inline-block' }} />
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase', color: SLATE, whiteSpace: 'nowrap',
      }}>{children}</span>
    </div>
  );
}

// a standing figure anchored so its feet meet BASE_Y, label sits below
function Figure({ src, h, centerX, label }) {
  return (
    <div style={{
      position: 'absolute', top: BASE_Y - h, left: centerX, transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
    }}>
      <img src={src} alt="" style={{ height: h, width: 'auto', display: 'block' }} />
      <Label>{label}</Label>
    </div>
  );
}

function Kicker({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 22 }}>
      <span style={{ width: 22, height: 2, background: PINK, display: 'inline-block' }} />
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: PINK,
      }}>{children}</span>
    </div>
  );
}

function Title({ size = 86 }) {
  return (
    <h1 style={{
      margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500,
      fontSize: size, lineHeight: 1.0, letterSpacing: '-0.025em', color: NAVY,
    }}>Meet Vorker</h1>
  );
}

function Body({ children, width }) {
  return (
    <p style={{
      margin: 0, width, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400,
      fontSize: 23, lineHeight: 1.62, color: SLATE, textWrap: 'pretty',
    }}>{children}</p>
  );
}

function Frame({ children }) {
  return (
    <div style={{ position: 'relative', width: S2_W, height: S2_H, overflow: 'hidden', background: PAPER }}>
      {children}
      {/* footer — locked wordmark bottom-left, quiet page marker bottom-right */}
      <div style={{ position: 'absolute', left: MARGIN, bottom: 60 }}>
        <Wordmark height={22} />
      </div>
      <div style={{
        position: 'absolute', right: MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase', color: SLATE,
      }}>
        <span>Meet Vorker</span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: PINK, display: 'inline-block' }} />
        <span style={{ color: NAVY }}>02</span>
      </div>
    </div>
  );
}

const FRONT = 'assets/vorker_front.jpeg';
const TURN = 'assets/vorker_side_back.jpeg';

// ── VARIATION A — no bio. Clean title, front hero, side/back supporting ──
function VariantA() {
  return (
    <Frame>
      <div style={{ position: 'absolute', left: MARGIN, top: 150 }}>
        <Kicker>Character Introduction</Kicker>
        <Title size={92} />
      </div>
      <Figure src={FRONT} h={742} centerX={960} label="Front view" />
      <Figure src={TURN} h={398} centerX={1545} label="Side &amp; back" />
    </Frame>
  );
}

// ── VARIATION B — longer bio set quietly in a left copy column ──
function VariantB() {
  return (
    <Frame>
      <div style={{ position: 'absolute', left: MARGIN, top: '50%', transform: 'translateY(-50%)', width: 486 }}>
        <Kicker>Mascot introduction</Kicker>
        <Title size={68} />
        <div style={{ height: 30 }} />
        <Body width={470}>
          Vorker is the friendly work companion at the center of the brand — approachable,
          capable, and quietly helpful. His design keeps the charm of the original mascot
          while giving him a more polished, grown-up presence that&rsquo;s better suited for a
          product people rely on every day.
        </Body>
      </div>
      <Figure src={FRONT} h={706} centerX={1130} label="Front view" />
      <Figure src={TURN} h={372} centerX={1620} label="Side &amp; back" />
    </Frame>
  );
}

// ── VARIATION C — varied layout: front view left, short "About" copy right ──
function VariantC() {
  return (
    <Frame>
      <Figure src={FRONT} h={742} centerX={470} label="Front view" />
      <div style={{ position: 'absolute', left: 980, top: 168, width: 640 }}>
        <Kicker>Meet Vorker</Kicker>
        <h2 style={{
          margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500,
          fontSize: 52, lineHeight: 1.04, letterSpacing: '-0.02em', color: NAVY,
        }}>About Vorker</h2>
        <div style={{ height: 26 }} />
        <Body width={620}>
          Vorker is the brand&rsquo;s friendly work companion: simple, recognizable, and
          approachable. This final direction keeps his charm intact while making him feel more
          capable, polished, and ready to represent the product across web, product, social,
          and motion.
        </Body>
        <div style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
            <img src={TURN} alt="" style={{ height: 326, width: 'auto', display: 'block', marginLeft: -10 }} />
            <Label>Side &amp; back</Label>
          </div>
        </div>
      </div>
    </Frame>
  );
}

window.MeetVorkerA = VariantA;
window.MeetVorkerB = VariantB;
window.MeetVorkerC = VariantC;
