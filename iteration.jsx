// iteration.jsx — Slides 13–14 "Iteration" section (before / after, with a POV).
//   13 · the crane scene — busy vs simplified
//   14 · the mountain scene — cluttered vs clean + reusable takeaway
// Same white-gallery system. This section IS a recommendation: red ✕ = avoid,
// green ✓ = aim for. Pink accent for chrome, navy/slate text, 150px margin.

const IT_W = 1920, IT_H = 1080;
const IT_PINK = '#E6388F', IT_NAVY = '#1A1A40', IT_SLATE = '#6A6C92', IT_PAPER = '#FEFEFE';
const IT_INK = '#3A3A55';
const IT_RED = '#E0463E', IT_GREEN = '#1F9E5B';
const IT_MARGIN = 150;
const IT_SHADOW = '0 30px 80px -34px rgba(26,26,64,0.34), 0 6px 18px -10px rgba(26,26,64,0.12)';

function ItWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', IT_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', IT_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function ItEyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: IT_PINK }} />
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: IT_PINK, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function ItFooter({ page }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: IT_MARGIN, bottom: 60 }}><ItWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: IT_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: IT_SLATE }}>
        <span>Iteration</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: IT_PINK }} /><span style={{ color: IT_NAVY }}>{page}</span>
      </div>
    </React.Fragment>
  );
}

// badge with ✕ or ✓
function ItBadge({ kind }) {
  const color = kind === 'before' ? IT_RED : IT_GREEN;
  const glyph = kind === 'before' ? '\u2715' : '\u2713';
  return (
    <span style={{ width: 30, height: 30, borderRadius: '50%', background: color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: kind === 'before' ? 14 : 16, fontWeight: 700, lineHeight: 1, flexShrink: 0 }}>{glyph}</span>
  );
}

function ItColumn({ kind, label, src, bullets, w, imgH }) {
  const color = kind === 'before' ? IT_RED : IT_GREEN;
  return (
    <div style={{ width: w, display: 'flex', flexDirection: 'column' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 16 }}>
        <ItBadge kind={kind} />
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: color }}>{label}</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(26,26,64,0.10)' }} />
      </div>
      {/* image */}
      <div style={{ width: w, height: imgH, borderRadius: 20, overflow: 'hidden', boxShadow: IT_SHADOW, border: '3px solid ' + (kind === 'before' ? 'rgba(224,70,62,0.30)' : 'rgba(31,158,91,0.32)') }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      {/* bullets */}
      <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', columnGap: 12, alignItems: 'start' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, marginTop: 9 }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, lineHeight: 1.4, color: IT_INK, textWrap: 'pretty' }}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BeforeAfterSlide({ title, intro, before, after, imgH, topStart, gutter, page, part, takeaway }) {
  const colW = Math.round((IT_W - 2 * IT_MARGIN - gutter) / 2);
  return (
    <div style={{ position: 'relative', width: IT_W, height: IT_H, overflow: 'hidden', background: IT_PAPER, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* eyebrow row */}
      <div style={{ position: 'absolute', left: IT_MARGIN, top: 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: IT_W - 2 * IT_MARGIN }}>
        <ItEyebrow>Iteration</ItEyebrow>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: IT_NAVY }}>{part}</div>
      </div>

      {/* header: title left, intro right */}
      <h1 style={{ position: 'absolute', left: IT_MARGIN, top: 120, width: 540, margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 46, lineHeight: 1.04, letterSpacing: '-0.026em', color: IT_NAVY }}>{title}</h1>
      <p style={{ position: 'absolute', left: 800, top: 124, width: 820, margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16.5, lineHeight: 1.55, color: IT_SLATE, textWrap: 'pretty' }}>{intro}</p>

      {/* two columns */}
      <div style={{ position: 'absolute', left: IT_MARGIN, top: topStart, display: 'flex', gap: gutter }}>
        <ItColumn kind="before" label="Before" src={before.src} bullets={before.bullets} w={colW} imgH={imgH} />
        <ItColumn kind="after" label="After" src={after.src} bullets={after.bullets} w={colW} imgH={imgH} />
      </div>

      {takeaway && (
        <div style={{ position: 'absolute', left: IT_MARGIN, right: IT_MARGIN, bottom: 116, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
          <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: IT_PINK, flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: IT_PINK, marginBottom: 7 }}>The reusable pattern</div>
            <p style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 400, fontSize: 20, lineHeight: 1.42, color: IT_NAVY, maxWidth: 1320, textWrap: 'pretty' }}>{takeaway}</p>
          </div>
        </div>
      )}

      <ItFooter page={page} />
    </div>
  );
}

function IterationCrane() {
  return <BeforeAfterSlide
    title={<span>Iterating toward stronger images</span>}
    intro={<span>Not every render lands on the first try. Here&rsquo;s how to push an image toward something clearer and more on-brand &mdash; and what to look for when you do.</span>}
    before={{ src: 'assets/iter_crane_before.png', bullets: [
      'Too much going on — a busy background competes with the character.',
      'The eye doesn\u2019t know where to land.',
      'Harsher, more literal color; less on-brand.',
    ] }}
    after={{ src: 'assets/iter_crane_after.png', bullets: [
      'Simplified scene — Vorker is clearly the focus.',
      'Softer, on-brand palette — the dreamy gradient world.',
      'Calmer composition; one clear message.',
    ] }}
    imgH={430} topStart={300} gutter={72} page="20" part="1 / 2" />;
}

function IterationMountain() {
  return <BeforeAfterSlide
    title={<span>Iterating toward stronger images</span>}
    intro={<span>The same principle on a different scene. Notice how removing clutter &mdash; not adding polish &mdash; is what makes the image read as more considered and more premium.</span>}
    before={{ src: 'assets/iter_mtn_before.jpg', bullets: [
      'Dense, photoreal background pulls attention from Vorker.',
      'Too many floating UI cards — cluttered, competing.',
      'Busy overall; no clear focal point.',
    ] }}
    after={{ src: 'assets/iter_mtn_after.png', bullets: [
      'Cleaner, softer backdrop keeps Vorker central.',
      'Fewer, simpler product cards — purposeful, not crowded.',
      'Clear hierarchy; the scene breathes.',
    ] }}
    imgH={376} topStart={272} gutter={72} page="21" part="2 / 2"
    takeaway={<span>Simplify the background, keep one clear focal point, lean into the soft on-brand palette, and use product UI sparingly and purposefully. When in doubt, remove &mdash; clarity reads as quality.</span>} />;
}

window.IterationCrane = IterationCrane;
window.IterationMountain = IterationMountain;
