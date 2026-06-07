// prompts.jsx — "Prompts: tips & tricks" section (7 slides).
// Teaches prompting ChatGPT Images for on-brand Vorker — and embodies the
// lesson: lots of breathing room, one idea per slide, soft and clean.
// Final deck position: BEFORE iteration → pages 13–19.

const PR_W = 1920, PR_H = 1080;
const PR_PINK = '#E6388F', PR_SOFTPINK = '#FDACEC', PR_LILAC = '#B7A6E8';
const PR_NAVY = '#1A1A40', PR_SLATE = '#6A6C92', PR_INK = '#3A3A55', PR_PAPER = '#FEFEFE';
const PR_MARGIN = 150;
const PR_SHADOW = '0 32px 84px -34px rgba(26,26,64,0.34), 0 6px 18px -10px rgba(26,26,64,0.12)';
const PR_SANS = "'Plus Jakarta Sans', sans-serif";
const PR_DISP = "'Bricolage Grotesque', sans-serif";

function PrWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', PR_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', PR_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function PrEyebrow({ children, color = PR_PINK }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: color }} />
      <span style={{ fontFamily: PR_SANS, fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function PrFooter({ page }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: PR_MARGIN, bottom: 60 }}><PrWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: PR_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: PR_SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: PR_SLATE }}>
        <span>Prompts</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: PR_PINK }} /><span style={{ color: PR_NAVY }}>{page}</span>
      </div>
    </React.Fragment>
  );
}

function PrSlide({ page, children, bg = PR_PAPER }) {
  return (
    <div style={{ position: 'relative', width: PR_W, height: PR_H, overflow: 'hidden', background: bg, fontFamily: PR_SANS }}>
      {children}
      <PrFooter page={page} />
    </div>
  );
}

// ── 13 · Title ─────────────────────────────────────────────────────────────
function PromptsTitle() {
  return (
    <PrSlide page="13">
      {/* vibe image, full-bleed right with a soft seam into the paper */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: 930, height: PR_H }}>
        <img src="assets/prompt_vibe.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, ' + PR_PAPER + ' 0%, rgba(254,254,254,0.55) 14%, rgba(254,254,254,0) 30%)' }} />
      </div>
      {/* text */}
      <div style={{ position: 'absolute', left: PR_MARGIN, top: 300, width: 760 }}>
        <PrEyebrow>Working with AI images</PrEyebrow>
        <h1 style={{ margin: '26px 0 0', fontFamily: PR_DISP, fontWeight: 500, fontSize: 92, lineHeight: 0.98, letterSpacing: '-0.03em', color: PR_NAVY }}>Prompts:<br />tips &amp; tricks.</h1>
        <p style={{ margin: '26px 0 0', fontFamily: PR_SANS, fontSize: 23, lineHeight: 1.5, color: PR_SLATE }}>Getting on-brand Vorker out of ChatGPT.</p>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 18, marginTop: 54 }}>
          <span style={{ width: 3, borderRadius: 2, background: PR_PINK }} />
          <p style={{ margin: 0, fontFamily: PR_DISP, fontWeight: 400, fontSize: 27, lineHeight: 1.34, color: PR_NAVY, maxWidth: 620 }}>
            Words tell it what you want.<br /><span style={{ color: PR_PINK }}>References tell it what&rsquo;s true.</span>
          </p>
        </div>
      </div>
    </PrSlide>
  );
}

// ── 14 · The one rule: two references ──────────────────────────────────────
function PrRefCard({ label, sub, children, w }) {
  return (
    <div style={{ width: w, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontFamily: PR_SANS, fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: PR_PINK, whiteSpace: 'nowrap' }}>{label}</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(26,26,64,0.12)' }} />
      </div>
      {children}
      <p style={{ margin: '20px 0 0', fontFamily: PR_SANS, fontSize: 16.5, lineHeight: 1.45, color: PR_INK, textWrap: 'pretty' }}>{sub}</p>
    </div>
  );
}

