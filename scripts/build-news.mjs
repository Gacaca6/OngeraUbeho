/**
 * Builds the News section from the markdown files in content/posts/.
 *
 * Reads every .md file, sorts newest first, then writes:
 *   website/news.html                 — the list of all stories
 *   website/news/<slug>.html          — one page per story
 *
 * Run locally with:  npm run build
 * Vercel runs it automatically on every deploy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const WEB = path.join(ROOT, 'website');
const SITE = 'https://ongeraubeho.rw';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

/** Always YYYY-MM-DD — YAML turns a bare date into a JS Date, which would
 *  otherwise render as "Fri Sep 11 2026 02:00:00 GMT+0200" in datetime/schema. */
const isoDate = (d) => {
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  const s = String(d).trim();
  const m = s.match(/^\d{4}-\d{2}-\d{2}/);
  return m ? m[0] : new Date(s).toISOString().slice(0, 10);
};

/* ---------------------------------------------------------------- posts */
function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      if (!m) {
        console.warn(`  ! ${file} has no front matter — skipped`);
        return null;
      }
      const data = yaml.load(m[1]) || {};
      if (!data.title || !data.date) {
        console.warn(`  ! ${file} is missing a title or date — skipped`);
        return null;
      }
      const slug = data.slug || file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      return { ...data, slug, body: m[2] || '', file };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/* --------------------------------------------------------------- layout */
const nav = (active) => `
<header class="nav">
  <div class="container nav-inner">
    <a class="brand" href="/" aria-label="Ongera Ubeho — home">
      <img src="/assets/logo-mark.png" alt="Ongera Ubeho logo — two hands holding a parent and child" width="44" height="48">
      <span>
        <span class="brand-name">Ongera Ubeho</span><br>
        <span class="brand-tag">Live More · Choose Life</span>
      </span>
    </a>
    <nav aria-label="Main navigation">
      <ul class="nav-links" id="navLinks">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/programs">Our Work</a></li>
        <li><a href="/impact">Impact</a></li>
        <li><a href="/news"${active === 'news' ? ' aria-current="page"' : ''}>News</a></li>
        <li><a href="/get-involved">Get Involved</a></li>
      </ul>
    </nav>
    <div class="nav-cta-wrap"><a class="btn btn-primary nav-cta" href="/get-involved">Partner With Us</a></div>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navLinks">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;

const WA = 'https://wa.me/250782250694?text=Hello%20Ongera%20Ubeho%2C%20I%20found%20you%20through%20your%20website%20and%20I%27d%20like%20to%20know%20more.';
const ICONS = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'social-icons.json'), 'utf8'));
const socialLi = ({ key, label, url, path: d }) =>
  `        <li><a class="s-${key}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Ongera Ubeho on ${label}"><svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg></a></li>`;

const footer = () => `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-brand-row">
          <img src="/assets/logo-mark.png" alt="Ongera Ubeho emblem" width="319" height="350">
          <span>
            <span class="fname">Ongera Ubeho</span><br>
            <span class="ftag">Live More · Choose Life</span>
          </span>
        </div>
        <p>A community-based Youth &amp; Family Mentorship Hub reconnecting youth, healing families, and rebuilding futures across Rwanda.</p>
        <div class="sdg-tags" aria-label="Sustainable Development Goals alignment">
          <span class="sdg sdg-3">SDG 3 · GOOD HEALTH</span>
          <span class="sdg sdg-10">SDG 10 · REDUCED INEQUALITIES</span>
          <span class="sdg sdg-16">SDG 16 · PEACE &amp; JUSTICE</span>
        </div>
      </div>
      <div>
        <h3 class="foot-h">Explore</h3>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/programs">Our Work</a></li>
          <li><a href="/impact">Impact &amp; Transparency</a></li>
          <li><a href="/news">News &amp; Field Notes</a></li>
          <li><a href="/get-involved">Get Involved</a></li>
        </ul>
      </div>
      <div>
        <h3 class="foot-h">Contact</h3>
        <ul>
          <li><a href="mailto:Ongeraubehohubrwanda@gmail.com">Ongeraubehohubrwanda@gmail.com</a></li>
          <li><a href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp: +250 782 250 694</a></li>
          <li>Kigali, Rwanda</li>
        </ul>
      </div>
    </div>
    <div class="social-row">
      <span class="social-label">Follow our journey</span>
      <ul class="social-links">
