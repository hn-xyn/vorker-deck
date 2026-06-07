// stylefamily.jsx — "Style family" section (inserted before the Cartoon
// deep-dive). World-building framing: Soft 3D is the hero, but Vorker is a
// WORLD — the same character re-skinned across styles, like Mario or Pokémon.
// Supporting styles are purpose-built, not lesser. Same deck system; tiers are
// reach, not a quality ranking. Chrome pink #E6388F; lilac + cream surfaces.

const SF_W = 1920, SF_H = 1080;
const SF_PINK = '#E6388F', SF_SOFT = '#FDACEC', SF_LILAC = '#B7A6E8';
const SF_NAVY = '#1A1A40', SF_SLATE = '#6A6C92', SF_INK = '#3A3A55', SF_PAPER = '#FEFEFE';
const SF_MARGIN = 150;
const SF_SANS = "'Plus Jakarta Sans', sans-serif";
const SF_DISP = "'Bricolage Grotesque', sans-serif";
const SF_CARDSHADOW = '0 26px 70px -34px rgba(26,26,64,0.30), 0 5px 16px -10px rgba(26,26,64,0.10)';
const SF_FRAMESHADOW = '0 20px 50px -28px rgba(26,26,64,0.32), 0 4px 12px -8px rgba(26,26,64,0.10)';

// tier palettes — equal weight, differentiated by hue not hierarchy
const TIERS = {
  primary: { label: 'Primary · Hero', bg: '#F1ECFB', fg: '#4B3A9E', dot: SF_LILAC },
  secondary: { label: 'Secondary', bg: '#FCEAF4', fg: '#C32C76', dot: SF_PINK },
  tertiary: { label: 'Tertiary', bg: '#F2EEE4', fg: '#8A7350', dot: '#C4A86E' },
};

/* ── shared chrome ─────────────────────────────────────────────────────── */
function SfWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', SF_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', SF_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function SfEyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: SF_PINK }} />
      <span style={{ fontFamily: SF_SANS, fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: SF_PINK, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function SfFooter({ page }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: SF_MARGIN, bottom: 60 }}><SfWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: SF_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: SF_SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: SF_SLATE }}>
        <span>Style family</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: SF_PINK }} /><span style={{ color: SF_NAVY }}>{page}</span>
      </div>
    </React.Fragment>
  );
}

function SfSlide({ page, children }) {
  return (
    <div style={{ position: 'relative', width: SF_W, height: SF_H, overflow: 'hidden', background: SF_PAPER, fontFamily: SF_SANS }}>
      {children}
      <SfFooter page={page} />
    </div>
  );
}

function SfTier({ tier }) {
  const t = TIERS[tier];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.bg, color: t.fg, borderRadius: 999, padding: '6px 13px', fontFamily: SF_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dot }} />{t.label}
    </span>
  );
}

function SfFrame({ src, w, h }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(26,26,64,0.08)', boxShadow: SF_FRAMESHADOW, flexShrink: 0 }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
    </div>
  );
}

function SfCallout({ label, children, max = 1300 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
      <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: SF_PINK, flexShrink: 0 }} />
      <div>
        <div style={{ fontFamily: SF_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: SF_PINK, marginBottom: 8 }}>{label}</div>
        <p style={{ margin: 0, fontFamily: SF_DISP, fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: SF_NAVY, maxWidth: max, textWrap: 'pretty' }}>{children}</p>
      </div>
    </div>
  );
}

const STYLES = {
  soft3d: { src: 'assets/style_soft3d.png', name: 'Soft 3D', tier: 'primary' },
  cartoon: { src: 'assets/style_cartoon.png', name: 'Cartoon', tier: 'secondary' },
  blueprint: { src: 'assets/style_blueprint.png', name: 'Blueprint', tier: 'tertiary' },
  pixel: { src: 'assets/style_pixel.png', name: 'Pixel / Retro', tier: 'tertiary' },
};

