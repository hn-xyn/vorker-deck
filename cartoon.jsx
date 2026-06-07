// cartoon.jsx — "Cartoon Vorker" section (slides 22–25).
// Introduces the cartoon style as the official, recommended SECONDARY style
// (3D render stays primary). Same system; white ground so the cartoon art —
// which sits on pure white — blends seamlessly. Sets up the next section
// (supporting / tertiary illustration styles).

const CB_W = 1920, CB_H = 1080;
const CB_PINK = '#E6388F', CB_SOFT = '#FDACEC', CB_LILAC = '#B7A6E8';
const CB_NAVY = '#1A1A40', CB_SLATE = '#6A6C92', CB_INK = '#3A3A55', CB_PAPER = '#FFFFFF';
const CB_MARGIN = 150;
const CB_BASE = 858; // shared ground line for standing figures
const CB_SANS = "'Plus Jakarta Sans', sans-serif";
const CB_DISP = "'Bricolage Grotesque', sans-serif";
const CB_CARDSHADOW = '0 26px 70px -34px rgba(26,26,64,0.30), 0 5px 16px -10px rgba(26,26,64,0.10)';

function CbWordmark({ height = 22 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('assets/wordmark_1.svg').then((r) => r.text()).then((txt) => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = txt;
      const svg = ref.current.querySelector('svg'); if (!svg) return;
      svg.style.height = height + 'px'; svg.style.width = 'auto'; svg.style.display = 'block';
      const paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach((p) => p.setAttribute('fill', CB_SLATE));
      const vb = (svg.getAttribute('viewBox') || '0 0 1 1').split(/\s+/).map(Number);
      const vbArea = (vb[2] || 1) * (vb[3] || 1);
      let period = null, bestX = -Infinity;
      paths.forEach((p) => { let b; try { b = p.getBBox(); } catch (e) { return; }
        if (!b || !b.width || !b.height) return;
        const a = b.width / b.height;
        if (a > 0.6 && a < 1.6 && (b.width * b.height) / vbArea < 0.02 && b.x > bestX) { bestX = b.x; period = p; } });
      if (period) period.setAttribute('fill', CB_PINK);
    });
    return () => { alive = false; };
  }, [height]);
  return <span ref={ref} style={{ display: 'block', height }} />;
}

function CbEyebrow({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 22, height: 2, background: CB_PINK }} />
      <span style={{ fontFamily: CB_SANS, fontSize: 15, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: CB_PINK, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

function CbFooter({ page }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: CB_MARGIN, bottom: 60 }}><CbWordmark height={22} /></div>
      <div style={{ position: 'absolute', right: CB_MARGIN, bottom: 58, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: CB_SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: CB_SLATE }}>
        <span>Cartoon Vorker</span><span style={{ width: 4, height: 4, borderRadius: '50%', background: CB_PINK }} /><span style={{ color: CB_NAVY }}>{page}</span>
      </div>
    </React.Fragment>
  );
}

function CbSlide({ page, children }) {
  return (
    <div style={{ position: 'relative', width: CB_W, height: CB_H, overflow: 'hidden', background: CB_PAPER, fontFamily: CB_SANS }}>
      {children}
      <CbFooter page={page} />
    </div>
  );
}

// little "No. 2 / secondary" tag
function SecondaryTag() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#FCEAF4', borderRadius: 999, padding: '7px 15px 7px 11px' }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: CB_PINK, color: '#fff', fontFamily: CB_DISP, fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
      <span style={{ fontFamily: CB_SANS, fontSize: 13.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C32C76', whiteSpace: 'nowrap' }}>Secondary style</span>
    </span>
  );
}

