import { Locator, Page } from '@playwright/test';

export class CartConfirmationModal {
    readonly page: Page;
    readonly goToCartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.goToCartBtn = page.getByTestId('cart-confirmation-go-to-cart');
    }

    async clickGoToCartBtn() {
        await this.goToCartBtn.click();
    }
}