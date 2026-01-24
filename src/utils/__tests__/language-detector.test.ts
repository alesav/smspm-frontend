import { describe, it, expect } from 'vitest';
import { 
  detectLanguage, 
  getStoredLanguage, 
  getFinalLanguage,
  DEFAULT_LANGUAGE 
} from '../i18n/language-detector';

describe('Language Detection', () => {
  describe('detectLanguage', () => {
    it('should return default language for null input', () => {
      expect(detectLanguage(null)).toBe(DEFAULT_LANGUAGE);
    });

    it('should return default language for undefined input', () => {
      expect(detectLanguage(undefined)).toBe(DEFAULT_LANGUAGE);
    });

    it('should detect Estonian from Accept-Language', () => {
      expect(detectLanguage('et-EE,et;q=0.9,en;q=0.8')).toBe('et');
    });

    it('should detect Russian from Accept-Language', () => {
      expect(detectLanguage('ru-RU,ru;q=0.9,en;q=0.8')).toBe('ru');
    });

    it('should detect English from Accept-Language', () => {
      expect(detectLanguage('en-US,en;q=0.9')).toBe('en');
    });

    it('should prioritize by quality value', () => {
      expect(detectLanguage('en;q=0.5,et;q=0.9')).toBe('et');
    });

    it('should fall back to default for unsupported language', () => {
      expect(detectLanguage('zh-CN,zh;q=0.9')).toBe(DEFAULT_LANGUAGE);
    });
  });

  describe('getStoredLanguage', () => {
    it('should return null for no cookie', () => {
      expect(getStoredLanguage(null)).toBe(null);
    });

    it('should extract language from cookie', () => {
      expect(getStoredLanguage('preferred-language=et; other=value')).toBe('et');
    });

    it('should return null for invalid language in cookie', () => {
      expect(getStoredLanguage('preferred-language=xx; other=value')).toBe(null);
    });

    it('should extract Russian from cookie', () => {
      expect(getStoredLanguage('preferred-language=ru')).toBe('ru');
    });
  });

  describe('getFinalLanguage', () => {
    it('should prioritize stored preference over browser', () => {
      const result = getFinalLanguage('en-US', 'preferred-language=et');
      expect(result).toBe('et');
    });

    it('should fall back to browser detection if no stored preference', () => {
      const result = getFinalLanguage('ru-RU', null);
      expect(result).toBe('ru');
    });

    it('should use default if nothing available', () => {
      const result = getFinalLanguage(null, null);
      expect(result).toBe(DEFAULT_LANGUAGE);
    });
  });
});
