#!/usr/bin/env node
/**
 * Generate localized pricing pages for all languages
 * This copies the [lang]/countries.astro to language-specific files
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseDir = join(__dirname, '../src/pages');
const sourceFile = join(baseDir, '[lang]/countries.astro');

// Read the template file
let templateContent = readFileSync(sourceFile, 'utf-8');

// URL mapping for each language
const urlMappings = {
  'en': 'prices',
  'et': 'sms-hinnad',
  'ru': 'sms-ceny',
  'es': 'precios-sms',
  'de': 'sms-preise',
  'fr': 'prix-sms',
  'lv': 'sms-cenas',
  'lt': 'sms-kainos'
};

Object.entries(urlMappings).forEach(([lang, filename]) => {
  const langDir = join(baseDir, lang);
  if (!existsSync(langDir)) {
    mkdirSync(langDir, { recursive: true });
  }
  
  // Replace the dynamic getStaticPaths with a hardcoded lang value
  let langSpecificContent = templateContent
    // Remove the getStaticPaths function
    .replace(/export async function getStaticPaths\(\) \{[\s\S]*?\}\n\n/, '')
    // Replace the dynamic lang extraction with hardcoded value
    .replace(/const \{ lang \} = Astro\.params;/, `const lang = '${lang}';`)
    // Replace the urlPrefix logic with proper localized prefix mapping
    .replace(
      /const urlPrefix =\s*\(lang as string\) === "et" \? "saada-sms-" : "send-sms-";/,
      `// URL prefix mapping for localized country page URLs
        const urlPrefixMap: Record<string, string> = {
            'en': 'send-sms-',
            'et': 'saada-sms-',
            'ru': 'otpravit-sms-',
            'es': 'enviar-sms-',
            'de': 'sms-senden-',
            'fr': 'envoyer-sms-',
            'lv': 'sutit-sms-',
            'lt': 'siusti-sms-'
        };
        const urlPrefix = urlPrefixMap[lang as string] || 'send-sms-';`
    );
  
  const filepath = join(langDir, `${filename}.astro`);
  writeFileSync(filepath, langSpecificContent);
  console.log(`✅ Created: ${lang}/${filename}.astro`);
});

console.log('\n✨ All pricing pages created successfully!');
console.log('\n📝 Note: You should delete the old files:');
console.log('   - /src/pages/[lang]/countries.astro');
console.log('   - /src/pages/countries.astro');
console.log('   - /src/pages/prices.astro');
console.log('   - /src/pages/pricing.astro');
console.log('   - /src/pages/*/hinnad.astro (except et/sms-hinnad.astro)');
