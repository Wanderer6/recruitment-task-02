import { Locator, Page } from '@playwright/test';

export class DownloadAppModal {
    readonly page: Page;
    readonly closeAppPopupBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeAppPopupBtn = page.getByRole('button', { name: 'Close' });
    }

    async closeAppPopup(timeout: number) {
        try {
            await this.closeAppPopupBtn.waitFor({ timeout });
            console.log('Download app popup detected, attempting to close popup...');
            await this.closeAppPopupBtn.click();
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
