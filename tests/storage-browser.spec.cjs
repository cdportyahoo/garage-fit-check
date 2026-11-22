const { test, expect } = require('@playwright/test');

test('storage controls, height warning, and saved layout survive reload', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8765/index.html');
  await expect(page.locator('#status')).not.toHaveText('Checking…');
  await page.locator('#add').click();
  await page.locator('#addRack').click();
  await expect(page.locator('#storageHeightDetails')).toBeVisible();
  await expect(page.locator('#mountHeight')).toHaveValue('84');
  await page.locator('#ceilingHeight').fill('80');
  await expect(page.locator('#heightCheck')).toContainText('extends above');
  await expect(page.locator('#status')).toHaveText('STOP');
  await page.locator('#ceilingHeight').fill('120');
  await page.locator('#vehicleHeight').fill('72');
  await page.locator('#layoutName').fill('Browser test layout');
  await page.locator('#save').click();
  await expect(page.locator('#savedPlans option')).toContainText(['Browser test layout']);
  await page.reload();
  await page.locator('#load').click();
  await page.once('dialog', dialog => dialog.accept());
  await expect(page.locator('#ceilingHeight')).toHaveValue('120');
  await expect(page.locator('#vehicleHeight')).toHaveValue('72');
  await expect(page.locator('#cabinetChoices')).toContainText('Rack');
  expect(errors).toEqual([]);
});

test('shelf and cabinet can be added without runtime errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8765/index.html');
  await page.locator('#add').click();
  await page.locator('#addShelf').click();
  await expect(page.locator('#cabinetChoices')).toContainText('Shelf');
  await page.locator('#add').click();
  await page.locator('#addCabinet').click();
  await expect(page.locator('#cabinetChoices')).toContainText('Cabinet');
  expect(errors).toEqual([]);
});
