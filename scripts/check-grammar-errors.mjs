import { readFileSync } from 'fs';

const content = readFileSync('./data/country-metadata.js', 'utf-8');

// Extract all country entries
const countryRegex = /(\w+(?:\s+\w+)*): \{[\s\S]*?name_ru: "([^"]+)",[\s\S]*?name_ru_prep: "([^"]+)",[\s\S]*?name_ru_acc: "([^"]+)",[\s\S]*?}/g;

const errors = [];
let match;

while ((match = countryRegex.exec(content)) !== null) {
  const [, countryEn, nameRu, prepRu, accRu] = match;
  
  // Check if prep and acc are same as nominative (likely error for -a/-я countries)
  if (nameRu.endsWith('а') || nameRu.endsWith('я')) {
    if (prepRu === nameRu || accRu === nameRu) {
      errors.push({
        country: countryEn,
        issue: 'Russian feminine noun not declined',
        nameRu,
        prepRu: prepRu === nameRu ? `❌ ${prepRu} (should end in -е)` : `✓ ${prepRu}`,
        accRu: accRu === nameRu ? `❌ ${accRu} (should end in -у)` : `✓ ${accRu}`
      });
    }
  }
  
  // Check masculine nouns ending in consonant
  if (!nameRu.match(/[аяоеуюи]$/)) {
    if (prepRu === nameRu) {
      errors.push({
        country: countryEn,
        issue: 'Russian masculine noun - prep case same as nominative',
        nameRu,
        prepRu: `❌ ${prepRu} (should end in -е)`,
        accRu: accRu === nameRu ? `✓ ${accRu} (correct for consonant)` : `? ${accRu}`
      });
    }
  }
}

console.log('🔍 Found', errors.length, 'potential grammar errors:\n');
errors.forEach(err => {
  console.log(`📍 ${err.country}:`);
  console.log(`   Issue: ${err.issue}`);
  console.log(`   Nom: ${err.nameRu}`);
  console.log(`   Prep: ${err.prepRu}`);
  console.log(`   Acc: ${err.accRu}`);
  console.log('');
});
