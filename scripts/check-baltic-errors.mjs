import { readFileSync } from 'fs';

const content = readFileSync('./data/country-metadata.js', 'utf-8');

// Check Latvian locative cases - should end in -ā not -u
const latvianRegex = /(\w+(?:\s+\w+)*): \{[\s\S]*?name_lv: "([^"]+)",[\s\S]*?name_lv_loc: "([^"]+)",[\s\S]*?}/g;

console.log('🔍 Checking Latvian locative cases...\n');

let match;
let errors = [];

while ((match = latvianRegex.exec(content)) !== null) {
  const [, countryEn, nameLv, locLv] = match;
  
  // Check if locative ends correctly
  if (nameLv.endsWith('ija') && !locLv.endsWith('ijā')) {
    errors.push({
      country: countryEn,
      name: nameLv,
      loc: locLv,
      expected: nameLv.slice(0, -1) + 'ā'
    });
  } else if (nameLv.endsWith('a') && !nameLv.endsWith('ija') && !locLv.endsWith('ā')) {
    errors.push({
      country: countryEn,
      name: nameLv,
      loc: locLv,
      expected: nameLv.slice(0, -1) + 'ā'
    });
  }
}

console.log(`Found ${errors.length} Latvian locative errors:`);
errors.forEach(e => console.log(`  ${e.country}: ${e.name} → ${e.loc} (should be ${e.expected})`));

// Check Lithuanian cases
console.log('\n🔍 Checking Lithuanian cases...\n');

const lithuanianRegex = /(\w+(?:\s+\w+)*): \{[\s\S]*?name_lt: "([^"]+)",[\s\S]*?name_lt_loc: "([^"]+)",[\s\S]*?name_lt_acc: "([^"]+)",[\s\S]*?}/g;

let ltErrors = [];

while ((match = lithuanianRegex.exec(content)) !== null) {
  const [, countryEn, nameLt, locLt, accLt] = match;
  
  // Check -ija pattern
  if (nameLt.endsWith('ija')) {
    const stem = nameLt.slice(0, -3);
    if (locLt !== stem + 'ijoje') {
      ltErrors.push({ country: countryEn, field: 'loc', name: nameLt, actual: locLt, expected: stem + 'ijoje' });
    }
    if (accLt !== stem + 'iją') {
      ltErrors.push({ country: countryEn, field: 'acc', name: nameLt, actual: accLt, expected: stem + 'iją' });
    }
  }
  
  // Check -as pattern (masculine)
  else if (nameLt.endsWith('as')) {
    const stem = nameLt.slice(0, -2);
    if (locLt !== stem + 'e' && locLt !== nameLt) {
      ltErrors.push({ country: countryEn, field: 'loc', name: nameLt, actual: locLt, expected: stem + 'e' });
    }
    if (accLt !== stem + 'ą' && accLt !== nameLt) {
      ltErrors.push({ country: countryEn, field: 'acc', name: nameLt, actual: accLt, expected: stem + 'ą' });
    }
  }
  
  // Check -a pattern
  else if (nameLt.endsWith('a') && !nameLt.endsWith('ija')) {
    const stem = nameLt.slice(0, -1);
    if (locLt !== stem + 'oje' && locLt !== nameLt) {
      ltErrors.push({ country: countryEn, field: 'loc', name: nameLt, actual: locLt, expected: stem + 'oje' });
    }
    if (accLt !== stem + 'ą' && accLt !== nameLt) {
      ltErrors.push({ country: countryEn, field: 'acc', name: nameLt, actual: accLt, expected: stem + 'ą' });
    }
  }
}

console.log(`Found ${ltErrors.length} Lithuanian case errors:`);
ltErrors.forEach(e => console.log(`  ${e.country} (${e.field}): ${e.name} → ${e.actual} (should be ${e.expected})`));
