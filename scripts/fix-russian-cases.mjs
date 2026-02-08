import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('./data/country-metadata.js', 'utf-8');

const fixes = [
  // Feminine nouns ending in -а
  { name: 'Польша', prep: 'Польше', acc: 'Польшу' },
  { name: 'Украина', prep: 'Украине', acc: 'Украину' },
  { name: 'Ботсвана', prep: 'Ботсване', acc: 'Ботсвану' },
  { name: 'Куба', prep: 'Кубе', acc: 'Кубу' },
  { name: 'Гана', prep: 'Гане', acc: 'Гану' },
  { name: 'Гватемала', prep: 'Гватемале', acc: 'Гватемалу' },
  { name: 'Гайана', prep: 'Гайане', acc: 'Гайану' },
  { name: 'Мальта', prep: 'Мальте', acc: 'Мальту' },
  { name: 'Молдова', prep: 'Молдове', acc: 'Молдову' },
  { name: 'Мьянма', prep: 'Мьянме', acc: 'Мьянму' },
  { name: 'Никарагуа', prep: 'Никарагуа', acc: 'Никарагуа' }, // indeclinable
  { name: 'Панама', prep: 'Панаме', acc: 'Панаму' },
  { name: 'Руанда', prep: 'Руанде', acc: 'Руанду' },
  { name: 'Тонга', prep: 'Тонге', acc: 'Тонгу' },
  { name: 'Уганда', prep: 'Уганде', acc: 'Уганду' },
  { name: 'Венесуэла', prep: 'Венесуэле', acc: 'Венесуэлу' },
  { name: 'Антарктида', prep: 'Антарктиде', acc: 'Антарктиду' },
  { name: 'Гваделупа', prep: 'Гваделупе', acc: 'Гваделупу' },
  { name: 'Мартиника', prep: 'Мартинике', acc: 'Мартинику' },
  { name: 'Майотта', prep: 'Майотте', acc: 'Майотту' },
  
  // Plural nouns
  { name: 'Нидерланды', prep: 'Нидерландах', acc: 'Нидерланды' },
  { name: 'Коморы', prep: 'Коморах', acc: 'Коморы' },
  { name: 'Мальдивы', prep: 'Мальдивах', acc: 'Мальдивы' },
  { name: 'Филиппины', prep: 'Филиппинах', acc: 'Филиппины' },
  { name: 'Сейшелы', prep: 'Сейшелах', acc: 'Сейшелы' },
  
  // Phrase
  { name: 'Неизвестная страна', prep: 'Неизвестной стране', acc: 'Неизвестную страну' },
];

let fixCount = 0;

fixes.forEach(fix => {
  const regex = new RegExp(
    `(name_ru: "${fix.name}",\\s*name_ru_prep: )"${fix.name}"(,\\s*name_ru_acc: )"${fix.name}"`,
    'g'
  );
  
  const newContent = content.replace(regex, `$1"${fix.prep}"$2"${fix.acc}"`);
  if (newContent !== content) {
    console.log(`✅ Fixed: ${fix.name} → prep: ${fix.prep}, acc: ${fix.acc}`);
    content = newContent;
    fixCount++;
  }
});

writeFileSync('./data/country-metadata.js', content);

console.log(`\n✨ Fixed ${fixCount} countries`);