/* ── 22 · Opener — the four-style proof grid ───────────────────────────── */
function SfGridCell({ s, w }) {
  const h = Math.round(w / 1.85);
  return (
    <div>
      <SfFrame src={s.src} w={w} h={h} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
        <span style={{ fontFamily: SF_DISP, fontWeight: 500, fontSize: 23, color: SF_NAVY, letterSpacing: '-0.012em' }}>{s.name}</span>
        <SfTier tier={s.tier} />
      </div>
    </div>
  );
}

function StyleFamilyOpener() {
  const cellW = 500;
  return (
    <SfSlide page="22">
      <div style={{ position: 'absolute', left: SF_MARGIN, top: 232, width: 500 }}>
        <SfEyebrow>Style family</SfEyebrow>
        <h1 style={{ margin: '26px 0 0', fontFamily: SF_DISP, fontWeight: 500, fontSize: 60, lineHeight: 1.0, letterSpacing: '-0.03em', color: SF_NAVY }}>One Vorker,<br />every style.</h1>
        <p style={{ margin: '32px 0 0', fontFamily: SF_SANS, fontSize: 20, lineHeight: 1.55, color: SF_INK, textWrap: 'pretty' }}>
          The same character, the same world &mdash; re-skinned across art styles, and unmistakably Vorker every time.
        </p>
        <p style={{ margin: '22px 0 0', fontFamily: SF_DISP, fontWeight: 400, fontSize: 21, lineHeight: 1.42, color: SF_NAVY, textWrap: 'pretty' }}>
          Like <span style={{ color: SF_PINK }}>Mario</span> or <span style={{ color: SF_PINK }}>Pok&eacute;mon</span>, the world gets re-drawn in new styles and stays instantly recognizable.
        </p>
      </div>

      {/* the proof — same scene, four renders */}
      <div style={{ position: 'absolute', left: 760, top: 196, display: 'grid', gridTemplateColumns: `${cellW}px ${cellW}px`, columnGap: 50, rowGap: 40 }}>
        <SfGridCell s={STYLES.soft3d} w={cellW} />
        <SfGridCell s={STYLES.cartoon} w={cellW} />
        <SfGridCell s={STYLES.blueprint} w={cellW} />
        <SfGridCell s={STYLES.pixel} w={cellW} />
      </div>
    </SfSlide>
  );
}

/* ── 23 · The hierarchy — when to use each ─────────────────────────────── */
function SfTierRow({ s, voice, uses, note }) {
  const tH = 132, tW = Math.round(tH * 1.85);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 30, padding: '20px 0', borderTop: '1px solid rgba(26,26,64,0.09)' }}>
      <SfFrame src={s.src} w={tW} h={tH} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: SF_DISP, fontWeight: 500, fontSize: 27, color: SF_NAVY, letterSpacing: '-0.014em' }}>{s.name}</span>
          <SfTier tier={s.tier} />
          <span style={{ fontFamily: SF_SANS, fontSize: 16.5, fontStyle: 'italic', color: SF_SLATE }}>{voice}</span>
          {note && <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: SF_SANS, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: SF_PINK, whiteSpace: 'nowrap' }}>{note} <span aria-hidden>&rarr;</span></span>}
        </div>
        <div style={{ marginTop: 9, fontFamily: SF_SANS, fontSize: 16.5, lineHeight: 1.4, color: SF_INK, textWrap: 'pretty' }}>{uses}</div>
      </div>
    </div>
  );
}

