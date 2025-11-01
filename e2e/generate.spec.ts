import { test, expect } from '@playwright/test';

test.describe('Generate Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/generate');
    
    await expect(page.getByText('Generate App Idea')).toBeVisible();
    await expect(page.getByText(/AI-powered ideas with complete implementation details/i)).toBeVisible();
  });

  test('should display all platform options', async ({ page }) => {
    await page.goto('/generate');
    
    // Check that all 8 platforms are visible as buttons
    await expect(page.getByRole('button', { name: /iOS/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /macOS/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /iPadOS/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /watchOS/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /tvOS/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /visionOS/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Web/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /AirPods/i })).toBeVisible();
  });

  test('should allow platform selection', async ({ page }) => {
    await page.goto('/generate');
    
    // Click on macOS platform
    const macOSButton = page.getByRole('button', { name: /macOS/i }).first();
    await macOSButton.click();
    
    // Button should be visible and not disabled
    await expect(macOSButton).toBeVisible();
    await expect(macOSButton).not.toBeDisabled();
  });

  test('should show generate button', async ({ page }) => {
    await page.goto('/generate');
    
    const generateButton = page.getByRole('button', { name: /✨ Generate Idea/i });
    await expect(generateButton).toBeVisible();
    await expect(generateButton).not.toBeDisabled();
  });

  test('should navigate back to home', async ({ page }) => {
    await page.goto('/generate');
    
    // Click back link
    await page.getByText('← Back to Home').click();
    
    // Should navigate to home
    await expect(page).toHaveURL('/');
  });
});