function CbLabel({ children, color = CB_SLATE }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: CB_PINK }} />
      <span style={{ fontFamily: CB_SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

// ── 22 · Meet cartoon Vorker ───────────────────────────────────────────────
function CartoonMeet() {
  const heroH = 712, heroAR = 466 / 702, heroW = heroH * heroAR;
  const useCases = ['Small animations', 'Stickers & emotes', 'Social media'];
  return (
    <CbSlide page="25">
      <div style={{ position: 'absolute', left: CB_MARGIN, top: 196, width: 660 }}>
        <CbEyebrow>Secondary character style</CbEyebrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, margin: '26px 0 0' }}>
          <h1 style={{ margin: 0, fontFamily: CB_DISP, fontWeight: 500, fontSize: 62, lineHeight: 1.0, letterSpacing: '-0.028em', color: CB_NAVY }}>Meet cartoon Vorker</h1>
        </div>
        <div style={{ marginTop: 22 }}><SecondaryTag /></div>

        <p style={{ margin: '34px 0 0', fontFamily: CB_SANS, fontSize: 20, lineHeight: 1.55, color: CB_INK, textWrap: 'pretty' }}>
          The cartoon version of Vorker &mdash; the same character, drawn looser and more playful.
        </p>
        <p style={{ margin: '16px 0 0', fontFamily: CB_SANS, fontSize: 20, lineHeight: 1.55, color: CB_SLATE, textWrap: 'pretty' }}>
          It&rsquo;s there for the moments the 3D style doesn&rsquo;t translate &mdash; staying crisp, friendly, and full of personality at small sizes.
        </p>

        <div style={{ marginTop: 34, fontFamily: CB_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: CB_SLATE, marginBottom: 14 }}>Where you might explore it</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {useCases.map((u) => (
            <span key={u} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#F6F3FC', border: '1px solid rgba(26,26,64,0.07)', borderRadius: 999, padding: '11px 18px', fontFamily: CB_SANS, fontSize: 16.5, fontWeight: 600, color: CB_NAVY, whiteSpace: 'nowrap' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: CB_PINK }} />{u}
            </span>
          ))}
        </div>

        <p style={{ margin: '40px 0 0', fontFamily: CB_DISP, fontWeight: 400, fontSize: 19, lineHeight: 1.4, color: CB_NAVY }}>
          The 3D render stays our hero. Cartoon Vorker isn&rsquo;t here to replace it &mdash; it&rsquo;s a <span style={{ color: CB_PINK }}>recognizable, friendly alternative</span> worth exploring where the 3D style doesn&rsquo;t fit.
        </p>
      </div>

      {/* hero neutral pose on the ground line */}
      <div style={{ position: 'absolute', top: CB_BASE - heroH, left: 1370, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <img src="assets/cv_neutral.png" alt="" style={{ height: heroH, width: heroW, display: 'block' }} />
        <CbLabel>Default pose</CbLabel>
      </div>
    </CbSlide>
  );
}

// ── 23 · Expression range ──────────────────────────────────────────────────
function CartoonExpressions() {
  const H = 286;
  const poses = [
    { src: 'assets/cv_happy.png', ar: 297 / 366, label: 'Happy · celebrating' },
    { src: 'assets/cv_thinking.png', ar: 318 / 381, label: 'Thinking' },
    { src: 'assets/cv_surprised.png', ar: 263 / 346, label: 'Surprised' },
    { src: 'assets/cv_tired.png', ar: 264 / 298, label: 'Tired' },
    { src: 'assets/cv_angry.png', ar: 248 / 338, label: 'Frustrated' },
  ];
  return (
    <CbSlide page="26">
      <div style={{ position: 'absolute', left: CB_MARGIN, top: 96 }}><CbEyebrow>Expression range</CbEyebrow></div>
      <h1 style={{ position: 'absolute', left: CB_MARGIN, top: 134, margin: 0, fontFamily: CB_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: CB_NAVY }}>Built for personality.</h1>
      <p style={{ position: 'absolute', left: 880, top: 150, width: 760, margin: 0, fontFamily: CB_SANS, fontSize: 18, lineHeight: 1.55, color: CB_SLATE, textWrap: 'pretty' }}>Looser lines make big feelings easy &mdash; ideal for reactions, stickers, and animated moments where the 3D render feels too heavy.</p>

      {/* poses row, feet aligned to a ground line */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 54, height: H }}>
        {poses.map((p) => (
          <div key={p.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <img src={p.src} alt="" style={{ height: H, width: H * p.ar, display: 'block', objectFit: 'contain' }} />
            <CbLabel>{p.label}</CbLabel>
          </div>
        ))}
      </div>
    </CbSlide>
  );
}

// ── 24 · App integrations (extensible grid) ────────────────────────────────
function CbAppTile({ src, name, use }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, background: '#FFFFFF', border: '1px solid rgba(26,26,64,0.07)', borderRadius: 20, boxShadow: CB_CARDSHADOW, padding: 18, height: 156 }}>
      <div style={{ width: 184, height: 120, flexShrink: 0, borderRadius: 12, background: '#FBFAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={src} alt="" style={{ maxWidth: '92%', maxHeight: '92%', width: 'auto', height: 'auto', display: 'block' }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: CB_DISP, fontWeight: 500, fontSize: 22, color: CB_NAVY, lineHeight: 1.1 }}>{name}</div>
        <div style={{ fontFamily: CB_SANS, fontSize: 15.5, lineHeight: 1.42, color: CB_INK, marginTop: 6, textWrap: 'pretty' }}>{use}</div>
      </div>
    </div>
  );
}

function CbSoonTile({ name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderRadius: 20, border: '2px dashed rgba(26,26,64,0.16)', padding: 18, height: 156 }}>
      <div style={{ width: 184, height: 120, flexShrink: 0, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(26,26,64,0.22)', fontSize: 46, fontFamily: CB_DISP, fontWeight: 300 }}>+</div>
      <div>
        <div style={{ fontFamily: CB_DISP, fontWeight: 500, fontSize: 21, color: 'rgba(26,26,64,0.5)', lineHeight: 1.1 }}>{name}</div>
        <div style={{ fontFamily: CB_SANS, fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CB_LILAC, marginTop: 8 }}>Coming soon</div>
      </div>
    </div>
  );
}

function CartoonApps() {
  const tiles = [
    { src: 'assets/cv_app_github.png', name: 'GitHub', use: 'Code & pull requests' },
    { src: 'assets/cv_app_salesforce.png', name: 'Salesforce', use: 'CRM & dashboards' },
    { src: 'assets/cv_app_asana.png', name: 'Asana', use: 'Tasks & boards' },
    { src: 'assets/cv_app_zoom.png', name: 'Zoom', use: 'Meetings & calls' },
    { src: 'assets/cv_app_notion.png', name: 'Notion', use: 'Docs & wikis' },
    { src: 'assets/cv_app_slack.png', name: 'Slack', use: 'Chat & messaging' },
  ];
  const soon = ['Google Workspace', 'Figma', 'Stripe'];
  return (
    <CbSlide page="27">
      <div style={{ position: 'absolute', left: CB_MARGIN, top: 96 }}><CbEyebrow>Exploration</CbEyebrow></div>
      <h1 style={{ position: 'absolute', left: CB_MARGIN, top: 134, margin: 0, fontFamily: CB_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: CB_NAVY }}>Around your tools.</h1>
      <p style={{ position: 'absolute', left: 880, top: 150, width: 780, margin: 0, fontFamily: CB_SANS, fontSize: 18, lineHeight: 1.55, color: CB_SLATE, textWrap: 'pretty' }}>Early explorations of how cartoon Vorker could show up across everyday tools &mdash; directions to test, not rules. The exact in-product treatment is still TBD.</p>

      <div style={{ position: 'absolute', left: CB_MARGIN, top: 312, width: CB_W - 2 * CB_MARGIN, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
        {tiles.map((t) => <CbAppTile key={t.name} {...t} />)}
        {soon.map((s) => <CbSoonTile key={s} name={s} />)}
      </div>
    </CbSlide>
  );
}

// ── 25 · When to use which + handoff ───────────────────────────────────────
function CbStyleCard({ tagText, tagColor, tagBg, src, srcContain, title, uses, primary }) {
  return (
    <div style={{ flex: 1, borderRadius: 26, background: '#FFFFFF', border: '1px solid rgba(26,26,64,0.07)', boxShadow: CB_CARDSHADOW, padding: '34px 38px 38px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: CB_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: tagColor, background: tagBg, borderRadius: 999, padding: '7px 14px', whiteSpace: 'nowrap' }}>{tagText}</span>
      </div>
      <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0 6px' }}>
        <img src={src} alt="" style={{ maxHeight: 250, maxWidth: '70%', width: 'auto', height: 'auto', display: 'block', objectFit: 'contain' }} />
      </div>
      <h2 style={{ margin: '0 0 16px', fontFamily: CB_DISP, fontWeight: 500, fontSize: 30, color: CB_NAVY, letterSpacing: '-0.02em' }}>{title}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {uses.map((u) => (
          <span key={u} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: primary ? '#F1ECFB' : '#FCEAF4', borderRadius: 999, padding: '9px 15px', fontFamily: CB_SANS, fontSize: 15.5, fontWeight: 600, color: CB_NAVY, whiteSpace: 'nowrap' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: primary ? CB_LILAC : CB_PINK }} />{u}
          </span>
        ))}
      </div>
    </div>
  );
}

function CartoonWhich() {
  return (
    <CbSlide page="28">
      <div style={{ position: 'absolute', left: CB_MARGIN, top: 96 }}><CbEyebrow>Two styles, two jobs</CbEyebrow></div>
      <h1 style={{ position: 'absolute', left: CB_MARGIN, top: 134, margin: 0, fontFamily: CB_DISP, fontWeight: 500, fontSize: 52, lineHeight: 1.02, letterSpacing: '-0.026em', color: CB_NAVY }}>When to use which.</h1>

      <div style={{ position: 'absolute', left: CB_MARGIN, right: CB_MARGIN, top: 280, display: 'flex', gap: 40 }}>
        <CbStyleCard primary tagText="Primary · No. 1" tagColor="#4B3A9E" tagBg="#F1ECFB" src="assets/mascot_3d_onwhite.png" title="3D render"
          uses={['Hero & key art', 'Marketing', 'Launches', 'Big moments']} />
        <CbStyleCard tagText="Secondary · No. 2" tagColor="#C32C76" tagBg="#FCEAF4" src="assets/cv_neutral.png" title="Cartoon"
          uses={['Animation', 'Stickers & emotes', 'Social', 'In-app & reactions']} />
      </div>

      {/* handoff to next section */}
      <div style={{ position: 'absolute', left: CB_MARGIN, right: CB_MARGIN, bottom: 116, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: CB_PINK }} />
        <div>
          <div style={{ fontFamily: CB_SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: CB_PINK, marginBottom: 7 }}>Up next</div>
          <p style={{ margin: 0, fontFamily: CB_DISP, fontWeight: 400, fontSize: 22, lineHeight: 1.38, color: CB_NAVY, maxWidth: 1280, textWrap: 'pretty' }}>With the styles set, the fun part &mdash; bringing Vorker to life with small, looping animations.</p>
        </div>
      </div>
    </CbSlide>
  );
}

window.CartoonMeet = CartoonMeet;
window.CartoonExpressions = CartoonExpressions;
window.CartoonApps = CartoonApps;
window.CartoonWhich = CartoonWhich;
