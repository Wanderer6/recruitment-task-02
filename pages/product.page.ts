import { Locator, Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly closeAppPopupBtn: Locator;
    readonly closeNewsletterPopupBtn: Locator;
    readonly firstActiveSize: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productColor: Locator;
    readonly productSize: Locator;
    readonly addToCartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeAppPopupBtn = page.getByRole('button', { name: 'Close' });
        this.closeNewsletterPopupBtn = page.getByRole('img', { name: 'icon close popup' }).first();
        this.firstActiveSize = page.getByTestId('product-size-group').getByTestId('size').first();
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.locator('[data-selen="product-price"]');
        this.productColor = page.getByTestId('color-picker-title').locator('span');
        this.productSize = page.getByTestId('size-picker-size-name');
        this.addToCartBtn = page.getByTestId('add-to-cart-button');
    }

    async closeAppPopup() {
        await this.closeAppPopupBtn.click();
    }

    async closeNewsletterPopup() {
        await this.closeNewsletterPopupBtn.click();
    }

    async handlePopups() {
        try {
            await this.closeAppPopupBtn.waitFor( {timeout: 5000} );
            console.log('Popup detected, attempting to close popups...');
            await this.closeAppPopup();
            await this.closeNewsletterPopup();
            console.log('Popups closed successfully')
        } catch (error) {
            if (error.name === 'TimeoutError') {
                console.log('No popup detected. Continuing test')
            } else {
                throw error;
            }
        }
    }

    async chooseFirstActiveSize() {
        await this.firstActiveSize.click();
    }

    async getProductName() {
        return await this.productName.innerText();
    }

    async getProductPrice() {
        return await this.productPrice.innerText();
    }

    async getProductColor() {
        return await this.productColor.innerText();
    }

    async getProductSize() {
        return await this.productSize.innerText();
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }
}