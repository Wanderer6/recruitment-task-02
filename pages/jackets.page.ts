import { Locator, Page } from '@playwright/test';

export class JacketsPage {
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly firstProductQuickShop: Locator;
    readonly firstProductPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstProduct = page.locator('#categoryProducts article').first();
        this.firstProductQuickShop = this.firstProduct.getByTestId('quick-shop');
        this.firstProductPrice = this.firstProduct.locator('.es-final-price');
    }

    async clickFirstProduct() {
        await this.firstProduct.click();
    }

    async clickFirstProductQuickShop() {
        await this.firstProductQuickShop.click();
    }

    async getProductPrice() {
        return await this.firstProductPrice.innerText();
    }
}