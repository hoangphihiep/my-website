import dotenv from 'dotenv';

// Tải biến môi trường từ .env
dotenv.config();

export interface AppEnv {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  TRUST_PROXY_HOPS: number;
}

export function validateEnv(rawEnv: NodeJS.ProcessEnv = process.env): AppEnv {
  const rawHops = rawEnv.TRUST_PROXY_HOPS;

  // 1. Bắt buộc khai báo rõ ràng, không chấp nhận undefined, chuỗi rỗng hoặc định dạng không phải số nguyên không âm
  if (rawHops === undefined || rawHops === '' || !/^\d+$/.test(rawHops)) {
    throw new Error(
      'Biến môi trường TRUST_PROXY_HOPS bắt buộc phải được khai báo rõ ràng và là một số nguyên không âm (>= 0).',
    );
  }

  const trustProxyHops = parseInt(rawHops, 10);

  const rawNodeEnv = rawEnv.NODE_ENV || 'development';
  if (!['development', 'production', 'test'].includes(rawNodeEnv)) {
    throw new Error(`Biến môi trường NODE_ENV không hợp lệ: "${rawNodeEnv}".`);
  }
  const nodeEnv = rawNodeEnv as AppEnv['NODE_ENV'];

  // 2. Ràng buộc nghiêm ngặt trên môi trường Production
  if (nodeEnv === 'production' && trustProxyHops < 1) {
    throw new Error(
      'Trên môi trường Production, TRUST_PROXY_HOPS bắt buộc phải >= 1 (Render nằm sau ít nhất 1 reverse proxy).',
    );
  }

  const rawPort = rawEnv.PORT;
  let port = 5000;
  if (rawPort !== undefined && rawPort !== '') {
    if (!/^\d+$/.test(rawPort)) {
      throw new Error('Biến môi trường PORT phải là số nguyên dương hợp lệ.');
    }
    port = parseInt(rawPort, 10);
  }

  return {
    PORT: port,
    NODE_ENV: nodeEnv,
    TRUST_PROXY_HOPS: trustProxyHops,
  };
}

let cachedEnv: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (!cachedEnv) {
    cachedEnv = validateEnv(process.env);
  }
  return cachedEnv;
}

export const env: AppEnv = new Proxy({} as AppEnv, {
  get(_target, prop: keyof AppEnv) {
    return getEnv()[prop];
  },
});