function PromptsTwoRefs() {
  const H = 486;
  const mascotW = 372, vibeW = 760, gutter = 58;
  const groupW = mascotW + vibeW + gutter;
  return (
    <PrSlide page="14">
      <div style={{ position: 'absolute', left: PR_MARGIN, top: 96 }}><PrEyebrow>The one rule</PrEyebrow></div>
      <h1 style={{ position: 'absolute', left: PR_MARGIN, top: 134, width: 620, margin: 0, fontFamily: PR_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: PR_NAVY }}>Bring two references &mdash; every time.</h1>
      <p style={{ position: 'absolute', left: 880, top: 150, width: 740, margin: 0, fontFamily: PR_SANS, fontSize: 18, lineHeight: 1.55, color: PR_SLATE, textWrap: 'pretty' }}>One reference is a guess. Two is a spec: one locks <em style={{ fontStyle: 'italic', color: PR_NAVY }}>who he is</em>, the other locks <em style={{ fontStyle: 'italic', color: PR_NAVY }}>how it feels</em>.</p>

      <div style={{ position: 'absolute', left: (PR_W - groupW) / 2, top: 332, display: 'flex', gap: gutter, alignItems: 'flex-start' }}>
        <PrRefCard w={mascotW} label="1 · Proportions" sub="The on-model render — square TV head, lilac headphones, pink tie, bobblehead ratio.">
          <div style={{ width: mascotW, height: H, borderRadius: 24, overflow: 'hidden', boxShadow: PR_SHADOW, background: '#F7F6F7' }}>
            <img src="assets/prompt_mascot.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
        </PrRefCard>
        <PrRefCard w={vibeW} label="2 · Style" sub="Mood, palette, and light — the world he lives in.">
          <div style={{ width: vibeW, height: H, borderRadius: 24, overflow: 'hidden', boxShadow: PR_SHADOW }}>
            <img src="assets/prompt_vibe.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </PrRefCard>
      </div>
    </PrSlide>
  );
}

// ── 15 · Don't play telephone ──────────────────────────────────────────────
function PromptsTelephone() {
  const frames = [
    { f: 'none', t: 'none', tag: 'Original', ok: true },
    { f: 'hue-rotate(-14deg) saturate(0.95)', t: 'scale(0.975)', tag: 'Round 2' },
    { f: 'hue-rotate(-30deg) saturate(0.86) brightness(1.03)', t: 'scale(0.95)', tag: 'Round 3' },
    { f: 'hue-rotate(-46deg) saturate(0.74) brightness(1.06) blur(0.5px)', t: 'scale(0.92)', tag: 'Round 4', drift: true },
  ];
  const fw = 158, fh = 214;
  return (
    <PrSlide page="15">
      <div style={{ position: 'absolute', left: PR_MARGIN, top: 96 }}><PrEyebrow>The trap</PrEyebrow></div>
      <h1 style={{ position: 'absolute', left: PR_MARGIN, top: 134, width: 640, margin: 0, fontFamily: PR_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: PR_NAVY }}>Don&rsquo;t play telephone.</h1>
      <p style={{ position: 'absolute', left: 880, top: 150, width: 740, margin: 0, fontFamily: PR_SANS, fontSize: 18, lineHeight: 1.55, color: PR_SLATE, textWrap: 'pretty' }}>Iterate off the model&rsquo;s own last output and it drifts &mdash; the head shrinks, the tie creeps toward the wrong pink.</p>

      {/* drift strip */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 322, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
        {frames.map((fr, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ position: 'relative', width: fw, height: fh, borderRadius: 18, overflow: 'hidden', background: '#F7F6F7', boxShadow: PR_SHADOW, border: fr.ok ? '3px solid rgba(31,158,91,0.45)' : (fr.drift ? '3px solid rgba(224,70,62,0.5)' : '3px solid rgba(26,26,64,0.06)') }}>
                <img src="assets/prompt_mascot.jpg" alt="" style={{ height: '100%', width: '100%', objectFit: 'contain', display: 'block', filter: fr.f, transform: fr.t }} />
                <span style={{ position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: '50%', background: fr.ok ? '#1F9E5B' : (fr.drift ? '#E0463E' : 'transparent'), color: '#fff', display: fr.ok || fr.drift ? 'inline-flex' : 'none', alignItems: 'center', justifyContent: 'center', fontSize: fr.ok ? 14 : 12, fontWeight: 700 }}>{fr.ok ? '\u2713' : '\u2715'}</span>
              </div>
              <span style={{ fontFamily: PR_SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: fr.drift ? '#E0463E' : (fr.ok ? '#1F9E5B' : PR_SLATE) }}>{fr.tag}</span>
            </div>
            {i < frames.length - 1 && <span style={{ fontFamily: PR_SANS, fontSize: 26, color: PR_LILAC, marginBottom: 26 }}>&rarr;</span>}
          </React.Fragment>
        ))}
      </div>

      {/* fix + caveat */}
      <div style={{ position: 'absolute', left: PR_MARGIN, right: PR_MARGIN, top: 690, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: PR_PINK, flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: PR_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: PR_PINK, marginBottom: 8 }}>The fix</div>
          <p style={{ margin: 0, fontFamily: PR_DISP, fontWeight: 400, fontSize: 24, lineHeight: 1.36, color: PR_NAVY, maxWidth: 1180, textWrap: 'pretty' }}>Re-attach the <strong style={{ fontWeight: 600 }}>original</strong> references every round. Build from the source, not the last frame.</p>
          <p style={{ margin: '14px 0 0', fontFamily: PR_SANS, fontSize: 16, lineHeight: 1.5, color: PR_SLATE, maxWidth: 1100 }}>Even with character-consistency mode on, expect subtle drift &mdash; re-feed anyway.</p>
        </div>
      </div>
    </PrSlide>
  );
}

