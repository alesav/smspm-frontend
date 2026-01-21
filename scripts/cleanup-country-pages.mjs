import { readFileSync, readdirSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const trackingPath = join(__dirname, '../data/generated-pages-tracking.json');
const pagesDir = join(__dirname, '../src/pages');
const languages = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const tracking = JSON.parse(readFileSync(trackingPath, 'utf-8'));
const trackedPages = Object.keys(tracking.pages);

const PROTECTED_PAGES = [
    'en/country/send-sms-estonia.astro',
    'en/country/send-sms-united-kingdom.astro',
    'en/country/send-sms-germany.astro',
    'en/country/send-sms-france.astro',
    'en/country/send-sms-spain.astro',
];

languages.forEach(lang => {
    const countryDir = join(pagesDir, lang, 'country');
    if (!existsSync(countryDir)) return;

    const files = readdirSync(countryDir);
    files.forEach(file => {
        if (!file.endsWith('.astro')) return;

        const relativePath = `${lang}/country/${file}`;

        if (!trackedPages.includes(relativePath) && !PROTECTED_PAGES.includes(relativePath)) {
            console.log(`🗑️ Deleting orphaned/old page: ${relativePath}`);
            unlinkSync(join(countryDir, file));
        }
    });
});

console.log('✨ Cleanup complete.');
