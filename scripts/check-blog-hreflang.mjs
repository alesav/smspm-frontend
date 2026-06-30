// Checks for blog posts that exist in more than one language folder but are
// NOT registered in BLOG_SLUGS (src/utils/hreflang.ts).
//
// Why this matters: the language switcher (Navigation.astro) and hreflang
// tags (Layout.astro via getBlogAlternateUrls) only work for posts listed in
// BLOG_SLUGS. A translated post that's missing from that map will silently
// fall back to "no translation found" — switcher sends users to the blog
// index instead of the actual translated post, and no hreflang is emitted.
//
// Run after adding/translating blog posts:
//   node scripts/check-blog-hreflang.mjs

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = './src/content/blog';
const HREFLANG_FILE = './src/utils/hreflang.ts';
const LANGS = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

// 1. Read all blog slugs per language from the filesystem
const postsByLang = {};
for (const lang of LANGS) {
  const dir = join(BLOG_DIR, lang);
  try {
    postsByLang[lang] = readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
  } catch {
    postsByLang[lang] = [];
  }
}

// 2. Parse BLOG_SLUGS out of hreflang.ts (simple extraction, not a full TS parse)
const hreflangSrc = readFileSync(HREFLANG_FILE, 'utf-8');
const blogSlugsMatch = hreflangSrc.match(/BLOG_SLUGS[^{]*\{([\s\S]*?)\n\};/);
if (!blogSlugsMatch) {
  console.error('❌ Could not find BLOG_SLUGS in', HREFLANG_FILE);
  process.exit(1);
}
const blogSlugsBlock = blogSlugsMatch[1];

// Every slug value currently registered anywhere in BLOG_SLUGS
const registeredSlugs = new Set(
  [...blogSlugsBlock.matchAll(/:\s*'([^']+)'/g)].map((m) => m[1])
);

// 3. Flag posts that look like they need registration:
//    - Any non-English post whose slug isn't anywhere in BLOG_SLUGS at all.
//      (Today, every non-English blog post is a translation of an English
//      one — there's no independent non-English content yet — so an
//      unregistered non-English slug almost certainly means "forgot to add
//      this to BLOG_SLUGS.")
const issues = [];

for (const lang of LANGS) {
  if (lang === 'en') continue;
  for (const slug of postsByLang[lang]) {
    if (!registeredSlugs.has(slug)) {
      issues.push({ lang, slug });
    }
  }
}

console.log(`\n🔍 Blog hreflang check\n`);
console.log(`Posts per language: ${LANGS.map((l) => `${l}=${postsByLang[l].length}`).join(', ')}`);
console.log(`Registered translation slugs in BLOG_SLUGS: ${registeredSlugs.size}\n`);

if (issues.length === 0) {
  console.log('✅ Every non-English blog post is registered in BLOG_SLUGS.\n');
  process.exit(0);
}

console.log(`❌ Found ${issues.length} translated post(s) missing from BLOG_SLUGS:\n`);
for (const { lang, slug } of issues) {
  console.log(`   [${lang}] ${slug}`);
}
console.log(`\nAdd these to BLOG_SLUGS in ${HREFLANG_FILE} so the language`);
console.log(`switcher and hreflang tags pick them up. See the existing`);
console.log(`android-sms-gateway-send-sms-from-phone entry for the shape.\n`);
process.exit(1);
