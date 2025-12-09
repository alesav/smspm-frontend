# Country Pages Documentation

## Overview

The SMSPM frontend includes a comprehensive country pages system that automatically generates SEO-optimized pages for different countries with dynamic pricing fetched from Cloudflare KV storage at build time.

## Features

- **Dynamic Pricing**: Fetches real-time pricing from Cloudflare KV storage during build
- **SEO Optimized**: Rich meta tags, structured data, and country-specific content
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Multi-operator Support**: Displays pricing for all mobile operators in each country
- **Compliance Information**: Country-specific regulations and requirements
- **Use Cases**: Localized business use cases for each market
- **API Integration**: Country-specific API examples with local phone formats

## File Structure

```
src/
├── pages/en/country/
│   ├── send-sms-estonia.astro         # Estonia page
│   ├── send-sms-united-kingdom.astro  # UK page
│   ├── send-sms-germany.astro         # Germany page
│   ├── send-sms-france.astro          # France page
│   └── send-sms-spain.astro           # Spain page
├── components/country/
│   ├── CountryHero.astro              # Hero section
│   ├── CountryInfo.astro              # Market information
│   ├── MobileProviders.astro          # Operator pricing
│   ├── UseCases.astro                 # Business use cases
│   ├── ApiIntegration.astro           # API examples
│   └── RegulatoryInfo.astro           # Compliance info
├── utils/
│   ├── kv-pricing.ts                  # KV data fetching
│   └── country-data.ts                # Country configurations
└── scripts/
    └── generate-country-pages.mjs     # Page generator
```

## Configuration

### Environment Variables

Configure these environment variables to fetch pricing from Cloudflare KV:

```bash
# Required for KV access
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_KEY=your_api_key
CLOUDFLARE_EMAIL=your_email
KV_PRICELIST_NAMESPACE_ID=your_kv_namespace_id
```

### KV Data Structure

The pricing data in Cloudflare KV should follow this structure:

```json
{
  "Estonia - Telia": {"p": 0.032},
  "Estonia - Elisa": {"p": 0.035},
  "Estonia - Tele2": {"p": 0.038},
  "United Kingdom - EE": {"p": 0.025},
  "United Kingdom - O2": {"p": 0.027},
  "United Kingdom - Vodafone": {"p": 0.026},
  "United Kingdom - Three": {"p": 0.028}
}
```

Key format: `"Country Name - Operator Name"`
Value format: `{"p": price_in_usd}`

## Country Data Configuration

Each country is configured in `src/utils/country-data.ts` with:

### Basic Information
- Country code (ISO 3166-1 alpha-2)
- Name, flag, population
- Mobile penetration statistics
- Timezone and currency

### Market Data
- Mobile users count
- Network coverage percentage
- Market description

### Use Cases
- Industry-specific use cases
- Example applications
- Icons for visual representation

### Regulations
- GDPR/local compliance requirements
- Time restrictions
- Opt-in requirements

### SEO Configuration
- Title and meta description
- Keywords array
- Structured data

## Build Process

### Static Generation

At build time, the system:

1. **Fetches Pricing Data**: Calls Cloudflare KV API to get latest prices
2. **Processes Data**: Extracts operator-specific pricing for each country
3. **Generates Pages**: Creates static HTML with embedded pricing data
4. **SEO Optimization**: Adds structured data and meta tags

### Build Commands

```bash
# Generate country pages only
npm run generate-countries

# Full build with country pages
npm run build-with-countries

# Development server
npm run dev
```

## Adding New Countries

### 1. Update Country Configuration

Add new country to `src/utils/country-data.ts`:

```typescript
export const COUNTRY_CONFIGS = {
  // ... existing countries
  'it': {
    code: 'it',
    name: 'Italy',
    flag: '🇮🇹',
    // ... full configuration
  }
};
```

### 2. Add Pricing Data

Update your KV storage with operator data:

```json
{
  "Italy - TIM": {"p": 0.045},
  "Italy - Vodafone": {"p": 0.043},
  "Italy - WindTre": {"p": 0.044}
}
```

### 3. Update Page Generator

Add the country to `scripts/generate-country-pages.mjs`:

```javascript
const countries = {
  // ... existing countries
  'it': { name: 'Italy', slug: 'send-sms-italy' },
};
```

### 4. Generate and Build

```bash
npm run generate-countries
npm run build
```

## SEO Features

### Meta Tags
- Country-specific titles and descriptions
- Keywords targeting local markets
- Geographic meta tags
- Open Graph and Twitter Cards

### Structured Data
- Service schema with pricing information
- Organization information
- Area served data
- Offer details for each operator

### Canonical URLs
- Proper canonical URLs for each country
- Hreflang attributes for internationalization
- Language-specific alternate links

## Performance Optimization

### Build Time Fetching
- Pricing data fetched once at build time
- No runtime API calls
- Fast page loads with static content

### Responsive Images
- Provider logos optimized for different screens
- Lazy loading for non-critical images
- WebP format with fallbacks

### CSS Optimization
- Critical CSS inlined
- Non-critical CSS deferred
- Tailwind CSS purging unused styles

## Accessibility

### WCAG 2.1 Compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support

### Color Contrast
- WCAG AA compliant color ratios
- Dark mode support
- Focus indicators

## Internationalization

### Multi-language Support
- English as default language
- Structure ready for additional languages
- Country-specific content localization

### Currency Display
- Automatic currency detection
- Proper currency formatting
- Local currency symbols

## Monitoring & Analytics

### Build Monitoring
- KV fetch error handling
- Fallback pricing data
- Build success/failure logging

### SEO Tracking
- Google Search Console integration ready
- Structured data validation
- Core Web Vitals monitoring

## Deployment

### Cloudflare Pages
- Optimized for Cloudflare Pages deployment
- Environment variables configuration
- Build hook integration

### Continuous Deployment
- Automatic builds on pricing updates
- Git-based deployment workflow
- Preview deployments for testing

## Troubleshooting

### Common Issues

**KV Fetch Failures**
- Check environment variables
- Verify API key permissions
- Confirm KV namespace exists

**Missing Country Data**
- Verify country code in configuration
- Check pricing data format
- Confirm operator name matching

**Build Errors**
- Check TypeScript errors
- Verify all imports exist
- Validate JSON structure

### Debug Mode

Enable verbose logging:

```bash
DEBUG=1 npm run build-with-countries
```

## Best Practices

### Pricing Updates
- Update KV data before builds
- Test with staging environment
- Monitor build success

### Content Quality
- Regular content audits
- A/B testing for conversions
- User feedback integration

### Performance
- Monitor Core Web Vitals
- Optimize images regularly
- Review bundle size

## Security

### API Key Protection
- Use environment variables only
- Never commit keys to Git
- Rotate keys regularly

### Data Validation
- Validate pricing data format
- Sanitize user inputs
- Secure API endpoints

---

## Support

For questions or issues with the country pages system:
- Check the troubleshooting section
- Review build logs for errors
- Contact the development team

Built with ❤️ for SMSPM - Global SMS Messaging Platform