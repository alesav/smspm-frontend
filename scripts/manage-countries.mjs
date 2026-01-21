#!/usr/bin/env node
/**
 * Country Pages Management Utility
 * Convenience wrapper for common operations
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TRACKING_FILE = join(__dirname, '../data/generated-pages-tracking.json');

function execCommand(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing: ${cmd}`);
    process.exit(1);
  }
}

function getStats() {
  if (!existsSync(TRACKING_FILE)) {
    return { total: 0, template: 0, manual: 0, protected: 0 };
  }
  
  const tracking = JSON.parse(readFileSync(TRACKING_FILE, 'utf-8'));
  const pages = tracking.pages || {};
  
  let template = 0;
  let manual = 0;
  
  Object.values(pages).forEach(page => {
    if (page.type === 'template') template++;
    if (page.type === 'manual') manual++;
  });
  
  return {
    total: Object.keys(pages).length,
    template,
    manual,
    protected: 5, // From PROTECTED_PAGES array
  };
}

function showHelp() {
  console.log(`
🌍 Country Pages Management

USAGE:
  npm run countries <command>

COMMANDS:
  extract           Extract countries from pricelist.json
  generate          Generate all new pages (safe, won't overwrite existing)
  regenerate        Force regenerate all template pages (preserves manual)
  test              Dry-run to see what would be generated
  stats             Show current generation statistics
  help              Show this help message

EXAMPLES:
  npm run countries extract        # First time setup
  npm run countries generate       # Generate new pages
  npm run countries regenerate     # After template changes
  npm run countries test           # Preview changes

WORKFLOW:
  1. Update pricelist.json with new prices
  2. npm run countries extract
  3. npm run countries test         # Review what will happen
  4. npm run countries regenerate   # Apply changes
`);
}

function showStats() {
  const stats = getStats();
  console.log(`
📊 Current Statistics:

Total Pages:     ${stats.total}
├─ 🔒 Protected:  ${stats.protected} (manually curated, never regenerated)
├─ ✏️  Manual:     ${stats.manual} (user-edited, auto-protected)
└─ ✅ Template:   ${stats.template} (auto-generated, can regenerate)

To see details: cat data/generated-pages-tracking.json
`);
}

// Main logic
const command = process.argv[2];

switch (command) {
  case 'extract':
    console.log('📥 Extracting countries from pricelist...\n');
    execCommand('node scripts/extract-countries.mjs');
    break;
    
  case 'generate':
    console.log('📝 Generating new country pages...\n');
    execCommand('node scripts/generate-country-pages-smart.mjs');
    showStats();
    break;
    
  case 'regenerate':
    console.log('🔄 Regenerating all template pages...\n');
    execCommand('node scripts/generate-country-pages-smart.mjs --force');
    showStats();
    break;
    
  case 'test':
    console.log('🔍 Testing generation (dry-run)...\n');
    execCommand('node scripts/generate-country-pages-smart.mjs --dry-run');
    break;
    
  case 'stats':
    showStats();
    break;
    
  case 'help':
  default:
    showHelp();
    break;
}
