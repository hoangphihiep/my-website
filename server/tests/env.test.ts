import { describe, it, expect } from 'vitest';
import { validateEnv } from '../src/config/env.js';

describe('validateEnv', () => {
  describe('Nhánh kiểm tra biến TRUST_PROXY_HOPS', () => {
    it('1. ném lỗi khi thiếu biến (undefined)', () => {
      expect(() => validateEnv({})).toThrow(/TRUST_PROXY_HOPS/);
      expect(() => validateEnv({ TRUST_PROXY_HOPS: undefined })).toThrow(/TRUST_PROXY_HOPS/);
    });

    it('2. ném lỗi khi biến rỗng ("")', () => {
      expect(() => validateEnv({ TRUST_PROXY_HOPS: '' })).toThrow(/TRUST_PROXY_HOPS/);
    });

    it('3. ném lỗi khi giá trị âm ("-1")', () => {
      expect(() => validateEnv({ TRUST_PROXY_HOPS: '-1' })).toThrow(/TRUST_PROXY_HOPS/);
    });

    it('4. ném lỗi khi giá trị không phải là số ("abc")', () => {
      expect(() => validateEnv({ TRUST_PROXY_HOPS: 'abc' })).toThrow(/TRUST_PROXY_HOPS/);
    });

    it('5. ném lỗi khi giá trị là số lẻ / số thập phân ("1.5")', () => {
      expect(() => validateEnv({ TRUST_PROXY_HOPS: '1.5' })).toThrow(/TRUST_PROXY_HOPS/);
    });
  });

  describe('Nhánh kiểm tra ràng buộc môi trường (Production vs Development)', () => {
    it('6. ném lỗi trên môi trường production với TRUST_PROXY_HOPS = 0', () => {
      expect(() =>
        validateEnv({
          NODE_ENV: 'production',
          TRUST_PROXY_HOPS: '0',
        }),
      ).toThrow(/Production/);
    });

    it('7. hợp lệ trên môi trường production với TRUST_PROXY_HOPS = 1', () => {
      const result = validateEnv({
        NODE_ENV: 'production',
        TRUST_PROXY_HOPS: '1',
      });

      expect(result).toEqual({
        PORT: 5000,
        NODE_ENV: 'production',
        TRUST_PROXY_HOPS: 1,
      });
    });

    it('8. hợp lệ trên môi trường development với TRUST_PROXY_HOPS = 0', () => {
      const result = validateEnv({
        NODE_ENV: 'development',
        TRUST_PROXY_HOPS: '0',
      });

      expect(result).toEqual({
        PORT: 5000,
        NODE_ENV: 'development',
        TRUST_PROXY_HOPS: 0,
      });
    });
  });
});
