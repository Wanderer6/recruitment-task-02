import { Locator, Page } from '@playwright/test';

export class NavigationListComponent {
    readonly page: Page;
    readonly clothesCategory: Locator;
    readonly jacketsSubCategory: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clothesCategory = page.getByRole('link', { name: 'Ubrania' });
        this.jacketsSubCategory = page.getByRole('link', { name: 'Kurtki, płaszcze' });
    }

    async openJacketsSubCategory() {
        await this.clothesCategory.hover();
        await this.jacketsSubCategory.click();
    }
}