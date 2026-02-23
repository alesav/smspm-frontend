/**
 * GSM 03.38 Character Set
 * Complete list of characters supported in standard GSM 7-bit encoding
 */

// Basic GSM characters (single byte, 1 character = 1 character count)
export const GSM_7BIT_BASIC = [
  '@', '£', '$', '¥', 'è', 'é', 'ù', 'ì', 'ò', 'Ç', '\n', 'Ø', 'ø', '\r', 'Å', 'å',
  'Δ', '_', 'Φ', 'Γ', 'Λ', 'Ω', 'Π', 'Ψ', 'Σ', 'Θ', 'Ξ', '\x1B', 'Æ', 'æ', 'ß', 'É',
  ' ', '!', '"', '#', '¤', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?',
  '¡', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ñ', 'Ü', '§',
  '¿', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ñ', 'ü', 'à'
];

// Extended GSM characters (escaped, 1 character = 2 character count)
export const GSM_7BIT_EXTENDED = [
  '|', '^', '€', '{', '}', '[', ']', '~', '\\'
];

const GSM_7BIT_BASIC_SET = new Set(GSM_7BIT_BASIC);
const GSM_7BIT_EXTENDED_SET = new Set(GSM_7BIT_EXTENDED);

/**
 * Check if character is in GSM 7-bit basic charset
 */
export function isGsmBasic(char: string): boolean {
  return GSM_7BIT_BASIC_SET.has(char);
}

/**
 * Check if character is in GSM 7-bit extended charset (counts as 2)
 */
export function isGsmExtended(char: string): boolean {
  return GSM_7BIT_EXTENDED_SET.has(char);
}

/**
 * Check if character is GSM 7-bit compatible
 */
export function isGsmChar(char: string): boolean {
  return isGsmBasic(char) || isGsmExtended(char);
}

/**
 * Check if entire text can be encoded in GSM 7-bit
 */
export function isGsmText(text: string): boolean {
  for (const char of text) {
    if (!isGsmChar(char)) {
      return false;
    }
  }
  return true;
}

/**
 * Get character count in GSM encoding
 * Extended characters count as 2
 */
export function getGsmCharCount(text: string): number {
  let count = 0;
  for (const char of text) {
    if (isGsmExtended(char)) {
      count += 2;
    } else if (isGsmBasic(char)) {
      count += 1;
    } else {
      // Non-GSM character found, return -1 to indicate incompatibility
      return -1;
    }
  }
  return count;
}

/**
 * Find all non-GSM characters in text
 */
export function findNonGsmChars(text: string): Array<{ char: string; position: number }> {
  const nonGsmChars: Array<{ char: string; position: number }> = [];
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (!isGsmChar(char)) {
      nonGsmChars.push({ char, position: i });
    }
  }
  
  return nonGsmChars;
}

/**
 * Common character replacements to convert Unicode to GSM
 */
export const UNICODE_TO_GSM_MAP: Record<string, string> = {
  // Smart quotes
  '\u201C': '"',
  '\u201D': '"',
  '\u2018': "'",
  '\u2019': "'",
  
  // Dashes
  '—': '-',
  '–': '-',
  '−': '-',
  
  // Spaces
  '\u00A0': ' ', // Non-breaking space
  '\u2009': ' ', // Thin space
  
  // Other common
  '…': '...',
  '•': '*',
  '°': 'o',
  '×': 'x',
  '÷': '/',
  '™': '(TM)',
  '©': '(c)',
  '®': '(R)',
};

/**
 * Suggest GSM-compatible alternatives for text
 */
export function suggestGsmAlternatives(text: string): string {
  let result = text;
  
  for (const [unicode, gsm] of Object.entries(UNICODE_TO_GSM_MAP)) {
    result = result.replace(new RegExp(unicode, 'g'), gsm);
  }
  
  return result;
}