/**
 * SMS Message Analysis and Segmentation
 * Calculates character counts, message parts, and encoding type
 */

import { isGsmText, getGsmCharCount, findNonGsmChars, suggestGsmAlternatives } from './gsm-charset';

export type EncodingType = 'GSM-7' | 'Unicode';

export interface SmsAnalysis {
  // Text info
  text: string;
  length: number; // Actual character count in text
  
  // Encoding
  encoding: EncodingType;
  charCount: number; // Character count for billing (GSM extended chars count as 2)
  
  // Message segmentation
  messageCount: number; // Number of SMS parts
  charsPerMessage: number; // Available chars per part
  charsUsedInLastMessage: number;
  charsRemainingInLastMessage: number;
  
  // Unicode info
  isGsm: boolean;
  nonGsmChars: Array<{ char: string; position: number }>;
  suggestedText?: string; // GSM-compatible alternative
}

// SMS limits
const GSM_SINGLE_LIMIT = 160;
const GSM_CONCAT_LIMIT = 153;
const UNICODE_SINGLE_LIMIT = 70;
const UNICODE_CONCAT_LIMIT = 67;

/**
 * Analyze SMS text and return detailed information
 */
export function analyzeSms(text: string): SmsAnalysis {
  const length = text.length;
  const isGsm = isGsmText(text);
  
  let encoding: EncodingType;
  let charCount: number;
  let charsPerMessage: number;
  let nonGsmChars: Array<{ char: string; position: number }> = [];
  let suggestedText: string | undefined;
  
  if (isGsm) {
    encoding = 'GSM-7';
    charCount = getGsmCharCount(text);
    
    if (charCount <= GSM_SINGLE_LIMIT) {
      charsPerMessage = GSM_SINGLE_LIMIT;
    } else {
      charsPerMessage = GSM_CONCAT_LIMIT;
    }
  } else {
    encoding = 'Unicode';
    charCount = length;
    
    if (charCount <= UNICODE_SINGLE_LIMIT) {
      charsPerMessage = UNICODE_SINGLE_LIMIT;
    } else {
      charsPerMessage = UNICODE_CONCAT_LIMIT;
    }
    
    // Find problematic characters
    nonGsmChars = findNonGsmChars(text);
    
    // Suggest GSM alternative
    suggestedText = suggestGsmAlternatives(text);
    if (suggestedText === text) {
      suggestedText = undefined; // No changes made
    }
  }
  
  // Calculate message count
  const messageCount = charCount === 0 ? 0 : Math.ceil(charCount / charsPerMessage);
  
  // Calculate remaining chars
  const charsUsedInLastMessage = charCount === 0 ? 0 : 
    charCount % charsPerMessage || charsPerMessage;
  const charsRemainingInLastMessage = charsPerMessage - charsUsedInLastMessage;
  
  return {
    text,
    length,
    encoding,
    charCount,
    messageCount,
    charsPerMessage,
    charsUsedInLastMessage,
    charsRemainingInLastMessage,
    isGsm,
    nonGsmChars,
    suggestedText,
  };
}

/**
 * Calculate SMS cost
 */
export interface SmsCostCalculation {
  messageCount: number;
  pricePerMessage: number;
  totalCost: number;
  currency: string;
}

export function calculateSmsCost(
  messageCount: number,
  pricePerMessage: number,
  currency: string = 'EUR'
): SmsCostCalculation {
  return {
    messageCount,
    pricePerMessage,
    totalCost: messageCount * pricePerMessage,
    currency,
  };
}

/**
 * Get average price from pricelist
 */
export function getAverageSmsPrice(pricelist: any): number {
  if (!pricelist || !pricelist.countries) {
    return 0.05; // Default fallback
  }
  
  let totalPrice = 0;
  let count = 0;
  
  for (const country of pricelist.countries) {
    if (country.providers && country.providers.length > 0) {
      for (const provider of country.providers) {
        totalPrice += provider.price;
        count++;
      }
    }
  }
  
  return count > 0 ? totalPrice / count : 0.05;
}