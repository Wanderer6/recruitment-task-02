import { Locator, Page } from '@playwright/test';

export class CookiesModal {
    readonly page: Page;
    readonly acceptCookiesBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesBtn = page.getByRole('button', { name: 'W porządku' });
    }

    async acceptCookies() {
        await this.acceptCookiesBtn.click();
    }
}