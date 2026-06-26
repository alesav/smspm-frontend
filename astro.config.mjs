// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

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
          return { ...item, priority: 0.8 };
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