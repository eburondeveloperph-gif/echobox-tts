import { test, expect } from '@playwright/test';

test('mobile responsive sidebar', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');
  
  const sidebar = page.locator('.sidebar');
  const toggle = page.locator('.sidebar-toggle');
  
  await expect(toggle).toBeVisible();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await expect(sidebar).toHaveClass(/open/);
  
  await toggle.click();
  await expect(sidebar).not.toHaveClass(/open/);
  
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();
  await page.waitForLoadState('networkidle');
  
  const sidebarBox = await sidebar.boundingBox();
  console.log('Mobile sidebar position:', sidebarBox);
});
