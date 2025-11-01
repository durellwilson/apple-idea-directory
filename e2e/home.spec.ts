import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page.getByText('Infinite App Ideas')).toBeVisible();
    
    // Check description
    await expect(page.getByText(/AI-powered directory/i)).toBeVisible();
  });

  test('should display all platform cards', async ({ page }) => {
    await page.goto('/');
    
    // Check that all 8 platforms are visible
    await expect(page.getByText('iOS')).toBeVisible();
    await expect(page.getByText('macOS')).toBeVisible();
    await expect(page.getByText('iPadOS')).toBeVisible();
    await expect(page.getByText('watchOS')).toBeVisible();
    await expect(page.getByText('tvOS')).toBeVisible();
    await expect(page.getByText('visionOS')).toBeVisible();
    await expect(page.getByText('Web')).toBeVisible();
    await expect(page.getByText('AirPods')).toBeVisible();
  });

  test('should display featured ideas', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('MindfulMoments')).toBeVisible();
    await expect(page.getByText('CodeSnippet Pro')).toBeVisible();
    await expect(page.getByText('SpatialNotes')).toBeVisible();
    await expect(page.getByText('FocusFlow')).toBeVisible();
  });

  test('should navigate to generate page', async ({ page }) => {
    await page.goto('/');
    
    // Click the "Generate New Idea" button
    await page.getByText('Generate New Idea').click();
    
    // Should navigate to /generate
    await expect(page).toHaveURL('/generate');
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check nav links are present
    await expect(page.locator('nav').getByText('Explore')).toBeVisible();
    await expect(page.locator('nav').getByText('Generate')).toBeVisible();
    await expect(page.locator('nav').getByText('Submit')).toBeVisible();
  });
});
