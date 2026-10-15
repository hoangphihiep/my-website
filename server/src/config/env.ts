import dotenv from 'dotenv';

// Tải biến môi trường từ .env
dotenv.config();

export interface AppEnv {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  TRUST_PROXY_HOPS: number;
}

export function validateEnv(): AppEnv {
  const rawHops = process.env.TRUST_PROXY_HOPS;

  // 1. Bắt buộc khai báo rõ ràng, không chấp nhận undefined, chuỗi rỗng hoặc định dạng không phải số nguyên không âm
  if (rawHops === undefined || rawHops === '' || !/^\d+$/.test(rawHops)) {
    console.error(
      'FATAL: Biến môi trường TRUST_PROXY_HOPS bắt buộc phải được khai báo rõ ràng và là một số nguyên không âm (>= 0). Ứng dụng từ chối khởi động!',
    );
    process.exit(1);
  }

  const trustProxyHops = parseInt(rawHops, 10);

  // 2. Ràng buộc nghiêm ngặt trên môi trường Production
  if (process.env.NODE_ENV === 'production' && trustProxyHops < 1) {
    console.error(
      'FATAL: Trên môi trường Production, TRUST_PROXY_HOPS bắt buộc phải >= 1 (Render nằm sau ít nhất 1 reverse proxy). Ứng dụng từ chối khởi động!',
    );
    process.exit(1);
  }

  const rawPort = process.env.PORT;
  let port = 5000;
  if (rawPort !== undefined && rawPort !== '') {
    if (!/^\d+$/.test(rawPort)) {
      console.error('FATAL: Biến môi trường PORT phải là số nguyên dương hợp lệ.');
      process.exit(1);
    }
    port = parseInt(rawPort, 10);
  }

  const nodeEnv = (process.env.NODE_ENV || 'development') as AppEnv['NODE_ENV'];
  if (!['development', 'production', 'test'].includes(nodeEnv)) {
    console.error(`FATAL: Biến môi trường NODE_ENV không hợp lệ: "${nodeEnv}".`);
    process.exit(1);
  }

  return {
    PORT: port,
    NODE_ENV: nodeEnv,
    TRUST_PROXY_HOPS: trustProxyHops,
  };
}

export const env = validateEnv();
