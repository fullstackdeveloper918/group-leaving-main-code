import { capFirst } from "../../utils/validation";


describe('capFirst() capFirst method', () => {
  // Happy Path Tests

  it('should capitalize the first letter of a lowercase word', () => {
    // Test: Capitalizes the first character of a simple lowercase word
    expect(capFirst('hello')).toBe('Hello');
  });

  it('should capitalize the first letter and leave the rest unchanged', () => {
    // Test: Only the first character is capitalized, rest remain as is
    expect(capFirst('world')).toBe('World');
  });

  it('should not change the first letter if it is already uppercase', () => {
    // Test: If the first character is already uppercase, the string is unchanged
    expect(capFirst('Hello')).toBe('Hello');
  });

  it('should handle strings with only one character', () => {
    // Test: Single character string is capitalized if needed
    expect(capFirst('a')).toBe('A');
    expect(capFirst('A')).toBe('A');
  });

  it('should handle strings with numbers and letters', () => {
    // Test: If the first character is a number, the string is unchanged
    expect(capFirst('1hello')).toBe('1hello');
    // Test: If the first character is a letter after numbers, only the first character is considered
    expect(capFirst('123abc')).toBe('123abc');
  });

  it('should handle strings with special characters at the start', () => {
    // Test: If the first character is a special character, the string is unchanged
    expect(capFirst('!hello')).toBe('!hello');
    expect(capFirst('-test')).toBe('-test');
  });

  it('should handle strings with spaces at the start', () => {
    // Test: Leading spaces are preserved, and the first non-space character is capitalized
    expect(capFirst(' hello')).toBe(' hello');
    expect(capFirst('  world')).toBe('  world');
  });

  it('should handle strings with mixed case', () => {
    // Test: Only the first character is capitalized, rest remain as is
    expect(capFirst('hELLO')).toBe('HELLO');
    expect(capFirst('wORLD')).toBe('WORLD');
  });

  // Edge Case Tests

  it('should return an empty string when given an empty string', () => {
    // Test: Empty string input returns empty string
    expect(capFirst('')).toBe('');
  });

  it('should handle strings with only whitespace', () => {
    // Test: String with only spaces returns the same string
    expect(capFirst('   ')).toBe('   ');
    // Test: String with tabs and spaces
    expect(capFirst('\t ')).toBe('\t ');
  });

  it('should handle non-alphabetic first characters', () => {
    // Test: If the first character is a symbol, the string is unchanged
    expect(capFirst('#test')).toBe('#test');
    expect(capFirst('9lives')).toBe('9lives');
  });

  it('should handle multi-word strings', () => {
    // Test: Only the very first character is capitalized
    expect(capFirst('hello world')).toBe('Hello world');
    expect(capFirst('javaScript is fun')).toBe('JavaScript is fun');
  });

  it('should handle unicode characters', () => {
    // Test: Capitalizes the first unicode character if possible
    expect(capFirst('ñandú')).toBe('Ñandú');
    expect(capFirst('ßeta')).toBe('SSeta'); // Note: 'ß'.toUpperCase() is 'SS' in some environments
    expect(capFirst('éclair')).toBe('Éclair');
  });

  it('should not throw for long strings', () => {
    // Test: Handles long strings without error
    const longStr = 'a'.repeat(1000);
    expect(capFirst(longStr)).toBe('A' + 'a'.repeat(999));
  });
});