// ── 16 · Anatomy of a good prompt ──────────────────────────────────────────
function PrAnatomyItem({ n, label, gloss }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '58px 1fr', columnGap: 22, alignItems: 'start' }}>
      <span style={{ fontFamily: PR_DISP, fontWeight: 500, fontSize: 34, lineHeight: 1, color: PR_PINK }}>{n}</span>
      <div>
        <div style={{ fontFamily: PR_SANS, fontSize: 21, fontWeight: 700, color: PR_NAVY, marginBottom: 5 }}>{label}</div>
        <div style={{ fontFamily: PR_SANS, fontSize: 16.5, lineHeight: 1.46, color: PR_INK, textWrap: 'pretty' }}>{gloss}</div>
      </div>
    </div>
  );
}

function PromptsAnatomy() {
  const tints = ['#FCEAF4', '#F1ECFB', '#FEF1E9', '#EAF3FB'];
  const tintText = ['#C32C76', '#6B53B8', '#C2701E', '#2F6FA8'];
  const lines = [
    'Vorker, the white TV-headed mascot — square head, lilac headphones, pink tie.',
    'sitting cross-legged, reading a little book, calm and curious.',
    'matte 3D toy render, soft pastel palette, warm golden-hour light. Match Image 2.',
    '16:9 · single focal point · tie #fdacec · avoid clutter & extra characters.',
  ];
  return (
    <PrSlide page="16">
      <div style={{ position: 'absolute', left: PR_MARGIN, top: 96 }}><PrEyebrow>Structure</PrEyebrow></div>
      <h1 style={{ position: 'absolute', left: PR_MARGIN, top: 134, margin: 0, fontFamily: PR_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: PR_NAVY }}>Anatomy of a good prompt.</h1>

      <div style={{ position: 'absolute', left: PR_MARGIN, top: 300, width: 690, display: 'flex', flexDirection: 'column', gap: 34 }}>
        <PrAnatomyItem n="1" label="Lock the character" gloss="Name him in words, not just the picture — the model reads both." />
        <PrAnatomyItem n="2" label="Say what he’s doing" gloss="One clear action and mood. Keep it to a single beat." />
        <PrAnatomyItem n="3" label="Set the style" gloss="Point straight at the vibe ref — “match Image 2.”" />
        <PrAnatomyItem n="4" label="Give constraints" gloss="Aspect ratio, exact palette, and what to avoid." />
      </div>

      {/* assembled example, colour-tagged to the four parts */}
      <div style={{ position: 'absolute', left: 940, top: 300, width: 830, borderRadius: 26, background: '#FFFFFF', boxShadow: PR_SHADOW, border: '1px solid rgba(26,26,64,0.06)', padding: '34px 36px' }}>
        <div style={{ fontFamily: PR_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: PR_SLATE, marginBottom: 22 }}>One assembled prompt</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 8, background: tints[i], color: tintText[i], fontFamily: PR_SANS, fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ fontFamily: PR_SANS, fontSize: 16.5, lineHeight: 1.5, color: PR_INK }}>{ln}</span>
            </div>
          ))}
        </div>
      </div>
    </PrSlide>
  );
}

