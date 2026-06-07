// style-options.jsx — Slides 11–12 "Style options" section.
//   11 · comparison 1/2 — hike scene, two takes (detail vs graphic)
//   12 · comparison 2/2 — dolly scene, two takes (saturated vs muted) + closing line
// Same white-gallery system. Two options shown side-by-side at IDENTICAL size,
// equal-weight peers — neither favored. Pink accent, navy, slate, 150px margin.

const SO_W = 1920, SO_H = 1080;
const SO_PINK = '#E6388F', SO_NAVY = '#1A1A40', SO_SLATE = '#6A6C92', SO_PAPER = '#FEFEFE';
const SO_INK = '#3A3A55';
const SO_MARGIN = 150;
const SO_SHADOW = '0 34px 90px -34px rgba(26,26,64,0.34), 0 6px 18px -10px rgba(26,26,64,0.12)';

function SoWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', SO_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', SO_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function SoEyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: SO_PINK }} />
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: SO_PINK, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function SoFooter({ page }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: SO_MARGIN, bottom: 60 }}><SoWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: SO_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: SO_SLATE }}>
        <span>Style options</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: SO_PINK }} /><span style={{ color: SO_NAVY }}>{page}</span>
      </div>
    </React.Fragment>
  );
}

// one option: label tab above, image, caption below — fixed equal height
function SoOption({ src, label, caption, w, h }) {
  return (
    <div style={{ width: w, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: SO_PINK, whiteSpace: 'nowrap' }}>{label}</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(26,26,64,0.12)' }} />
      </div>
      <div style={{ width: w, height: h, borderRadius: 22, overflow: 'hidden', boxShadow: SO_SHADOW }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <p style={{ margin: '18px 0 0', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16.5, lineHeight: 1.45, color: SO_INK, textWrap: 'pretty' }}>{caption}</p>
    </div>
  );
}

// items: [{src,label,caption,aspect}]; equal height, widths from aspect, centered group
function ComparisonSlide({ title, intro, items, imgH, gutter, page, part, closing }) {
  return (
    <div style={{ position: 'relative', width: SO_W, height: SO_H, overflow: 'hidden', background: SO_PAPER, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* eyebrow row */}
      <div style={{ position: 'absolute', left: SO_MARGIN, top: 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: SO_W - 2 * SO_MARGIN }}>
        <SoEyebrow>Style options</SoEyebrow>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: SO_NAVY }}>{part}</div>
      </div>

      {/* header: title left, intro right */}
      <h1 style={{ position: 'absolute', left: SO_MARGIN, top: 122, width: 560, margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 50, lineHeight: 1.02, letterSpacing: '-0.026em', color: SO_NAVY }}>{title}</h1>
      <p style={{ position: 'absolute', left: 800, top: 126, width: 820, margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16.5, lineHeight: 1.55, color: SO_SLATE, textWrap: 'pretty' }}>{intro}</p>

      {/* comparison group, centered horizontally */}
      <div style={{ position: 'absolute', left: '50%', top: 322, transform: 'translateX(-50%)', display: 'flex', alignItems: 'flex-start', gap: gutter }}>
        {items.map((it, i) => <SoOption key={i} src={it.src} label={it.label} caption={it.caption} w={Math.round(imgH * it.aspect)} h={imgH} />)}
      </div>

      {closing && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 132, display: 'flex', justifyContent: 'center' }}>
          <p style={{ margin: 0, maxWidth: 1040, textAlign: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: SO_NAVY, textWrap: 'balance' }}>{closing}</p>
        </div>
      )}

      <SoFooter page={page} />
    </div>
  );
}

function StyleOptionsHike() {
  return <ComparisonSlide
    title={<span>Same world,<br />different looks</span>}
    intro={<span>The same style can lean in different directions while staying true to Vorker. These aren&rsquo;t before-and-after &mdash; they&rsquo;re equally valid options. Choosing one deliberately is what keeps the look intentional and ownable, rather than generically &ldquo;AI 3D.&rdquo; Here are two takes on the same scene.</span>}
    items={[
      { src: 'assets/opt_hike_a.png', label: 'Option A', caption: 'Rich, detailed, naturalistic — fuller atmosphere and depth.', aspect: 1536 / 1024 },
      { src: 'assets/opt_hike_b.jpg', label: 'Option B', caption: 'Cleaner and more graphic — simpler forms, a more designed feel.', aspect: 1536 / 1024 },
    ]}
    imgH={470} gutter={56} page="11" part="1 / 2" />;
}

function StyleOptionsDolly() {
  return <ComparisonSlide
    title={<span>Same world,<br />different looks</span>}
    intro={<span>Options can differ by palette, too &mdash; the same scene, the same character, tuned warmer or cooler. Neither is the &ldquo;correct&rdquo; one; they&rsquo;re two valid moods. What matters is picking the register that feels most like Vorker and using it consistently.</span>}
    items={[
      { src: 'assets/opt_dolly_b.png', label: 'Option A', caption: 'Softer and more muted — calmer, with the same warmth.', aspect: 1240 / 617 },
      { src: 'assets/opt_dolly_a.png', label: 'Option B', caption: 'Brighter and more saturated — high energy, maximal color.', aspect: 1183 / 665 },
    ]}
    imgH={392} gutter={56} page="12" part="2 / 2"
    closing={<span>Any of these can be Vorker &mdash; what matters is choosing one and holding it consistently.</span>} />;
}

window.StyleOptionsHike = StyleOptionsHike;
window.StyleOptionsDolly = StyleOptionsDolly;
