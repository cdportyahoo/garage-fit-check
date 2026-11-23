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
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#load').click();
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
  await expect(page.locator('#cabinetChoices button')).toHaveCount(4);
  await expect(page.locator('#cabinetChoices button').last()).toHaveAttribute('aria-label', /Select.*cabinet/i);
  expect(errors).toEqual([]);
});

test('phone-sized layout supports storage controls and save', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:8765/index.html');
  await page.locator('#add').click();
  await expect(page.locator('#addShelf')).toBeVisible();
  await page.locator('#addShelf').click();
  await expect(page.locator('#storageHeightDetails')).toBeVisible();
  await page.locator('#mountHeight').fill('60');
  await page.locator('#mountHeight').dispatchEvent('change');
  await expect(page.locator('#mountHeight')).toHaveValue('60');
  await page.locator('#layoutName').fill('Phone storage layout');
  await page.locator('#save').click();
  await expect(page.locator('#savedPlans option')).toContainText(['Phone storage layout']);
  expect(errors).toEqual([]);
});

test('storage selection and resize mode work on a phone viewport', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:8765/index.html');
  await page.locator('#add').click();
  await page.locator('#addRack').click();
  await expect(page.locator('#cabinetChoices button').last()).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#resizeMode').click();
  await expect(page.locator('#resizeMode')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#moveMode').click();
  await expect(page.locator('#moveMode')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#remove').click();
  await expect(page.locator('#cabinetChoices')).not.toContainText('Rack');
  expect(errors).toEqual([]);
});