// ── 17 · Compose for breathing room ────────────────────────────────────────
function PromptsBreathing() {
  const imgX = PR_MARGIN, imgY = 286, imgW = 1620, imgH = 612;
  return (
    <PrSlide page="17">
      <div style={{ position: 'absolute', left: PR_MARGIN, top: 96 }}><PrEyebrow>Composition</PrEyebrow></div>
      <h1 style={{ position: 'absolute', left: PR_MARGIN, top: 134, margin: 0, fontFamily: PR_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: PR_NAVY }}>Compose for breathing room.</h1>
      <p style={{ position: 'absolute', left: 880, top: 150, width: 740, margin: 0, fontFamily: PR_SANS, fontSize: 18, lineHeight: 1.55, color: PR_SLATE, textWrap: 'pretty' }}>One clear subject, an uncluttered background. Ask for open space and the model declutters to give it to you.</p>

      <div style={{ position: 'absolute', left: imgX, top: imgY, width: imgW, height: imgH, borderRadius: 26, overflow: 'hidden', boxShadow: PR_SHADOW }}>
        <img src="assets/prompt_vibe.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {/* headline-space annotation over the open left */}
        <div style={{ position: 'absolute', left: 54, top: 70, width: 560, height: imgH - 200, border: '2px dashed rgba(230,56,143,0.55)', borderRadius: 18, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px' }}>
          <div style={{ fontFamily: PR_DISP, fontWeight: 500, fontSize: 46, lineHeight: 1.05, color: 'rgba(26,26,64,0.30)' }}>Your headline<br />lives here.</div>
        </div>
        <div style={{ position: 'absolute', left: 54, top: 36, fontFamily: PR_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: PR_PINK, background: 'rgba(255,255,255,0.85)', padding: '5px 12px', borderRadius: 999 }}>Open space &mdash; on purpose</div>
      </div>
    </PrSlide>
  );
}

// ── 18 · Dialing it in ─────────────────────────────────────────────────────
function PrTipCard({ head, gloss, swatch }) {
  return (
    <div style={{ borderRadius: 22, background: '#FFFFFF', boxShadow: PR_SHADOW, border: '1px solid rgba(26,26,64,0.06)', padding: '30px 32px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 188 }}>
      <div style={{ fontFamily: PR_DISP, fontWeight: 500, fontSize: 25, lineHeight: 1.1, color: PR_NAVY }}>{head}</div>
      <div style={{ fontFamily: PR_SANS, fontSize: 17, lineHeight: 1.5, color: PR_INK, textWrap: 'pretty' }}>{gloss}</div>
      {swatch && (
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 26, height: 26, borderRadius: 7, background: PR_SOFTPINK, border: '1px solid rgba(26,26,64,0.10)' }} />
          <span style={{ fontFamily: PR_SANS, fontSize: 16, fontWeight: 600, color: PR_NAVY, letterSpacing: '0.02em' }}>tie = #fdacec</span>
        </div>
      )}
    </div>
  );
}

function PromptsDialing() {
  return (
    <PrSlide page="18">
      <div style={{ position: 'absolute', left: PR_MARGIN, top: 96 }}><PrEyebrow>Refining</PrEyebrow></div>
      <h1 style={{ position: 'absolute', left: PR_MARGIN, top: 134, margin: 0, fontFamily: PR_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: PR_NAVY }}>Dialing it in.</h1>

      <div style={{ position: 'absolute', left: PR_MARGIN, top: 296, width: PR_W - 2 * PR_MARGIN, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
        <PrTipCard head="Change one thing at a time" gloss="So you always know what actually moved the result." />
        <PrTipCard head="Edit, don’t regenerate" gloss="At ~90%, make targeted edits instead of rolling the dice again." />
        <PrTipCard head="Pin colors with hex" gloss="Name exact values so the brand pink never drifts." swatch />
        <PrTipCard head="Save your keepers" gloss="A frame you love becomes the next reference. Lock in progress." />
      </div>
    </PrSlide>
  );
}

// ── 19 · Worked example (ChatGPT-style chat) ───────────────────────────────
function PrThumb({ src, tag, contain }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
      <div style={{ width: 96, height: 72, borderRadius: 12, overflow: 'hidden', background: '#F7F6F7', border: '1px solid rgba(26,26,64,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: contain ? 'contain' : 'cover', display: 'block' }} />
      </div>
      <span style={{ fontFamily: PR_SANS, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: PR_SLATE, whiteSpace: 'nowrap' }}>{tag}</span>
    </div>
  );
}

function PromptsExample() {
  const brief = 'Generate Vorker sitting cross-legged on a soft cloud, reading a little book — calm and curious. Style: matte 3D toy render, soft pastel palette, warm golden-hour light — match Image 2. Composition: 16:9, simple uncluttered background, single focal point, open space on the left for a headline. Colors: tie = #fdacec. Avoid clutter, busy patterns, extra characters.';
  return (
    <PrSlide page="19">
      <div style={{ position: 'absolute', left: PR_MARGIN, top: 84 }}><PrEyebrow>Worked example</PrEyebrow></div>
      <h1 style={{ position: 'absolute', left: PR_MARGIN, top: 120, margin: 0, fontFamily: PR_DISP, fontWeight: 500, fontSize: 38, lineHeight: 1.02, letterSpacing: '-0.022em', color: PR_NAVY }}>Two references in, one prompt.</h1>

      {/* chat thread */}
      <div style={{ position: 'absolute', left: '50%', top: 210, transform: 'translateX(-50%)', width: 1360, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* user: refs + brief */}
        <div style={{ alignSelf: 'flex-end', maxWidth: 980, background: '#F3ECFB', borderRadius: '22px 22px 6px 22px', padding: '22px 26px', boxShadow: '0 10px 30px -16px rgba(26,26,64,0.30)' }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <PrThumb src="assets/prompt_mascot.jpg" tag="Image 1" contain />
            <PrThumb src="assets/prompt_vibe.png" tag="Image 2" />
          </div>
          <p style={{ margin: 0, fontFamily: PR_SANS, fontSize: 15.5, lineHeight: 1.55, color: PR_INK }}><strong style={{ fontWeight: 700, color: PR_NAVY }}>Two references attached.</strong> Image 1 = his proportions, keep him exactly on-model. Image 2 = the style, mood, palette and light to match. {brief}</p>
        </div>

        {/* assistant: result */}
        <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 14, alignItems: 'flex-start', maxWidth: 740 }}>
          <span style={{ width: 34, height: 34, borderRadius: 9, background: PR_NAVY, color: '#fff', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: PR_DISP, fontWeight: 600, fontSize: 15 }}>AI</span>
          <div style={{ background: '#FFFFFF', borderRadius: '6px 22px 22px 22px', padding: 12, boxShadow: PR_SHADOW, border: '1px solid rgba(26,26,64,0.06)' }}>
            <div style={{ width: 560, height: 315, borderRadius: 14, overflow: 'hidden' }}>
              <img src="assets/prompt_vibe.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ fontFamily: PR_SANS, fontSize: 14, color: PR_SLATE, padding: '11px 6px 3px' }}>On-model, on-vibe — open space on the left, ready for a headline.</div>
          </div>
        </div>

        {/* user: targeted edit */}
        <div style={{ alignSelf: 'flex-end', maxWidth: 760, background: '#F3ECFB', borderRadius: '22px 22px 6px 22px', padding: '16px 24px', boxShadow: '0 10px 30px -16px rgba(26,26,64,0.30)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontFamily: PR_SANS, fontSize: 15.5, lineHeight: 1.5, color: PR_INK }}>Perfect. Keep everything identical &mdash; just make the tie exactly</p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', borderRadius: 999, padding: '5px 11px', flexShrink: 0 }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, background: PR_SOFTPINK, border: '1px solid rgba(26,26,64,0.12)' }} />
            <span style={{ fontFamily: PR_SANS, fontSize: 14.5, fontWeight: 600, color: PR_NAVY }}>#fdacec</span>
          </span>
        </div>
      </div>
    </PrSlide>
  );
}

window.PromptsTitle = PromptsTitle;
window.PromptsTwoRefs = PromptsTwoRefs;
window.PromptsTelephone = PromptsTelephone;
window.PromptsAnatomy = PromptsAnatomy;
window.PromptsBreathing = PromptsBreathing;
window.PromptsDialing = PromptsDialing;
window.PromptsExample = PromptsExample;
