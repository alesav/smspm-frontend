#!/usr/bin/env node
/**
 * Add grammatical case forms for Russian, Latvian, and Lithuanian
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const metadataPath = join(__dirname, '../data/country-metadata.js');

// Russian declension patterns
function getRussianCases(name) {
  // Countries ending in -ия (most common)
  if (name.endsWith('ия')) {
    const stem = name.slice(0, -2);
    return {
      prep: stem + 'ии',
      acc: stem + 'ию'
    };
  }
  
  // Countries ending in -я
  if (name.endsWith('я')) {
    const stem = name.slice(0, -1);
    return {
      prep: stem + 'е',
      acc: stem + 'ю'
    };
  }
  
  // Countries ending in -ь (like Русь)
  if (name.endsWith('ь')) {
    const stem = name.slice(0, -1);
    return {
      prep: stem + 'и',
      acc: stem + 'ь'
    };
  }
  
  // Countries ending in consonant (masculine)
  // Most don't change in prepositional, but add -а or -я in accusative
  const lastChar = name.slice(-1);
  if (!'аеёиоуыэюя'.includes(lastChar)) {
    return {
      prep: name + 'е',
      acc: name
    };
  }
  
  // Default: no change
  return {
    prep: name,
    acc: name
  };
}

// Latvian declension patterns
function getLatvianCases(name) {
  // Most country names ending in -ija
  if (name.endsWith('ija')) {
    const stem = name.slice(0, -1);
    return {
      loc: stem + 'ā' // locative: -ija → -ijā
    };
  }
  
  // Countries ending in -a
  if (name.endsWith('a')) {
    const stem = name.slice(0, -1);
    return {
      loc: stem + 'ā' // locative: -a → -ā
    };
  }
  
  // Default: same form
  return {
    loc: name
  };
}

// Lithuanian declension patterns  
function getLithuanianCases(name) {
  // Countries ending in -ija
  if (name.endsWith('ija')) {
    const stem = name.slice(0, -2);
    return {
      loc: stem + 'ijoje',
      acc: stem + 'iją'
    };
  }
  
  // Countries ending in -as (masculine)
  if (name.endsWith('as')) {
    const stem = name.slice(0, -2);
    return {
      loc: stem + 'e',
      acc: stem + 'ą'
    };
  }
  
  // Countries ending in -a
  if (name.endsWith('a')) {
    const stem = name.slice(0, -1);
    return {
      loc: stem + 'oje',
      acc: stem + 'ą'
    };
  }
  
  // Default: no change
  return {
    loc: name,
    acc: name
  };
}

console.log('📝 Adding grammatical case forms to country metadata...\n');

// Read the file
let content = readFileSync(metadataPath, 'utf-8');

// Process Russian cases
const countryRegex = /name_ru: "([^"]+)",\n(\s+)name_ru_prep:/g;
let match;
let ruModifications = 0;

const countryRegexNew = /name_ru: "([^"]+)",\n(\s+)slug_ru:/g;
while ((match = countryRegexNew.exec(content)) !== null) {
  const rusName = match[1];
  const indent = match[2];
  const position = match.index;
  
  // Check if cases already exist
  const afterMatch = content.slice(position, position + 300);
  if (afterMatch.includes('name_ru_prep:')) {
    continue; // Already has cases
  }
  
  const cases = getRussianCases(rusName);
  
  // Insert after name_ru line
  const insertPosition = match.index + match[0].indexOf('\n') + 1;
  content = content.slice(0, insertPosition) + 
            `${indent}name_ru_prep: "${cases.prep}",\n${indent}name_ru_acc: "${cases.acc}",\n` +
            content.slice(insertPosition);
  
  ruModifications++;
}

// Process Latvian cases
const latvianRegex = /name_lv: "([^"]+)",\n(\s+)(name_lv_loc:|slug_lv:)/g;
let lvModifications = 0;

content = readFileSync(metadataPath, 'utf-8'); // Re-read after Russian changes
let lvMatch;
while ((lvMatch = latvianRegex.exec(content)) !== null) {
  const lvName = lvMatch[1];
  const indent = lvMatch[2];
  const nextField = lvMatch[3];
  const position = lvMatch.index;
  
  const cases = getLatvianCases(lvName);
  
  // Check if we need to update or add
  if (nextField === 'name_lv_loc:') {
    // Update existing wrong value
    const locRegex = new RegExp(`name_lv: "${lvName}",\\n${indent}name_lv_loc: "([^"]+)",`);
    const locMatch = content.slice(position, position + 200).match(locRegex);
    if (locMatch && locMatch[1] !== cases.loc) {
      content = content.replace(
        `name_lv: "${lvName}",\n${indent}name_lv_loc: "${locMatch[1]}",`,
        `name_lv: "${lvName}",\n${indent}name_lv_loc: "${cases.loc}",`
      );
      lvModifications++;
    }
  } else if (nextField === 'slug_lv:') {
    // Add missing locative
    const insertPosition = lvMatch.index + lvMatch[0].indexOf('\n') + 1;
    content = content.slice(0, insertPosition) + 
              `${indent}name_lv_loc: "${cases.loc}",\n` +
              content.slice(insertPosition);
    lvModifications++;
  }
}

// Process Lithuanian cases
const lithuanianRegex = /name_lt: "([^"]+)",\n(\s+)(name_lt_loc:|slug_lt:)/g;
let ltModifications = 0;

content = readFileSync(metadataPath, 'utf-8'); // Re-read after Latvian changes
let ltMatch;
while ((ltMatch = lithuanianRegex.exec(content)) !== null) {
  const ltName = ltMatch[1];
  const indent = ltMatch[2];
  const nextField = ltMatch[3];
  const position = ltMatch.index;
  
  const cases = getLithuanianCases(ltName);
  
  if (nextField === 'name_lt_loc:') {
    // Update existing values if wrong
    const locRegex = new RegExp(`name_lt: "${ltName}",\\n${indent}name_lt_loc: "([^"]+)",\\n${indent}name_lt_acc: "([^"]+)",`);
    const locMatch = content.slice(position, position + 300).match(locRegex);
    if (locMatch && (locMatch[1] !== cases.loc || locMatch[2] !== cases.acc)) {
      content = content.replace(
        `name_lt: "${ltName}",\n${indent}name_lt_loc: "${locMatch[1]}",\n${indent}name_lt_acc: "${locMatch[2]}",`,
        `name_lt: "${ltName}",\n${indent}name_lt_loc: "${cases.loc}",\n${indent}name_lt_acc: "${cases.acc}",`
      );
      ltModifications++;
    }
  } else if (nextField === 'slug_lt:') {
    // Add missing cases
    const insertPosition = ltMatch.index + ltMatch[0].indexOf('\n') + 1;
    content = content.slice(0, insertPosition) + 
              `${indent}name_lt_loc: "${cases.loc}",\n${indent}name_lt_acc: "${cases.acc}",\n` +
              content.slice(insertPosition);
    ltModifications++;
  }
}

console.log(`✅ Added/Updated Russian cases: ${ruModifications} countries`);
console.log(`✅ Added/Updated Latvian cases: ${lvModifications} countries`);
console.log(`✅ Added/Updated Lithuanian cases: ${ltModifications} countries\n`);

// Save the modified content
writeFileSync(metadataPath, content);

console.log('✨ Done! Grammatical cases added.\n');
console.log('⚠️  Note: Some countries may need manual correction for irregular forms.');
console.log('   Please review countries like: США, ОАЭ, ЦАР, ДР Конго, etc.\n');
