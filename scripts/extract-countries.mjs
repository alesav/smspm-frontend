#!/usr/bin/env node
/**
 * Extract all unique countries from pricelist.json
 * This script analyzes the pricelist and creates a comprehensive country metadata file
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read pricelist.json
const pricelistPath = join(__dirname, '../pricelist.json');
const pricelist = JSON.parse(readFileSync(pricelistPath, 'utf-8'));

// Extract unique countries with their providers
const countriesMap = new Map();

Object.keys(pricelist).forEach(key => {
  const match = key.match(/^(.+?)\s-\s(.+)$/);
  if (match) {
    const [, country, provider] = match;
    const price = pricelist[key].p;
    
    if (!countriesMap.has(country)) {
      countriesMap.set(country, {
        name: country,
        providers: [],
        minPrice: price,
        maxPrice: price,
      });
    }
    
    const countryData = countriesMap.get(country);
    countryData.providers.push({
      name: provider,
      price: price,
    });
    
    // Update min/max prices
    if (price < countryData.minPrice) countryData.minPrice = price;
    if (price > countryData.maxPrice) countryData.maxPrice = price;
  }
});

// Sort providers by price for each country
countriesMap.forEach(country => {
  country.providers.sort((a, b) => a.price - b.price);
});

// Convert to array and sort by country name
const countries = Array.from(countriesMap.values())
  .sort((a, b) => a.name.localeCompare(b.name));

// Generate output
const output = {
  totalCountries: countries.length,
  generatedAt: new Date().toISOString(),
  countries: countries,
};

// Save to file
const outputPath = join(__dirname, '../data/extracted-countries.json');
writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`✅ Extracted ${countries.length} countries from pricelist`);
console.log(`📁 Saved to: data/extracted-countries.json`);
console.log('\nTop 10 countries by lowest price:');
countries
  .sort((a, b) => a.minPrice - b.minPrice)
  .slice(0, 10)
  .forEach((country, i) => {
    console.log(`${i + 1}. ${country.name}: €${country.minPrice.toFixed(4)}`);
  });
