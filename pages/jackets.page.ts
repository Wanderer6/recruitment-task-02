import { Locator, Page } from '@playwright/test';
import { QuickShopModal } from './modals/quick-shop.modal';
import { MiniCartModal } from './modals/mini-cart.modal';

export class JacketsPage {
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly firstProductQuickShop: Locator;
    readonly firstProductPrice: Locator;

    quickShopModal: QuickShopModal;
    miniCartModal: MiniCartModal;

    constructor(page: Page) {
        this.page = page;
        this.firstProduct = page.locator('#categoryProducts article').first();
        this.firstProductQuickShop = this.firstProduct.getByTestId('quick-shop');
        this.firstProductPrice = this.firstProduct.locator('.es-final-price');
        this.quickShopModal = new QuickShopModal(this.page);
        this.miniCartModal = new MiniCartModal(this.page);
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