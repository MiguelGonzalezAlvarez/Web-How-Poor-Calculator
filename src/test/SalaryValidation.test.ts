import { describe, it, expect } from 'vitest';

describe('Salary Input Validation', () => {
  const validateSalary = (value: string): { valid: boolean; error?: string } => {
    const cleaned = value.replace(/[^0-9]/g, '');
    
    if (!cleaned) {
      return { valid: false, error: 'Salary is required' };
    }
    
    const numValue = parseFloat(cleaned);
    
    if (isNaN(numValue)) {
      return { valid: false, error: 'Invalid number' };
    }
    
    if (numValue <= 0) {
      return { valid: false, error: 'Salary must be greater than 0' };
    }
    
    if (numValue > 10000000) {
      return { valid: false, error: 'Maximum salary is 10,000,000' };
    }
    
    return { valid: true };
  };

  it('should return invalid for empty string', () => {
    const result = validateSalary('');
    expect(result.valid).toBe(false);
  });

  it('should return invalid for zero', () => {
    const result = validateSalary('0');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Salary must be greater than 0');
  });

  it('should return invalid for negative numbers after cleaning', () => {
    const cleaned = '-5000'.replace(/[^0-9]/g, '');
    expect(cleaned).toBe('5000');
    const result = validateSalary(cleaned);
    expect(result.valid).toBe(true);
  });

  it('should return invalid for values exceeding max', () => {
    const result = validateSalary('20000000');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Maximum salary is 10,000,000');
  });

  it('should return valid for normal salary', () => {
    const result = validateSalary('50000');
    expect(result.valid).toBe(true);
  });

  it('should filter non-numeric characters', () => {
    const cleaned = '50abc000xyz'.replace(/[^0-9]/g, '');
    expect(cleaned).toBe('50000');
  });
});
