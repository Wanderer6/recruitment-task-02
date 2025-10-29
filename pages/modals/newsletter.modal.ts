import { Locator, Page } from '@playwright/test';

export class NewsletterModal {
    readonly page: Page;
    readonly closeNewsletterPopupBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeNewsletterPopupBtn = page.getByRole('img', { name: 'icon close popup' }).first();
    }

    async closeNewsletterPopup(timeout: number) {
        try {
            await this.closeNewsletterPopupBtn.waitFor({ timeout });
            console.log('Newsletter popup detected, attempting to close popup...');
            await this.closeNewsletterPopupBtn.click();
            console.log('Popup closed successfully');
        } catch (error) {
            if (error.name === 'TimeoutError') {
                console.log('No popup detected. Continuing test');
            } else {
                throw error;
            }
        }
    }
}
