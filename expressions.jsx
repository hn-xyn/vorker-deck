// expressions.jsx — Slides 03 & 04 "Vorker Expressions" (a 2-slide spread).
// Same white-gallery system as Slide 02. Each slide places one source image
// (4 poses on white) intact so the props/bubbles aren't clipped, with captions
// aligned to each figure's measured center. Both slides render the figures at
// the SAME height (shared feet baseline + head line) so they read as one pair.

const EX_W = 1920;
const EX_H = 1080;

const EX_PINK = '#E6388F';
const EX_NAVY = '#1A1A40';
const EX_SLATE = '#6A6C92';
const EX_PAPER = '#FEFEFE'; // matches the emotions images' white backdrop

const EX_MARGIN = 150;
const EX_BASE_Y = 832; // shared feet baseline across both expression slides

function ExWordmark({ height = 22 }) {
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
        paths.forEach((p) => p.setAttribute('fill', EX_SLATE));
        const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
        const vbArea = (vb[2] || 1) * (vb[3] || 1);
        let period = null, bestX = -Infinity;
        paths.forEach((p) => {
          let b; try { b = p.getBBox(); } catch (e) { return; }
          if (!b || !b.width || !b.height) return;
          const aspect = b.width / b.height;
          if (aspect > 0.6 && aspect < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; }
        });
        if (period) period.setAttribute('fill', EX_PINK);
      });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function ExCaption({ children, x }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: EX_BASE_Y + 48, transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: 9, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: EX_PINK }} />
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase', color: EX_SLATE,
      }}>{children}</span>
    </div>
  );
}

// img: src · aspect: w/h · feetFrac: feet y as fraction of image height ·
// renderW: on-slide image width (tuned so both slides' figures match height) ·
// centers: 4 figure-center fractions · captions: 4 labels · page: footer number ·
// part: "1 / 2" pair marker
function ExpressionsSlide({ img, aspect, feetFrac, renderW, centers, captions, page, part }) {
  const renderH = renderW / aspect;
  const imgLeft = (EX_W - renderW) / 2;
  const renderTop = EX_BASE_Y - feetFrac * renderH;
  return (
    <div style={{ position: 'relative', width: EX_W, height: EX_H, overflow: 'hidden', background: EX_PAPER, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* title block — top-left on the shared margin */}
      <div style={{ position: 'absolute', left: EX_MARGIN, top: 132 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 20 }}>
          <span style={{ width: 22, height: 2, background: EX_PINK }} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: EX_PINK }}>Expressions</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 60, lineHeight: 1.0, letterSpacing: '-0.025em', color: EX_NAVY }}>A range of moods</h1>
        <div style={{ marginTop: 20, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: EX_SLATE, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
          <span>Part</span>
          <span style={{ color: EX_NAVY }}>{part}</span>
        </div>
      </div>

      {/* the four poses, intact */}
      <img src={img} alt="" style={{ position: 'absolute', left: imgLeft, top: renderTop, width: renderW, height: renderH, display: 'block' }} />

      {/* captions aligned to each figure's measured center */}
      {centers.map((cx, i) => (
        <ExCaption key={i} x={imgLeft + cx * renderW}>{captions[i]}</ExCaption>
      ))}

      {/* footer — locked wordmark + slide label, matching Slide 02 */}
      <div style={{ position: 'absolute', left: EX_MARGIN, bottom: 60 }}>
        <ExWordmark height={22} />
      </div>
      <div style={{ position: 'absolute', right: EX_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: EX_SLATE }}>
        <span>Expressions</span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: EX_PINK }} />
        <span style={{ color: EX_NAVY }}>{page}</span>
      </div>
    </div>
  );
}

// Convenience wrappers with the measured per-image values baked in.
function Expressions3() {
  return <ExpressionsSlide img="assets/vorker_emotions_1.jpg" aspect={1.887} feetFrac={0.780} renderW={1367}
    centers={[0.1071, 0.3552, 0.6111, 0.8393]} captions={['Neutral', 'Excited', 'Focused', 'Thoughtful']} page="03" part="1 / 2" />;
}
function Expressions4() {
  return <ExpressionsSlide img="assets/vorker_emotions_2.jpg" aspect={2.357} feetFrac={0.878} renderW={1431}
    centers={[0.1011, 0.3764, 0.5983, 0.8412]} captions={['Sad', 'Frustrated', 'Curious', 'Overwhelmed']} page="04" part="2 / 2" />;
}

window.ExpressionsSlide = ExpressionsSlide;
window.Expressions3 = Expressions3;
window.Expressions4 = Expressions4;
