// integrations.jsx — Slides 05 & 06 "Vorker × your tools" (a 2-slide spread).
// Same white-gallery system. Each source image is a 2×2 grid of vignettes;
// the vignettes were cropped to content so they can be laid out evenly and
// large, normalized to a shared height so both slides share one rhythm.

const IN_W = 1920, IN_H = 1080;
const IN_PINK = '#E6388F', IN_NAVY = '#1A1A40', IN_SLATE = '#6A6C92', IN_PAPER = '#FEFEFE';
const IN_MARGIN = 150;
const IN_VG_H = 270;       // shared vignette height across both slides
const IN_COL_W = 540;      // fixed grid column so both slides align identically

function InWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', IN_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', IN_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function InCaption({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, whiteSpace: 'nowrap', marginTop: 18 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: IN_PINK }} />
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: IN_SLATE }}>{children}</span>
    </div>
  );
}

function InVignette({ src, caption }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ height: IN_VG_H, display: 'flex', alignItems: 'flex-end' }}>
        <img src={src} alt="" style={{ height: IN_VG_H, width: 'auto', display: 'block' }} />
      </div>
      <InCaption>{caption}</InCaption>
    </div>
  );
}

// imgs: 4 crop srcs in reading order (TL, TR, BL, BR) · captions: 4 labels
function IntegrationsSlide({ imgs, captions, page, part }) {
  return (
    <div style={{ position: 'relative', width: IN_W, height: IN_H, overflow: 'hidden', background: IN_PAPER, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* title block */}
      <div style={{ position: 'absolute', left: IN_MARGIN, top: 120 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 20 }}>
          <span style={{ width: 22, height: 2, background: IN_PINK }} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: IN_PINK }}>Integrations</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 60, lineHeight: 1.0, letterSpacing: '-0.025em', color: IN_NAVY }}>Works with your tools</h1>
        <div style={{ marginTop: 20, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: IN_SLATE, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
          <span>Part</span><span style={{ color: IN_NAVY }}>{part}</span>
        </div>
      </div>

      {/* 2×2 vignette grid, centered */}
      <div style={{ position: 'absolute', left: '50%', top: 350, transform: 'translateX(-50%)', display: 'grid', gridTemplateColumns: `${IN_COL_W}px ${IN_COL_W}px`, columnGap: 96, rowGap: 70, justifyItems: 'center' }}>
        {imgs.map((src, i) => <InVignette key={i} src={src} caption={captions[i]} />)}
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: IN_MARGIN, bottom: 60 }}><InWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: IN_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: IN_SLATE }}>
        <span>Integrations</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: IN_PINK }} /><span style={{ color: IN_NAVY }}>{page}</span>
      </div>
    </div>
  );
}

function Integrations5() {
  return <IntegrationsSlide
    imgs={['assets/ig_g_0.png', 'assets/ig_g_1.png', 'assets/ig_g_2.png', 'assets/ig_g_3.png']}
    captions={['Gmail', 'Sheets', 'Calendar', 'Drive']} page="05" part="1 / 2" />;
}
function Integrations6() {
  return <IntegrationsSlide
    imgs={['assets/ig_o_0.png', 'assets/ig_o_1.png', 'assets/ig_o_2.png', 'assets/ig_o_3.png']}
    captions={['Slack', 'Notion', 'Microsoft Teams', '& many more']} page="06" part="2 / 2" />;
}

window.IntegrationsSlide = IntegrationsSlide;
window.Integrations5 = Integrations5;
window.Integrations6 = Integrations6;
