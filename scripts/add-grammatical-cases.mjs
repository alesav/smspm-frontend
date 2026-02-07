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
      loc: stem + 'u' // locative
    };
  }
  
  // Countries ending in -a
  if (name.endsWith('a')) {
    const stem = name.slice(0, -1);
    return {
      loc: stem + 'u'
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

// Process each country entry
const countryRegex = /name_ru: "([^"]+)",\n(\s+)slug_ru:/g;
let match;
let modifications = 0;

while ((match = countryRegex.exec(content)) !== null) {
  const rusName = match[1];
  const indent = match[2];
  const position = match.index + match[0].length;
  
  // Check if cases already exist
  const afterMatch = content.slice(position, position + 200);
  if (afterMatch.includes('name_ru_prep:')) {
    continue; // Already has cases
  }
  
  const cases = getRussianCases(rusName);
  
  // Insert after slug_ru line
  const insertText = `,\n${indent}name_ru_prep: "${cases.prep}",\n${indent}name_ru_acc: "${cases.acc}"`;
  
  // Find the position right before slug_ru
  const beforeSlugRu = content.lastIndexOf('slug_ru:', position);
  const insertPosition = match.index + match[0].indexOf('slug_ru:');
  
  content = content.slice(0, insertPosition) + 
            `name_ru_prep: "${cases.prep}",\n${indent}name_ru_acc: "${cases.acc}",\n${indent}slug_ru:` +
            content.slice(insertPosition + 8);
  
  modifications++;
}

console.log(`✅ Added Russian cases to ${modifications} countries\n`);

// Save the modified content
writeFileSync(metadataPath, content);

console.log('✨ Done! Grammatical cases added.\n');
console.log('⚠️  Note: Some countries may need manual correction for irregular forms.');
console.log('   Please review countries like: США, ОАЭ, ЦАР, ДР Конго, etc.\n');
