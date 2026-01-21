# Plan: Simplify Country Providers UI

## Context
The user wants to simplify the "Mobile Network Operators" section on country pages (e.g., `/en/country/send-sms-estonia`). 
The current design is too cluttered with difficult-to-maintain statistics (Market Share, Coverage, Delivery Rate) and repetitive "Get Started" buttons.
The goal is a cleaner, more concise list of providers that focuses on Name, Price, and Features, strictly for mobile networks.

## Proposed Changes

### 1. Modify `src/components/country/MobileProviders.astro`
- **Remove Statistics Grid**: Delete the `provider-stats` div containing Market Share, Coverage, and Delivery Rate.
- **Remove Individual CTA**: Delete the "Get Started" button at the bottom of each provider card.
- **Adjust Layout**:
    - The cards will become shorter.
    - Keep the logo/icon, name, price, features, and description.
    - Ensure the grid layout still looks good with shorter cards.

### 2. Verify Data Usage
- The `CountryProvider` interface in `src/utils/kv-pricing.ts` has optional fields for `marketShare`, `features`, etc. We will simply stop rendering them in the component. No changes needed to the data structure itself (keeping it backward compatible).

### 3. Visual Reference
**Current:**
[Logo] [Name] [Price]
[Stats: Share | Coverage | Rate]
[Features]
[Description]
[Button: Get Started]

**New:**
[Logo] [Name] [Price]
[Features]
[Description]

## User Review Required
> [!NOTE]
> This change will apply to ALL auto-generated country pages immediately upon rebuild.

## Verification
- Build and preview `/en/country/send-sms-estonia`.
- visually confirm the "Network Operators" section is cleaner.
- ensure no "Landline" text is present (already confirmed absent).
