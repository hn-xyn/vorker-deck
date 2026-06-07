// sample-site.jsx — "Sample website" bonus section (slide 33).
// A light, tentative sample of a modernized Vorker homepage — the saved
// Direction A (Refined) mockup, shown clean in a browser frame as the slide
// hero. Low-pressure "bonus" energy, like the wordmark section. Same deck
// system; Soft 3D hero style doing its primary job (marketing / key art).

const SS_W = 1920, SS_H = 1080;
const SS_PINK = '#E6388F', SS_SOFT = '#FDACEC', SS_LILAC = '#B7A6E8';
const SS_NAVY = '#1A1A40', SS_SLATE = '#6A6C92', SS_INK = '#3A3A55', SS_PAPER = '#FEFEFE';
const SS_MARGIN = 150;
const SS_SANS = "'Plus Jakarta Sans', sans-serif";
const SS_DISP = "'Bricolage Grotesque', sans-serif";

function SsWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', SS_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', SS_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function SsEyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: SS_PINK }} />
      <span style={{ fontFamily: SS_SANS, fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: SS_PINK, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function SsTag({ children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#FCEAF4', borderRadius: 999, padding: '8px 16px 8px 12px' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: SS_PINK }} />
      <span style={{ fontFamily: SS_SANS, fontSize: 13.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C32C76', whiteSpace: 'nowrap' }}>{children}</span>
    </span>
  );
}

// browser window chrome holding the mockup. Live iframe for crisp on-screen
// viewing; a static capture (assets/site_hero.png) when window.__VORKER_PRINT
// is set, so PDF/PPTX export captures cleanly instead of a blank iframe.
function BrowserFrame({ src, staticSrc, w, pageW, pageH }) {
  const chrome = 44;
  const scale = w / pageW;
  const dispH = Math.round(pageH * scale);
  const isPrint = typeof window !== 'undefined' && window.__VORKER_PRINT;
  return (
    <div style={{ width: w, borderRadius: 18, overflow: 'hidden', background: '#fff', border: '1px solid rgba(26,26,64,0.08)', boxShadow: '0 50px 110px -40px rgba(26,26,64,0.45), 0 16px 40px -22px rgba(26,26,64,0.22)' }}>
      <div style={{ height: chrome, background: '#F4F1EC', borderBottom: '1px solid rgba(26,26,64,0.07)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#F0A6BE' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#F2D29A' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#BFD8B0' }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ minWidth: 220, height: 26, borderRadius: 999, background: '#fff', border: '1px solid rgba(26,26,64,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 16px' }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, border: '1.6px solid ' + SS_SLATE, borderBottomWidth: 4, opacity: 0.7 }} />
            <span style={{ fontFamily: SS_SANS, fontSize: 13, fontWeight: 600, color: SS_SLATE, letterSpacing: '0.01em' }}>vorker.com</span>
          </div>
        </div>
        <span style={{ width: 60 }} />
      </div>
      <div style={{ width: w, height: dispH, overflow: 'hidden', background: '#fbf7f1' }}>
        {isPrint
          ? <img src={staticSrc} alt="Sample Vorker homepage" style={{ width: w, height: dispH, objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
          : <iframe src={src} title="Sample Vorker homepage" scrolling="no" loading="eager"
              style={{ width: pageW, height: pageH, border: 0, transform: `scale(${scale})`, transformOrigin: 'top left', display: 'block' }} />}
      </div>
    </div>
  );
}

function SampleSite() {
  return (
    <div style={{ position: 'relative', width: SS_W, height: SS_H, overflow: 'hidden', background: SS_PAPER, fontFamily: SS_SANS }}>
      {/* left — light framing */}
      <div style={{ position: 'absolute', left: SS_MARGIN, top: 300, width: 560 }}>
        <SsEyebrow>Bonus · Website</SsEyebrow>
        <h1 style={{ margin: '26px 0 0', fontFamily: SS_DISP, fontWeight: 500, fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.028em', color: SS_NAVY }}>A modern Vorker homepage.</h1>
        <div style={{ marginTop: 24 }}><SsTag>Tentative sample</SsTag></div>

        <p style={{ margin: '34px 0 0', fontFamily: SS_SANS, fontSize: 19, lineHeight: 1.55, color: SS_INK, textWrap: 'pretty' }}>
          A quick, one-pass sample of how a modernized Vorker site could feel &mdash; not a finished design. With more time it&rsquo;d be developed much further; treat it as light inspiration, and refinements can follow.
        </p>
        <p style={{ margin: '24px 0 0', fontFamily: SS_SANS, fontSize: 16, lineHeight: 1.5, color: SS_SLATE, textWrap: 'pretty' }}>
          It&rsquo;s also the <span style={{ color: SS_PINK, fontWeight: 600 }}>Soft 3D hero style</span> doing its primary job &mdash; marketing &amp; key art &mdash; the style system at work in the real world.
        </p>
      </div>

      {/* right — the mockup as hero */}
      <div style={{ position: 'absolute', top: 96, left: 900 }}>
        <BrowserFrame src="render-home.html" staticSrc="assets/site_hero.png" w={826} pageW={1440} pageH={1454} />
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: SS_MARGIN, bottom: 60 }}><SsWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: SS_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: SS_SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: SS_SLATE }}>
        <span>Sample website</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: SS_PINK }} /><span style={{ color: SS_NAVY }}>33</span>
      </div>
    </div>
  );
}

window.SampleSite = SampleSite;
