// wordmarks.jsx — "Wordmark explorations" closing bonus section (slide 34).
// Four wordmark directions tiled on one page. Low-pressure framing: tentative
// starting points, not finished lockups. Marks placed as-is and recolored from
// the Vorker colorways; wm_1 is a white SVG so it sits on a dark tile. Same
// deck system; chrome pink #E6388F.

const WM_W = 1920, WM_H = 1080;
const WM_PINK = '#E6388F', WM_SOFT = '#FDACEC', WM_LILAC = '#B7A6E8';
const WM_NAVY = '#1A1A40', WM_SLATE = '#6A6C92', WM_INK = '#3A3A55', WM_PAPER = '#FEFEFE';
const WM_MARGIN = 150;
const WM_SANS = "'Plus Jakarta Sans', sans-serif";
const WM_DISP = "'Bricolage Grotesque', sans-serif";

function WmFootWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', WM_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', WM_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function WmEyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: WM_PINK }} />
      <span style={{ fontFamily: WM_SANS, fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: WM_PINK, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

// load an SVG wordmark, recolor every path, tint the period dot
function WmMark({ src, color, period, h }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch(src).then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = h + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', color));
      if (period) {
        const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
        const vbArea = (vb[2] || 1) * (vb[3] || 1);
        let per = null, bestX = -Infinity;
        paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
          if (!b || !b.width || !b.height) return;
          const a = b.width / b.height;
          if (a > 0.55 && a < 1.7 && (b.width * b.height) / vbArea < 0.03 && b.x > bestX) { bestX = b.x; per = p; } });
        if (per) per.setAttribute('fill', period);
      }
    });
    return () => { alive = false; };
  }, [src, color, period, h]);
  return <span ref={ref} style={{ display: 'block', height: h }} />;
}

function WmTile({ t, idx, w, h }) {
  return (
    <div style={{ width: w, height: h, background: t.bg, borderRadius: 26, border: '1px solid ' + (t.border || 'rgba(26,26,64,0.06)'), boxShadow: '0 24px 60px -34px rgba(26,26,64,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <WmMark src={t.src} color={t.mark} period={t.period} h={t.markH || 92} />
      <span style={{ position: 'absolute', left: 26, bottom: 22, fontFamily: WM_SANS, fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', color: t.mark, opacity: 0.4 }}>{idx}</span>
    </div>
  );
}

function WordmarkExplorations() {
  const tiles = [
    { src: 'assets/wm_1.svg', bg: WM_NAVY, mark: '#FFFFFF', period: WM_SOFT, border: 'rgba(255,255,255,0.06)', markH: 86 },
    { src: 'assets/wm_2.svg', bg: '#FBF6EF', mark: WM_NAVY, period: WM_PINK, markH: 96 },
    { src: 'assets/wm_3.svg', bg: WM_PINK, mark: '#FFFFFF', period: WM_NAVY, border: 'rgba(26,26,64,0.10)', markH: 92 },
    { src: 'assets/wm_4.svg', bg: '#F1ECFB', mark: WM_NAVY, period: WM_PINK, markH: 92 },
  ];
  const gridW = WM_W - 2 * WM_MARGIN, gap = 34;
  const tileW = Math.round((gridW - gap) / 2), tileH = 322;
  return (
    <div style={{ position: 'relative', width: WM_W, height: WM_H, overflow: 'hidden', background: WM_PAPER, fontFamily: WM_SANS }}>
      <div style={{ position: 'absolute', left: WM_MARGIN, top: 92 }}><WmEyebrow>Bonus · Wordmark</WmEyebrow></div>
      <h1 style={{ position: 'absolute', left: WM_MARGIN, top: 130, margin: 0, fontFamily: WM_DISP, fontWeight: 500, fontSize: 50, lineHeight: 1.02, letterSpacing: '-0.026em', color: WM_NAVY }}>Wordmark explorations.</h1>
      <p style={{ position: 'absolute', left: 840, top: 146, width: 780, margin: 0, fontFamily: WM_SANS, fontSize: 17.5, lineHeight: 1.55, color: WM_SLATE, textWrap: 'pretty' }}>
        A few tentative starting points, if you ever want to push the wordmark &mdash; quick directions to spark ideas, not finished lockups. With more time they&rsquo;d go further.
      </p>

      <div style={{ position: 'absolute', left: WM_MARGIN, top: 286, display: 'grid', gridTemplateColumns: `${tileW}px ${tileW}px`, gap: gap }}>
        {tiles.map((t, i) => <WmTile key={t.src} t={t} idx={'0' + (i + 1)} w={tileW} h={tileH} />)}
      </div>

      <div style={{ position: 'absolute', left: WM_MARGIN, bottom: 60 }}><WmFootWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: WM_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: WM_SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: WM_SLATE }}>
        <span>Wordmark</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: WM_PINK }} /><span style={{ color: WM_NAVY }}>34</span>
      </div>
    </div>
  );
}

window.WordmarkExplorations = WordmarkExplorations;
