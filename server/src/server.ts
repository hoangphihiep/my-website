import { validateEnv, AppEnv } from './config/env.js';

let appEnv: AppEnv;
try {
  appEnv = validateEnv(process.env);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`FATAL: Cấu hình môi trường không hợp lệ: ${message}`);
  process.exit(1);
}

const { default: app } = await import('./app.js');

const server = app.listen(appEnv.PORT, () => {
  console.log(`[VietElectro Server] Đang chạy tại http://localhost:${appEnv.PORT}`);
  console.log(
    `[VietElectro Server] Môi trường: ${appEnv.NODE_ENV}, Trust Proxy Hops: ${appEnv.TRUST_PROXY_HOPS}`,
  );
});

export default server;
