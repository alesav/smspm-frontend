#!/usr/bin/env node

// Test navigation translation with cookies
async function testNavigationTranslation() {
  console.log('Testing navigation translation...\n');

  // Test 1: With Estonian cookie - check navigation
  console.log('Test 1: Navigation with preferred-language=et cookie');
  const response1 = await fetch('http://localhost:4323/', {
    headers: {
      'Cookie': 'preferred-language=et',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html1 = await response1.text();
  
  // Check for Estonian navigation text
  const hasEstonianNav = html1.includes('Hinnad') && 
                         html1.includes('Kasutajatugi') && 
                         html1.includes('Logi sisse');
  
  // Check for Estonian content
  const hasEstonianContent = html1.includes('Globaalne SMS-ide saatmine');
  
  console.log(`Navigation: ${hasEstonianNav ? '✅ Estonian' : '❌ English'}`);
  console.log(`Content: ${hasEstonianContent ? '✅ Estonian' : '❌ English'}`);
  console.log();

  // Test 2: With Russian cookie - check navigation
  console.log('Test 2: Navigation with preferred-language=ru cookie');
  const response2 = await fetch('http://localhost:4323/', {
    headers: {
      'Cookie': 'preferred-language=ru',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html2 = await response2.text();
  
  // Check for Russian navigation text
  const hasRussianNav = html2.includes('Цены') && 
                        html2.includes('Поддержка') && 
                        html2.includes('Вход');
  
  // Check for Russian content
  const hasRussianContent = html2.includes('Глобальные SMS-рассылки');
  
  console.log(`Navigation: ${hasRussianNav ? '✅ Russian' : '❌ English'}`);
  console.log(`Content: ${hasRussianContent ? '✅ Russian' : '❌ English'}`);
  console.log();

  // Test 3: Default English
  console.log('Test 3: Navigation with no cookie (default English)');
  const response3 = await fetch('http://localhost:4323/', {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html3 = await response3.text();
  
  // Check for English navigation text
  const hasEnglishNav = html3.includes('Pricing') && 
                        html3.includes('Support') && 
                        html3.includes('Login');
  
  // Check for English content
  const hasEnglishContent = html3.includes('Global SMS Messaging');
  
  console.log(`Navigation: ${hasEnglishNav ? '✅ English' : '❌ Other language'}`);
  console.log(`Content: ${hasEnglishContent ? '✅ English' : '❌ Other language'}`);
  console.log();

  console.log('All navigation tests completed!');
}

testNavigationTranslation().catch(console.error);
