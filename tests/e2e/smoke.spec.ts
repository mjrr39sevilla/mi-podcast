import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/", "/episodes", "/about", "/faq"];

function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return errors;
}

test.describe("quickstart V1 — landing", () => {
  test("featured episode with playback and navigation", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Midnight Ink", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "The Architecture of Silence" }),
    ).toBeVisible();
    await expect(page.locator("audio")).toHaveCount(1);
    await expect(page.locator("audio")).toHaveAttribute(
      "src",
      "/audio/ep-020.wav",
    );
    for (const href of ["/episodes", "/about", "/faq"]) {
      await expect(page.locator(`nav a[href="${href}"]`)).toBeVisible();
    }
    expect(errors).toEqual([]);
  });

  test("core content readable with JavaScript disabled", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "The Architecture of Silence" }),
    ).toBeVisible();
    await expect(page.locator("audio")).toHaveCount(1);
    await expect(page.locator('nav a[href="/episodes"]')).toBeAttached();
    await context.close();
  });
});

test.describe("quickstart V2 — episodes", () => {
  test("lists 20 episodes newest-first with players", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/episodes");
    const items = page.locator("details");
    await expect(items).toHaveCount(20);
    await expect(
      items
        .first()
        .getByRole("heading", { name: /The Architecture of Silence/ }),
    ).toBeVisible();
    await expect(items.first().getByText("Episode 20")).toBeAttached();
    await expect(items.last().getByText("Episode 1")).toBeAttached();
    await expect(page.locator("audio")).toHaveCount(20);

    await items.first().locator("summary").click();
    await expect(
      items.first().getByText(/What happens when we design for pauses/),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe("quickstart V3 — about & faq", () => {
  test("about shows premise and hosts", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /About Midnight Ink/ }),
    ).toBeVisible();
    await expect(page.getByText("Avery Lin")).toBeVisible();
    await expect(page.getByText("Jonah Reyes")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("faq covers schedule, subscribe, contact", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/faq");
    await expect(
      page.getByRole("heading", { name: /Frequently Asked Questions/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /How often do new episodes/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /How do I subscribe/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /How can I contact/i }),
    ).toBeVisible();
    const items = page.locator("ul.grid > li");
    expect(await items.count()).toBeGreaterThanOrEqual(6);
    expect(errors).toEqual([]);
  });
});

test.describe("quickstart V5 — accessibility", () => {
  for (const route of ROUTES) {
    test(`axe scan clean on ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`),
      ).toEqual([]);
    });
  }

  test("keyboard can reach nav and play control", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // brand
    let reached = false;
    for (let i = 0; i < 20 && !reached; i++) {
      const label = await page.evaluate(
        () => document.activeElement?.textContent ?? "",
      );
      const isPlay = await page.evaluate(
        () => document.activeElement?.tagName === "AUDIO",
      );
      if (label.includes("Episodes") || isPlay) reached = true;
      if (isPlay) break;
      await page.keyboard.press("Tab");
    }
    expect(reached).toBe(true);
  });
});

test.describe("SC-007 - per-route metadata", () => {
  for (const route of ["/", "/episodes", "/about", "/faq"]) {
    test(`route ${route} has a title and meta description`, async ({
      page,
    }) => {
      await page.goto(route);
      await expect(page).toHaveTitle(/\S/);
      const desc = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect((desc ?? "").trim().length).toBeGreaterThan(0);
    });
  }
});
