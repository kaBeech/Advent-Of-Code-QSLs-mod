import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("chester");
  await page.getByText("°Chester The Tester°").click();
  await page.locator("#logo").click();
  await page.getByText("°Log Out°").first().click();
});
