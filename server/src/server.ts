import app from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT, () => {
  console.log(`[VietElectro Server] Đang chạy tại http://localhost:${env.PORT}`);
  console.log(`[VietElectro Server] Môi trường: ${env.NODE_ENV}, Trust Proxy Hops: ${env.TRUST_PROXY_HOPS}`);
});

export default server;
