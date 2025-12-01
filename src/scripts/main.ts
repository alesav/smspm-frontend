// Main Application Script for SMSPM Frontend
interface LanguageData {
    flag: string;
    name: string;
}

interface Languages {
    [key: string]: LanguageData;
}

document.addEventListener('DOMContentLoaded', function() {
    // Language Selector
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const langText = document.querySelector('.lang-text');

    // Language data
    const languages: Languages = {
        en: { flag: '🇬🇧', name: 'EN' },
        et: { flag: '🇪🇪', name: 'ET' },
        ru: { flag: '🇷🇺', name: 'RU' },
        es: { flag: '🇪🇸', name: 'ES' },
        de: { flag: '🇩🇪', name: 'DE' },
        fr: { flag: '🇫🇷', name: 'FR' }
    };

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', function(this: HTMLElement, e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            const langData = selectedLang ? languages[selectedLang] : null;
            
            if (langData && langText) {
                langText.textContent = langData.name;
                const flagElement = document.querySelector('.lang-btn .flag');
                if (flagElement) {
                    flagElement.textContent = langData.flag;
                }
            }
        });
    });

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(this: HTMLElement) {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !href.includes('signup') && !href.includes('login') && !href.includes('demo') && !href.includes('contact')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const targetElement = target as HTMLElement;
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Code copy functionality
    const copyBtn = document.querySelector('.code-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const codeElement = document.querySelector('.code-body code');
            if (codeElement && navigator.clipboard) {
                const code = codeElement.textContent || '';
                
                navigator.clipboard.writeText(code).then(() => {
                    const originalHTML = copyBtn.innerHTML;
                    copyBtn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.7 5.3L8 14L3.3 9.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Copied!
                    `;
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHTML;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar') as HTMLElement;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Animate elements on scroll
    const observerOptions: IntersectionObserverInit = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target as HTMLElement;
                target.style.opacity = '1';
                target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and other elements
    document.querySelectorAll('.feature-card, .testimonial-card, .stat-card').forEach(el => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Code tab switching
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeExamples: { [key: string]: string } = {
        javascript: `import SMSPM from 'smspm-sdk';

const client = new SMSPM({
  apiKey: 'your_api_key_here'
});

await client.messages.send({
  to: '+1234567890',
  from: 'SMSPM',
  text: 'Hello from SMSPM! 🚀'
});

// That's it! Message sent globally.`,
        python: `from smspm import Client

client = Client(api_key='your_api_key_here')

client.messages.send(
    to='+1234567890',
    from_='SMSPM',
    text='Hello from SMSPM! 🚀'
)

# That's it! Message sent globally.`,
        php: `<?php
require 'vendor/autoload.php';

use SMSPM\\Client;

$client = new Client([
    'apiKey' => 'your_api_key_here'
]);

$client->messages->send([
    'to' => '+1234567890',
    'from' => 'SMSPM',
    'text' => 'Hello from SMSPM! 🚀'
]);

// That's it! Message sent globally.`
    };

    codeTabs.forEach(tab => {
        tab.addEventListener('click', function(this: HTMLElement) {
            // Remove active class from all tabs
            codeTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update code example
            const lang = this.getAttribute('data-lang');
            const codeBody = document.querySelector('.code-body code');
            if (codeBody && lang && codeExamples[lang]) {
                codeBody.textContent = codeExamples[lang];
            }
        });
    });

    // Floating cards animation enhancement
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card) => {
        const cardElement = card as HTMLElement;
        
        cardElement.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        cardElement.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add parallax effect to hero gradient
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroGradient = document.querySelector('.hero-gradient-bg') as HTMLElement;
        if (heroGradient && scrolled < window.innerHeight) {
            heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Stats counter animation
    function animateValue(element: HTMLElement, start: number, end: number, duration: number) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Stats section observer
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const statElement = stat as HTMLElement;
                    const text = statElement.textContent || '';
                    const hasPlus = text.includes('+');
                    const hasBillion = text.includes('B');
                    const hasK = text.includes('K');
                    const hasPercent = text.includes('%');
                    const hasMs = text.includes('ms');
                    
                    let number = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                    
                    if (hasBillion) {
                        statElement.textContent = '0B+';
                        setTimeout(() => {
                            let current = 0;
                            const interval = setInterval(() => {
                                current++;
                                statElement.textContent = current + 'B+';
                                if (current >= number) {
                                    clearInterval(interval);
                                }
                            }, 100);
                        }, 200);
                    } else if (hasK) {
                        statElement.textContent = '0+';
                        setTimeout(() => {
                            let current = 0;
                            const interval = setInterval(() => {
                                current += 500;
                                statElement.textContent = current.toLocaleString() + '+';
                                if (current >= number) {
                                    statElement.textContent = number.toLocaleString() + '+';
                                    clearInterval(interval);
                                }
                            }, 50);
                        }, 200);
                    } else if (hasPercent) {
                        statElement.textContent = '0%';
                        setTimeout(() => {
                            let current = 0;
                            const interval = setInterval(() => {
                                current += 0.1;
                                statElement.textContent = current.toFixed(1) + '%';
                                if (current >= number) {
                                    statElement.textContent = text;
                                    clearInterval(interval);
                                }
                            }, 20);
                        }, 200);
                    } else if (!hasMs && hasPlus) {
                        statElement.textContent = '0+';
                        setTimeout(() => {
                            let current = 0;
                            const increment = number / 50;
                            const interval = setInterval(() => {
                                current += increment;
                                statElement.textContent = Math.floor(current).toLocaleString() + '+';
                                if (current >= number) {
                                    statElement.textContent = number.toLocaleString() + '+';
                                    clearInterval(interval);
                                }
                            }, 30);
                        }, 200);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});