function StyleFamilyTiers() {
  return (
    <SfSlide page="23">
      <div style={{ position: 'absolute', left: SF_MARGIN, top: 92 }}><SfEyebrow>When to use each</SfEyebrow></div>
      <h1 style={{ position: 'absolute', left: SF_MARGIN, top: 130, margin: 0, fontFamily: SF_DISP, fontWeight: 500, fontSize: 50, lineHeight: 1.02, letterSpacing: '-0.026em', color: SF_NAVY }}>Four styles, four jobs.</h1>
      <p style={{ position: 'absolute', left: 800, top: 146, width: 820, margin: 0, fontFamily: SF_SANS, fontSize: 17.5, lineHeight: 1.55, color: SF_SLATE, textWrap: 'pretty' }}>
        Not a podium &mdash; equal citizens of one world. The tier is how broadly you reach for a style, not how good it is.
      </p>

      <div style={{ position: 'absolute', left: SF_MARGIN, right: SF_MARGIN, top: 268 }}>
        <SfTierRow s={STYLES.soft3d} voice="The default — richest expression of Vorker."
          uses="Marketing · key art · hero moments · launches & big reveals." />
        <SfTierRow s={STYLES.cartoon} voice="The strongest supporting style." note="Deep-dive next"
          uses="Stickers & emotes · social · small animations · in-app moments & reactions." />
        <SfTierRow s={STYLES.blueprint} voice="The technical, instructional voice."
          uses="How-it-works explainers · setup & integration guides · docs · “under the hood” · coming-soon teasers." />
        <SfTierRow s={STYLES.pixel} voice="The playful, game voice."
          uses="Gamification (badges, streaks, “unlocked”) · community emotes & merch · easter eggs (404s, loading) · nostalgic campaigns." />
      </div>
    </SfSlide>
  );
}

/* ── 24 · One governing rule + segue ───────────────────────────────────── */
function StyleFamilyRule() {
  const dna = ['Square TV head', 'Friendly eyes', 'Pink tie', 'V-cap', 'Same proportions'];
  const imgW = 720, imgH = Math.round(imgW / 1.85);
  return (
    <SfSlide page="24">
      <div style={{ position: 'absolute', left: SF_MARGIN, top: 150, width: 760 }}>
        <SfEyebrow>The one rule</SfEyebrow>
        <h1 style={{ margin: '24px 0 0', fontFamily: SF_DISP, fontWeight: 500, fontSize: 54, lineHeight: 1.02, letterSpacing: '-0.026em', color: SF_NAVY }}>Same DNA, different skin.</h1>
        <p style={{ margin: '26px 0 0', fontFamily: SF_SANS, fontSize: 19, lineHeight: 1.55, color: SF_SLATE, textWrap: 'pretty', maxWidth: 660 }}>
          Across every style, Vorker&rsquo;s character DNA stays constant. Only the rendering changes.
        </p>

        <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 11 }}>
          {dna.map((d) => (
            <span key={d} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#F6F3FC', border: '1px solid rgba(26,26,64,0.07)', borderRadius: 999, padding: '10px 17px', fontFamily: SF_SANS, fontSize: 16, fontWeight: 600, color: SF_NAVY, whiteSpace: 'nowrap' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: SF_LILAC }} />{d}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 34, paddingLeft: 22, borderLeft: `3px solid ${SF_PINK}` }}>
          <div style={{ fontFamily: SF_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: SF_PINK, marginBottom: 9 }}>Never mix</div>
          <p style={{ margin: 0, fontFamily: SF_DISP, fontWeight: 400, fontSize: 24, lineHeight: 1.36, color: SF_NAVY, maxWidth: 640, textWrap: 'pretty' }}>
            Never blend two styles in one composition. Pick the single style that fits the context &mdash; and commit to it.
          </p>
        </div>
      </div>

      {/* the constant — hero render */}
      <div style={{ position: 'absolute', top: 196, left: 1020, width: imgW }}>
        <SfFrame src={STYLES.soft3d.src} w={imgW} h={imgH} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: SF_PINK }} />
          <span style={{ fontFamily: SF_SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: SF_SLATE, whiteSpace: 'nowrap' }}>Soft 3D · the constant</span>
        </div>
      </div>

      <div style={{ position: 'absolute', left: SF_MARGIN, right: SF_MARGIN, bottom: 116 }}>
        <SfCallout label="Up next">
          The strongest of these supporting styles is the cartoon &mdash; <span style={{ color: SF_PINK }}>here&rsquo;s why.</span>
        </SfCallout>
      </div>
    </SfSlide>
  );
}

window.StyleFamilyOpener = StyleFamilyOpener;
window.StyleFamilyTiers = StyleFamilyTiers;
window.StyleFamilyRule = StyleFamilyRule;
