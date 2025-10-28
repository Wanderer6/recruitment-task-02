import { Locator, Page } from '@playwright/test';

export class MiniCartModal {
    readonly page: Page;
    readonly productName: Locator;
    readonly productSize: Locator;
    readonly productTotalPrice: Locator;
    readonly productFinalPrice: Locator;
    readonly productCount: Locator;
    readonly miniCartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-selen="minicart-product-name"]');
        this.productSize = page.locator('[data-selen="minicart-product-size"]');
        this.productTotalPrice = page.locator('[data-selen="minicart-final-price"]');
        this.productFinalPrice = page.locator('[data-selen="minicart-product-final-price"]');
        this.productCount = page.locator('[data-selen="minicart-count"]');
        this.miniCartBtn = page.locator('[data-selen="cart-button"]');
    }

    async hoverOverMiniCart() {
        await this.miniCartBtn.hover();
    }
}