import React from 'react';
import styles from './App.module.css';

export const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.brandName} id="shop-title">
            VietElectro
          </h1>
          <span className={styles.badge}>Hạ tầng P1.1</span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.heroCard}>
          <h2 className={styles.heroTitle}>Siêu Thị Điện Máy & Gia Dụng VietElectro</h2>
          <p className={styles.heroSubtitle}>
            Hệ sinh thái thương mại điện tử chuyên ngành điện lạnh, gia dụng và thiết bị số chính
            hãng tại Việt Nam.
          </p>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Phiên bản</div>
              <div className={styles.infoValue}>1.0.0-scaffold</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Kiến trúc</div>
              <div className={styles.infoValue}>React (Vite) + Node.js (Express)</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Giao diện</div>
              <div className={styles.infoValue}>CSS Modules (Mobile-First)</div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} VietElectro. Hệ thống đang trong giai đoạn khởi tạo hạ
          tầng.
        </p>
      </footer>
    </div>
  );
};

export default App;
