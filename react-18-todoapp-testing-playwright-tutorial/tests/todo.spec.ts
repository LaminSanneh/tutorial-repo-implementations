import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Todo List');
  });

  test('should add a new todo', async ({ page }) => {
    await page.fill('input[type="text"]', 'New Todo');
    await page.click('button[type="submit"]');
    await expect(page.locator('li')).toContainText('New Todo');
  });

  test('should toggle a todo', async ({ page }) => {
    await page.fill('input[type="text"]', 'Toggle Todo');
    await page.click('button[type="submit"]');
    const todoItem = page.locator('li').filter({ hasText: 'Toggle Todo' });
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('should delete a todo', async ({ page }) => {
    await page.fill('input[type="text"]', 'Delete Todo');
    await page.click('button[type="submit"]');
    const todoItem = page.locator('li').filter({ hasText: 'Delete Todo' });
    await todoItem.locator('button').click();
    await expect(todoItem).toHaveCount(0);
  });

  test('should filter todos', async ({ page }) => {
    await page.fill('input[type="text"]', 'Completed Todo');
    await page.click('button[type="submit"]');
    await page.locator('li').filter({ hasText: 'Completed Todo' }).locator('input[type="checkbox"]').check();

    await page.fill('input[type="text"]', 'Active Todo');
    await page.click('button[type="submit"]');

    await page.click('button:has-text("Completed")');
    await expect(page.locator('li')).toHaveCount(1);
    await expect(page.locator('li')).toContainText('Completed Todo');

    await page.click('button:has-text("Active")');
    await expect(page.locator('li')).toHaveCount(1);
    await expect(page.locator('li')).toContainText('Active Todo');

    await page.click('button:has-text("All")');
    await expect(page.locator('li')).toHaveCount(2);
  });
});
