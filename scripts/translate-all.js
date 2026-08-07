import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import pLimit from 'p-limit';

import { foods, foodCategories } from '../src/data/foods.js';
import { pendingItems, categoryLabels, urgencyConfig } from '../src/data/pending.js';
import { tripMeta, flights, blocks, stays, days, transports, transportTotals, budget } from '../src/data/trip.js';
import { historyPeriods, furtherReading } from '../src/data/history.js';
import { guides, guidesByDay } from '../src/data/guides.js';

const limit = pLimit(5); // concurrent translations limit
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function trans(text, to) {
  if (!text || typeof text !== 'string') return text;
  try {
    await delay(300); // prevent hitting rate limits too quickly
    const res = await limit(() => translate(text, { to }));
    return res.text;
  } catch (err) {
    console.error(`Error translating: "${text.slice(0, 30)}..." to ${to}`, err.message);
    return text;
  }
}

async function deepTranslate(obj, to, keysToTranslate) {
  if (Array.isArray(obj)) {
    const arr = [];
    for (let item of obj) {
      arr.push(await deepTranslate(item, to, keysToTranslate));
    }
    return arr;
  }
  
  if (obj !== null && typeof obj === 'object') {
    const res = {};
    for (let [key, val] of Object.entries(obj)) {
      if (keysToTranslate.includes(key) && typeof val === 'string') {
        res[key] = await trans(val, to);
      } else if (typeof val === 'object') {
        // Deep translation for nested objects
        const translatedNested = await deepTranslate(val, to, keysToTranslate);
        if (Object.keys(translatedNested).length > 0) {
          res[key] = translatedNested;
        }
      }
    }
    return res;
  }
  
  return {};
}

async function processTranslations(langCode) {
  console.log(`\nTranslating to ${langCode}...`);
  
  const targetKeys = [
    'name', 'where', 'desc', 'tip', 'title', 'detail', 'deadline', 'label', 
    'title', 'description', 'duration', 'note', 'type', 'hotel', 'city', 'condition',
    'location', 'highlights', 'intro', 'text'
  ]; // Common text keys across the files

  const data = {
    foods: await deepTranslate(foods, langCode, targetKeys),
    foodCategories: await deepTranslate(foodCategories, langCode, targetKeys),
    pendingItems: await deepTranslate(pendingItems, langCode, targetKeys),
    categoryLabels: await deepTranslate(categoryLabels, langCode, targetKeys),
    urgencyConfig: await deepTranslate(urgencyConfig, langCode, targetKeys),
    
    tripMeta: await deepTranslate(tripMeta, langCode, targetKeys),
    flights: await deepTranslate(flights, langCode, targetKeys),
    blocks: await deepTranslate(blocks, langCode, targetKeys),
    stays: await deepTranslate(stays, langCode, targetKeys),
    days: await deepTranslate(days, langCode, targetKeys),
    transports: await deepTranslate(transports, langCode, targetKeys),
    budget: await deepTranslate(budget, langCode, targetKeys),
    
    historyPeriods: await deepTranslate(historyPeriods, langCode, targetKeys),
    furtherReading: await deepTranslate(furtherReading, langCode, targetKeys),
    
    guides: await deepTranslate(guides, langCode, targetKeys),
    guidesByDay: await deepTranslate(guidesByDay, langCode, targetKeys),
  };
  
  // Format the output
  const content = `// Superposición de traducción — ${langCode}
// Generado automáticamente.
export default ${JSON.stringify(data, null, 2)};
`;

  const outPath = path.resolve(process.cwd(), `../src/data/locales/${langCode}.js`);
  fs.writeFileSync(outPath, content);
  console.log(`Finished ${langCode}! -> ${outPath}`);
}

async function main() {
  const langs = ['en', 'fr', 'tl'];
  for (const lang of langs) {
    await processTranslations(lang);
  }
}

main().catch(console.error);
