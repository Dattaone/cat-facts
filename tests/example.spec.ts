import { test, expect } from '@playwright/test';

const CAT_PREFIX_IMG_URL = "https://cataas.com/cat";
const LOCALHOST_URL = 'http://localhost:5173/';

test('app shows random fact and image', async ({ page }) => {
  console.log('Waiting for server to start...');
  await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos

  console.log('Navigating to:', LOCALHOST_URL);
  await page.goto(LOCALHOST_URL, { timeout: 60000 });

  console.log('Page loaded');

  // Inspeccionar el DOM
  const content = await page.content();
  console.log('Page content:', content);

  // Espera explícita para asegurarse de que los elementos están presentes
  await page.waitForSelector('p', { timeout: 60000 });
  await page.waitForSelector('img', { timeout: 60000 });

  const text = await page.getByRole('paragraph');
  const image = await page.getByRole('img');

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute('src');

  console.log('Text content:', textContent);
  console.log('Image src:', imageSrc);

  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMG_URL)).toBeTruthy();
});
