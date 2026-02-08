import { readFileSync } from 'fs';

const content = readFileSync('./data/country-metadata.js', 'utf-8');

// Known country name translations for verification
const knownNames = {
  'United Kingdom': { ru: 'Великобритания', lv: 'Lielbritānija', lt: 'Jungtinė Karalystė' },
  'United States': { ru: 'США', lv: 'ASV', lt: 'JAV' },
  'United Arab Emirates': { ru: 'ОАЭ', lv: 'AAE', lt: 'JAE' },
  'South Africa': { ru: 'ЮАР', lv: 'Dienvidāfrika', lt: 'Pietų Afrika' },
  'New Zealand': { ru: 'Новая Зеландия', lv: 'Jaunzēlande', lt: 'Naujoji Zelandija' },
  'Saudi Arabia': { ru: 'Саудовская Аравия', lv: 'Saūda Arābija', lt: 'Saudo Arabija' },
};

// Extract all countries
const countryRegex = /("?\w+(?:\s+\w+)+"?): \{[\s\S]*?name_ru: "([^"]+)",[\s\S]*?name_lv: "([^"]+)",[\s\S]*?name_lt: "([^"]+)",[\s\S]*?}/g;

let match;
const issues = [];

while ((match = countryRegex.exec(content)) !== null) {
  const [, countryEn, nameRu, nameLv, nameLt] = match;
  const cleanEn = countryEn.replace(/"/g, '');
  
  // Check known translations
  if (knownNames[cleanEn]) {
    const expected = knownNames[cleanEn];
    if (expected.ru && nameRu !== expected.ru) {
      issues.push({ country: cleanEn, lang: 'RU', actual: nameRu, expected: expected.ru });
    }
    if (expected.lv && nameLv !== expected.lv) {
      issues.push({ country: cleanEn, lang: 'LV', actual: nameLv, expected: expected.lv });
    }
    if (expected.lt && nameLt !== expected.lt) {
      issues.push({ country: cleanEn, lang: 'LT', actual: nameLt, expected: expected.lt });
    }
  }
  
  // Check for obvious translation errors (English names in non-English fields)
  if (/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(nameRu) && nameRu === cleanEn) {
    issues.push({ country: cleanEn, lang: 'RU', issue: 'Not translated (still English)', actual: nameRu });
  }
  if (/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(nameLv) && nameLv === cleanEn) {
    issues.push({ country: cleanEn, lang: 'LV', issue: 'Not translated (still English)', actual: nameLv });
  }
  if (/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(nameLt) && nameLt === cleanEn) {
    issues.push({ country: cleanEn, lang: 'LT', issue: 'Not translated (still English)', actual: nameLt });
  }
}

console.log(`\n🔍 Found ${issues.length} translation issues:\n`);
issues.forEach(i => {
  if (i.expected) {
    console.log(`❌ ${i.country} (${i.lang}): "${i.actual}" → should be "${i.expected}"`);
  } else {
    console.log(`⚠️  ${i.country} (${i.lang}): ${i.issue} - "${i.actual}"`);
  }
});
