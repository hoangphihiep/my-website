import { test, expect } from '@playwright/test';

test.describe('Trang chủ VietElectro', () => {
  test('người dùng mở trang chủ thấy hiển thị tên thương hiệu VietElectro', async ({ page }) => {
    await page.goto('/');

    // Kiểm tra tên shop trên tiêu đề trang hoặc heading
    await expect(page).toHaveTitle(/VietElectro/);
    const shopHeading = page.locator('#shop-title');
    await expect(shopHeading).toBeVisible();
    await expect(shopHeading).toContainText('VietElectro');
  });
});
