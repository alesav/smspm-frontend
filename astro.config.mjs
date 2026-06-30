// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Build a map of blog post URL -> lastmod date (dateModified, falling back
// to pubDate) so the sitemap can emit accurate <lastmod> per post/language.
// Keyed as "/{lang}/blog/{slug}" matching the routes in src/pages/{lang}/blog/[slug].astro
// Reads frontmatter directly from the filesystem (astro:content isn't available
// inside astro.config.mjs at config-load time).
/**
 * @param {string} raw
 * @param {string} field
 */
function extractFrontmatterField(raw, field) {
  const match = raw.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  if (!match) return undefined;
  const value = match[1].trim().replace(/^['"]|['"]$/g, '');
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function buildBlogLastmodMap() {
  const map = new Map();
  const blogDir = fileURLToPath(new URL('./src/content/blog/', import.meta.url));
  const langDirs = readdirSync(blogDir).filter((entry) =>
    statSync(path.join(blogDir, entry)).isDirectory()
  );
  for (const lang of langDirs) {
    const langPath = path.join(blogDir, lang);
    const files = readdirSync(langPath).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const raw = readFileSync(path.join(langPath, file), 'utf-8');
      const draftMatch = raw.match(/^draft:\s*true\s*$/m);
      if (draftMatch) continue;
      const dateModified = extractFrontmatterField(raw, 'dateModified');
      const pubDate = extractFrontmatterField(raw, 'pubDate');
      const date = dateModified ?? pubDate;
      if (!date) continue;
      const slug = file.replace(/\.md$/, '');
      map.set(`/${lang}/blog/${slug}`, date);
    }
  }
  return map;
}

const blogLastmodMap = buildBlogLastmodMap();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://smspm.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) =>
        !page.includes('/unknown') &&
        !page.endsWith('/index') &&
        page !== 'https://smspm.com/',
      serialize(item) {
        // Homepage variants — highest priority
        if (/smspm\.com\/(en|et|ru|es|de|fr|lv|lt)\/?$/.test(item.url)) {
          return { ...item, priority: 1.0 };
        }
        // Country pricing pages
        if (item.url.includes('/country/')) {
          return { ...item, priority: 0.8 };
        }
        // Prices pages
        if (/\/(prices|sms-hinnad|sms-ceny|precios-sms|sms-preise|prix-sms|sms-cenas|sms-kainos)/.test(item.url)) {
          return { ...item, priority: 0.9 };
        }
        // Blog posts
        if (item.url.includes('/blog/')) {
          const urlPath = new URL(item.url).pathname.replace(/\/$/, '');
          const lastmodDate = blogLastmodMap.get(urlPath);
          return {
            ...item,
            priority: 0.8,
            ...(lastmodDate ? { lastmod: lastmodDate.toISOString() } : {}),
          };
        }
        // Blog index
        if (item.url.endsWith('/blog')) {
          return { ...item, priority: 0.7 };
        }
        // About
        if (item.url.includes('/about')) {
          return { ...item, priority: 0.6 };
        }
        // Tools
        if (item.url.includes('/tools')) {
          return { ...item, priority: 0.6 };
        }
        // Countries listing
        if (item.url.includes('/countries')) {
          return { ...item, priority: 0.7 };
        }
        // Legal pages
        if (/\/(privacy|terms|security)/.test(item.url)) {
          return { ...item, priority: 0.3 };
        }
        return item;
      },
    }),
  ],
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  build: {
    assets: '_astro',
  },
});