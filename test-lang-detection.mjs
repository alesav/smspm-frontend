#!/usr/bin/env node

// Test language detection with cookies
async function testLanguageDetection() {
  console.log('Testing language detection...\n');

  // Test 1: With Estonian cookie
  console.log('Test 1: Request with preferred-language=et cookie');
  const response1 = await fetch('http://localhost:4322/', {
    headers: {
      'Cookie': 'preferred-language=et',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html1 = await response1.text();
  const hasEstonian1 = html1.includes('Globaalne SMS-ide saatmine') || html1.includes('Usaldatud 10 000+ ettevõtte poolt');
  console.log(`Result: ${hasEstonian1 ? '✅ Estonian detected' : '❌ English found'}`);
  console.log(`Status: ${response1.status}`);
  console.log();

  // Test 2: With Russian cookie
  console.log('Test 2: Request with preferred-language=ru cookie');
  const response2 = await fetch('http://localhost:4322/', {
    headers: {
      'Cookie': 'preferred-language=ru',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html2 = await response2.text();
  const hasRussian = html2.includes('Глобальные SMS-рассылки') || html2.includes('Нам доверяют более 10 000 компаний');
  console.log(`Result: ${hasRussian ? '✅ Russian detected' : '❌ English found'}`);
  console.log(`Status: ${response2.status}`);
  console.log();

  // Test 3: With Estonian Accept-Language header, no cookie
  console.log('Test 3: Request with Accept-Language: et-EE, no cookie');
  const response3 = await fetch('http://localhost:4322/', {
    headers: {
      'Accept-Language': 'et-EE,et;q=0.9,en;q=0.8'
    }
  });
  const html3 = await response3.text();
  const hasEstonian3 = html3.includes('Globaalne SMS-ide saatmine') || html3.includes('Usaldatud 10 000+ ettevõtte poolt');
  console.log(`Result: ${hasEstonian3 ? '✅ Estonian detected' : '❌ English found'}`);
  console.log(`Status: ${response3.status}`);
  console.log();

  // Test 4: Default (English)
  console.log('Test 4: Request with no cookie and Accept-Language: en-US');
  const response4 = await fetch('http://localhost:4322/', {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html4 = await response4.text();
  const hasEnglish = html4.includes('Global SMS Messaging') || html4.includes('Trusted by 10,000+ businesses');
  console.log(`Result: ${hasEnglish ? '✅ English detected' : '❌ Other language found'}`);
  console.log(`Status: ${response4.status}`);
  console.log();

  console.log('All tests completed!');
}

testLanguageDetection().catch(console.error);
