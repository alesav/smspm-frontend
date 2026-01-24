// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server', // SSR mode for language detection on root page
  adapter: cloudflare(),
  site: 'https://smspm.com',
  integrations: [
    tailwind({
      applyBaseStyles: false, // We have our own global styles
    })
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