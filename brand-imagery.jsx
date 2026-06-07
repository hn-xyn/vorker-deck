// brand-imagery.jsx — Slides 08–10 "Brand imagery" section.
//   08 · section opener — featured rainbow render + 3 commentary themes
//   09 · collection 1/2 — hike + delivery (bright, in-motion)
//   10 · collection 2/2 — clipboard + campfire (warm, atmospheric)
// Same white-gallery system: Bricolage display / Plus Jakarta body,
// pink flagship accent, deep navy, slate, 150px left margin, footer wordmark.

const BI_W = 1920, BI_H = 1080;
const BI_PINK = '#E6388F', BI_NAVY = '#1A1A40', BI_SLATE = '#6A6C92', BI_PAPER = '#FEFEFE';
const BI_INK = '#3A3A55';
const BI_MARGIN = 150;
const BI_SHADOW = '0 34px 90px -34px rgba(26,26,64,0.34), 0 6px 18px -10px rgba(26,26,64,0.12)';

function BiWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', BI_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', BI_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function BiEyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: BI_PINK }} />
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BI_PINK, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function BiFooter({ page }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: BI_MARGIN, bottom: 60 }}><BiWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: BI_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BI_SLATE }}>
        <span>Brand imagery</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: BI_PINK }} /><span style={{ color: BI_NAVY }}>{page}</span>
      </div>
    </React.Fragment>
  );
}

// ── Slide 08 · section opener ──────────────────────────────────────────────
function BiTheme({ label, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
        <span style={{ width: 16, height: 2, background: BI_PINK }} />
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BI_PINK, whiteSpace: 'nowrap' }}>{label}</span>
      </div>
      <p style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16.5, lineHeight: 1.5, color: BI_INK, textWrap: 'pretty' }}>{children}</p>
    </div>
  );
}

function BrandOpener() {
  const imgW = 1010, imgH = imgW / 1.5; // rainbow render is 1536×1024
  const imgTop = (BI_H - imgH) / 2;
  return (
    <div style={{ position: 'relative', width: BI_W, height: BI_H, overflow: 'hidden', background: BI_PAPER, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* left — the note */}
      <div style={{ position: 'absolute', left: BI_MARGIN, top: 132, width: 580 }}>
        <BiEyebrow>Brand imagery</BiEyebrow>
        <h1 style={{ margin: '22px 0 0', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 58, lineHeight: 1.0, letterSpacing: '-0.028em', color: BI_NAVY }}>Vorker in the world</h1>
        <div style={{ height: 1, background: 'rgba(26,26,64,0.10)', margin: '28px 0 28px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <BiTheme label="Palette">
            A vivid-yet-soft palette &mdash; warm pinks, lilacs, and dreamy skies &mdash; that feels optimistic and friendly, never corporate.
          </BiTheme>
          <BiTheme label="The 3D style">
            Vorker&rsquo;s primary, hero illustration style: a soft, stylized 3D look &mdash; rounded, toy-like forms, gently glossy surfaces, soft lighting, and a warm, lovable, almost video-game character quality. It&rsquo;s the richest way to show Vorker, and sits alongside lighter 2D sub-styles (shown later) that support the same world in flatter, simpler contexts.
          </BiTheme>
          <BiTheme label="Alive &amp; lived-in">
            Above all, Vorker should feel <em style={{ fontStyle: 'italic', color: BI_NAVY }}>alive</em> &mdash; never a static, posed mascot. Every scene gives him energy and presence: in motion, mid-thought, mid-task, inhabiting his environment rather than floating in front of it.
          </BiTheme>
        </div>
      </div>

      {/* right — featured render */}
      <div style={{ position: 'absolute', left: BI_W - BI_MARGIN - imgW, top: imgTop, width: imgW, height: imgH, borderRadius: 30, overflow: 'hidden', boxShadow: BI_SHADOW }}>
        <img src="assets/world_rainbow.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      <BiFooter page="08" />
    </div>
  );
}

// ── Slides 09 & 10 · collection ────────────────────────────────────────────
function BiPlate({ src, caption, w, h }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: w, height: h, borderRadius: 26, overflow: 'hidden', boxShadow: BI_SHADOW }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, marginTop: 22 }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: BI_PINK }} />
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BI_NAVY, whiteSpace: 'nowrap' }}>{caption}</span>
      </div>
    </div>
  );
}

// items: [{ src, caption, aspect }]; all plates normalized to a shared height
function CollectionSlide({ items, height, gutter, page, part }) {
  const blockH = height + 60; // plate + caption
  const top = 168 + ((BI_H - 168 - 120) - blockH) / 2; // center within (eyebrow..footer)
  return (
    <div style={{ position: 'relative', width: BI_W, height: BI_H, overflow: 'hidden', background: BI_PAPER, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* eyebrow row */}
      <div style={{ position: 'absolute', left: BI_MARGIN, top: 104, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: BI_W - 2 * BI_MARGIN }}>
        <BiEyebrow>Brand imagery</BiEyebrow>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BI_SLATE, display: 'flex', alignItems: 'center', gap: 9, whiteSpace: 'nowrap' }}>
          <span>Vorker in the world</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: BI_PINK }} /><span style={{ color: BI_NAVY }}>{part}</span>
        </div>
      </div>

      {/* plates */}
      <div style={{ position: 'absolute', left: '50%', top, transform: 'translateX(-50%)', display: 'flex', alignItems: 'flex-start', gap: gutter }}>
        {items.map((it, i) => <BiPlate key={i} src={it.src} caption={it.caption} w={Math.round(height * it.aspect)} h={height} />)}
      </div>

      <BiFooter page={page} />
    </div>
  );
}

function CollectionOne() {
  return <CollectionSlide
    items={[
      { src: 'assets/world_hike.png', caption: 'Charting the path', aspect: 1536 / 1024 },
      { src: 'assets/world_delivery.png', caption: 'Moving work forward', aspect: 1240 / 617 },
    ]}
    height={452} gutter={58} page="09" part="1 / 2" />;
}

function CollectionTwo() {
  return <CollectionSlide
    items={[
      { src: 'assets/world_clipboard.png', caption: 'Mapping the day ahead', aspect: 1536 / 1024 },
      { src: 'assets/world_camp.png', caption: 'Planning, anywhere', aspect: 1536 / 1024 },
    ]}
    height={500} gutter={64} page="10" part="2 / 2" />;
}

window.BrandOpener = BrandOpener;
window.CollectionOne = CollectionOne;
window.CollectionTwo = CollectionTwo;
