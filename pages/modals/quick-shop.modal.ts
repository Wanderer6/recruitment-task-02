import { Locator, Page } from '@playwright/test';

export class QuickShopModal {
    readonly page: Page;
    readonly firstActiveSize: Locator;
    readonly goToCartBtn: Locator;
    readonly productName: Locator;
    readonly productColor: Locator;
    readonly productSize: Locator;
    readonly closeBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstActiveSize = page.locator('[data-testid="quick-shop-size"]:not(.qs_button-active)').first();
        this.goToCartBtn = page.getByRole('button', { name: 'Zobacz koszyk' });
        this.productName = page.getByTestId('quick-shop-name');
        this.productColor = page.getByTestId('quick-shop-color');
        this.closeBtn = page.getByTestId('quick-shop-close');
    }

    async chooseFirstActiveSize() {
        await this.firstActiveSize.click();
    }

    async clickGoToCartBtn() {
        await this.goToCartBtn.click();
    }

    async getProductName() {
        return await this.productName.innerText();
    }

    async getProductColor() {
        return await this.productColor.innerText();
    }

    async getProductSize() {
        return await this.firstActiveSize.innerText();
    }

    async closeQuickShop() {
        await this.closeBtn.click();
    }

    async waitForGoToCartBtn() {
        await this.goToCartBtn.waitFor();
    }
}