${ICONS.map(socialLi).join('\n')}
      </ul>
    </div>
    <div class="footer-bottom">
      <span>© <span id="year">2026</span> Ongera Ubeho Team. All rights reserved.</span>
      <span><a href="/privacy" style="color:inherit">Privacy Policy</a> · Ongera Ubeho — “Live More / Choose Life”</span>
    </div>
  </div>
</footer>

<a class="wa-float" href="${WA}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Ongera Ubeho on WhatsApp"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${ICONS.find((i) => i.key === 'whatsapp').path}"/></svg><span class="wa-float-label">Chat with us</span></a>
<script src="/js/main.js"></script>`;

const ANALYTICS = `<script>
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_ftrEJPg9rsRF6OL7sy9iQOokRK4zGSTMThCXQxfoyX3',{api_host:'https://us.i.posthog.com',defaults:'2025-05-24',disable_session_recording:true});
</script>
<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1N77NT67NY"></script>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','G-1N77NT67NY');
</script>`;

function page({ title, description, url, image, imageAlt, jsonld = [], preload, body, active }) {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="QpqQ9FBozn3LdbMrz4iNEUNHuDSzO0b1tfvwHilqiZI">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Ongera Ubeho">
<meta property="og:locale" content="en_RW">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="${esc(imageAlt || title)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#1a3524">
<link rel="preload" href="/assets/fonts/fraunces-500-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/publicsans-400-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/styles.css">${preload ? `\n<link rel="preload" as="image" href="${preload}" fetchpriority="high">` : ''}
${ANALYTICS}
${jsonld.map((j) => `<script type="application/ld+json">\n${JSON.stringify(j, null, 1)}\n</script>`).join('\n')}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${nav(active)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}

const crumbs = (name, url) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name: 'News & Field Notes', item: SITE + '/news' },
    ...(url ? [{ '@type': 'ListItem', position: 3, name, item: url }] : []),
  ],
});

/* ------------------------------------------------------------ post page */
function renderPost(p) {
  const url = `${SITE}/news/${p.slug}`;
  const cover = p.cover || '/assets/og-image.png';
  const gallery = Array.isArray(p.gallery) ? p.gallery.filter((g) => g && g.image) : [];

  const galleryHtml = gallery.length
    ? `      <div class="gallery">
${gallery
  .map(
    (g) => `        <figure>
          <div class="rounded"><img src="${g.image}" alt="${esc(g.caption || p.title)}" loading="lazy"></div>
          ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}
        </figure>`
  )
  .join('\n')}
      </div>`
    : '';

  const body = `
<section class="page-hero" style="padding-bottom:1.4rem">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/news">News</a><span>›</span><span>${esc(p.label || 'Field Report')}</span></nav>
  </div>
</section>

<section style="padding-top:0">
  <div class="container">
    <article class="post reveal">
      <div class="post-meta">
        ${p.label ? `<span class="pill">${esc(p.label)}</span>` : ''}
        <time datetime="${isoDate(p.date)}">${fmtDate(p.date)}</time>
        ${p.location ? `<span>·</span><span>${esc(p.location)}</span>` : ''}
      </div>
      <h1 style="font-size:clamp(1.8rem,3.4vw,2.5rem);margin-bottom:.8rem">${esc(p.title)}</h1>
      ${p.summary ? `<p class="lede">${esc(p.summary)}</p>` : ''}

      ${p.cover ? `<figure class="post-figure"><img src="${p.cover}" alt="${esc(p.cover_caption || p.title)}" fetchpriority="high"></figure>` : ''}
      ${p.cover_caption ? `<p class="post-caption">${esc(p.cover_caption)}</p>` : ''}

      ${marked.parse(p.body || '')}

      ${p.quote ? `<div class="post-quote">${esc(p.quote)}</div>` : ''}
${galleryHtml}
      ${p.privacy_note !== false ? `<div class="post-note"><b>A note on privacy.</b> These photographs are published with the knowledge of those present. We never publish the name, circumstances, or personal details of any young person or family we work with. Everything recorded during our sessions is held confidentially and used only for our own monitoring and evaluation.</div>` : ''}

      <p style="margin-top:2.4rem"><a class="btn btn-ghost" href="/news">← All field notes</a></p>
    </article>
  </div>
</section>

<section class="cta">
  <div class="container">
    <div class="cta-box reveal">
      <h2>Every young Rwandan deserves a path forward.</h2>
      <p>Partner with us, fund the pilot, or become one of the mentors who walks with these families.</p>
      <div class="cta-actions">
        <a class="btn btn-light" href="/get-involved">Get Involved</a>
        <a class="btn btn-primary" href="/impact">See Our Targets</a>
      </div>
    </div>
  </div>
