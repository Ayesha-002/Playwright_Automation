import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright']
  ]
});