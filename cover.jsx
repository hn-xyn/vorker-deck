// cover.jsx — Vorker "Brand Mascot Explorations" cover slide
// One reusable Cover component; the only variable is which wordmark SVG it uses.

const COVER_W = 1920;
const COVER_H = 1080;

// flagship brand pink + supporting tones
const PINK = '#E6388F';
const NAVY = '#1A1A40';
const CREAM = '#FAF7F5';
// secondary wordmark ink — a lighter, cooler slate so the mark reads as
// secondary to the deep-navy title and the pink period pops against it.
const WORDMARK_INK = '#6A6C92';

// shared left safe-area margin used across the whole deck
const MARGIN_L = 150;

// Inlines the SVG so we can recolor it via CSS (fill override). Recoloring an
// <img> isn't possible and CSS masks proved unreliable in-preview.
// Two-tone: the letters take `letterColor`; the standalone period (a small,
// roughly-square, isolated glyph at the far right) is kept in flagship `pink`
// so the brand accent stands alone against the contrasting wordmark.
function Wordmark({ src, letterColor, pink, height }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch(src)
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
        paths.forEach((p) => p.setAttribute('fill', letterColor));
        // Find the period: a small, near-square glyph sitting at the far right.
        const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
        const vbArea = (vb[2] || 1) * (vb[3] || 1);
        let period = null;
        let bestX = -Infinity;
        paths.forEach((p) => {
          let b;
          try { b = p.getBBox(); } catch (e) { return; }
          if (!b || !b.width || !b.height) return;
          const aspect = b.width / b.height;
          const areaRatio = (b.width * b.height) / vbArea;
          const isDotLike = aspect > 0.6 && aspect < 1.6 && areaRatio < 0.02;
          if (isDotLike && b.x > bestX) { bestX = b.x; period = p; }
        });
        if (period) period.setAttribute('fill', pink);
      });
    return () => {
      alive = false;
    };
  }, [src, letterColor, pink, height]);
  return (
    <span
      ref={ref}
      style={{
        display: 'block',
        height,
        filter: 'drop-shadow(0 1px 10px rgba(250,247,245,0.7))',
      }}
    />
  );
}

function Cover({ wordmark }) {
  return (
    <div
      style={{
        position: 'relative',
        width: COVER_W,
        height: COVER_H,
        overflow: 'hidden',
        background: '#f5d9d6',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* full-bleed hero, scaled a touch tighter so the mascot sits center-right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(assets/hero2.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '118%',
          backgroundPosition: '38% 42%',
        }}
      />

      {/* whisper-soft cream scrim on the left to lift text off the sky */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(250,247,245,0.62) 0%, rgba(250,247,245,0.34) 18%, rgba(250,247,245,0.08) 32%, rgba(250,247,245,0) 44%)',
        }}
      />

      {/* overlay zone — wordmark + title, vertically centered on the safe margin */}
      <div
        style={{
          position: 'absolute',
          left: MARGIN_L,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 30,
        }}
      >
        {/* wordmark — small, secondary; slate letters with a standalone pink period */}
        <Wordmark src={wordmark} letterColor={WORDMARK_INK} pink={PINK} height={34} />


        {/* main title — focal but restrained */}
        <h1
          style={{
            margin: 0,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 500,
            fontSize: 74,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: NAVY,
            textWrap: 'balance',
            textShadow: '0 1px 22px rgba(250,247,245,0.55)',
          }}
        >
          Brand Mascot
          <br />
          Explorations
        </h1>
      </div>

      {/* date — small and quiet, bottom-left footer */}
      <div
        style={{
          position: 'absolute',
          left: MARGIN_L,
          bottom: 74,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          color: NAVY,
        }}
      >
        <span
          style={{
            width: 26,
            height: 1.5,
            background: PINK,
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontSize: 19,
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            opacity: 0.72,
          }}
        >
          June 2026
        </span>
      </div>
    </div>
  );
}

window.Cover = Cover;
