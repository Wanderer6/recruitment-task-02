import { Locator, Page } from '@playwright/test';
import { CartConfirmationModal } from './modals/cart-confirmation.modal';
import { DownloadAppModal } from './modals/download-app.modal';
import { NewsletterModal } from './modals/newsletter.modal';

export class ProductPage {
    readonly page: Page;
    readonly firstActiveSize: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productColor: Locator;
    readonly productSize: Locator;
    readonly addToCartBtn: Locator;

    cartConfirmationModal: CartConfirmationModal;
    downloadAppModal: DownloadAppModal;
    newsletterModal: NewsletterModal;

    constructor(page: Page) {
        this.page = page;
        this.firstActiveSize = page.getByTestId('product-size-group').getByTestId('size').first();
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.locator('[data-selen="product-price"]');
        this.productColor = page.getByTestId('color-picker-title').locator('span');
        this.productSize = page.getByTestId('size-picker-size-name');
        this.addToCartBtn = page.getByTestId('add-to-cart-button');
        this.cartConfirmationModal = new CartConfirmationModal(this.page);
        this.downloadAppModal = new DownloadAppModal(this.page);
        this.newsletterModal = new NewsletterModal(this.page);
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