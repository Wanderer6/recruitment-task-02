import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productColor: Locator;
    readonly productSize: Locator;
    readonly productTotalPrice: Locator;
    readonly productFinalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-selen="product-url"]');
        this.productColor = page.locator('[data-selen="color"]');
        this.productSize = page.locator('[data-selen="size"]');
        this.productTotalPrice = page.locator('[data-selen="cart-total-price"]');
        this.productFinalPrice = page.locator('[data-selen="cart-final-price"]');
    }
}