</section>`;

  return page({
    title: `${p.title} — Ongera Ubeho`,
    description: p.summary || p.title,
    url,
    image: cover.startsWith('http') ? cover : SITE + cover,
    imageAlt: p.cover_caption || p.title,
    preload: p.cover,
    active: 'news',
    jsonld: [
      crumbs(p.title, url),
      {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: p.title,
        datePublished: isoDate(p.date),
        dateModified: isoDate(p.date),
        image: cover.startsWith('http') ? cover : SITE + cover,
        author: { '@type': 'Organization', name: 'Ongera Ubeho' },
        publisher: { '@id': SITE + '/#organization' },
        mainEntityOfPage: url,
        articleSection: 'Field Notes',
        inLanguage: 'en',
      },
    ],
    body,
  });
}

/* ------------------------------------------------------------ list page */
function renderList(posts) {
  const cards = posts
    .map(
      (p) => `        <a class="post-card reveal" href="/news/${p.slug}">
          ${p.cover ? `<div class="thumb"><img src="${p.cover}" alt="${esc(p.cover_caption || p.title)}" loading="lazy"></div>` : ''}
          <div class="post-card-body">
            <div class="post-card-meta">${p.label ? `<span class="pill">${esc(p.label)}</span>` : ''}<time datetime="${isoDate(p.date)}">${fmtDate(p.date)}</time></div>
            <h2>${esc(p.title)}</h2>
            ${p.summary ? `<p class="excerpt">${esc(p.summary)}</p>` : ''}
            <span class="more">Read the field report →</span>
          </div>
        </a>`
    )
    .join('\n');

  const body = `
<section class="page-hero" style="padding-bottom:2.2rem">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span>News &amp; Field Notes</span></nav>
    <span class="eyebrow">News &amp; Field Notes</span>
    <h1 style="max-width:22ch">Updates from <em style="font-style:normal;color:var(--terra-500)">the ground.</em></h1>
    <p class="lede" style="max-width:44rem">Every step we take is documented here — who we met, what we learned, and what it changes about how we work. This is the record of Ongera Ubeho being built, in public.</p>
  </div>
</section>

<section style="padding-top:1rem">
  <div class="container">
    <div class="post-list">
${cards || '        <p>Our first field report is coming soon.</p>'}
    </div>
  </div>
</section>

<section class="cta">
  <div class="container">
    <div class="cta-box reveal">
      <h2>This is how the work gets done.</h2>
      <p>Mentor training, street outreach, and the first family matches come next. Partner with us, fund the pilot, or become one of the mentors who walks with these families.</p>
      <div class="cta-actions">
        <a class="btn btn-light" href="/get-involved">Get Involved</a>
        <a class="btn btn-primary" href="/impact">See Our Targets</a>
      </div>
    </div>
  </div>
</section>`;

  return page({
    title: 'News & Field Notes — Ongera Ubeho',
    description:
      'Updates from the ground in Rwanda: what Ongera Ubeho is doing, who we are meeting, and what we are learning as we build the youth and family mentorship hub.',
    url: SITE + '/news',
    image: SITE + '/assets/og-image.png',
    imageAlt: 'Ongera Ubeho — Youth & Family Mentorship Hub, Rwanda',
    active: 'news',
    jsonld: [crumbs()],
    body,
  });
}

/* ------------------------------------------------------------------ run */
const posts = readPosts();
console.log(`Building news — ${posts.length} post(s) found`);

fs.mkdirSync(path.join(WEB, 'news'), { recursive: true });
fs.writeFileSync(path.join(WEB, 'news.html'), renderList(posts));
console.log('  -> website/news.html');

for (const p of posts) {
  fs.writeFileSync(path.join(WEB, 'news', `${p.slug}.html`), renderPost(p));
  console.log(`  -> website/news/${p.slug}.html   (${p.title.slice(0, 46)})`);
}

/* keep the sitemap in step with the posts */
const smPath = path.join(WEB, 'sitemap.xml');
if (fs.existsSync(smPath)) {
  let sm = fs.readFileSync(smPath, 'utf8');
  sm = sm.replace(/\s*<url>\s*<loc>[^<]*\/news\/[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
  const entries = posts
    .map(
      (p) => `  <url>
    <loc>${SITE}/news/${p.slug}</loc>
    <lastmod>${isoDate(p.date)}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n');
  if (entries) sm = sm.replace('</urlset>', entries + '\n</urlset>');
  fs.writeFileSync(smPath, sm);
  console.log(`  -> sitemap.xml updated with ${posts.length} post URL(s)`);
}
console.log('Done.');
