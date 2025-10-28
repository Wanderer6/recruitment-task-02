import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { NavigationListComponent } from '../pages/components/navigation-list.component';
import { JacketsPage } from '../pages/jackets.page';
import { ProductPage } from '../pages/product.page';
import { CartConfirmationModal } from '../pages/modals/cart-confirmation.modal';
import { CartPage } from '../pages/cart.page';
import { QuickShopModal } from '../pages/modals/quick-shop.modal';
import { MiniCartModal } from '../pages/modals/mini-cart.modal';

test.describe('Cart tests', () => {
    let jacketsPage: JacketsPage;

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const navigationListComponent = new NavigationListComponent(page);
        jacketsPage = new JacketsPage(page);

        await test.step('Open website', async () => {
            await page.goto('/');
        });

        await test.step('Accept cookies', async () => {
            await mainPage.acceptCookies();
        });

        await test.step('Open "Jackets" shop category', async () => {
            await navigationListComponent.openJacketsSubCategory();
        });
    });

    test('Add product to cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartConfirmationModal = new CartConfirmationModal(page);
        const cartPage = new CartPage(page);

        let productName: string;
        let productPrice: string;
        let productColor: string;
        let productSize: string;

        await test.step('Click first product', async () => {
            await jacketsPage.clickFirstProduct();
        });

        await test.step('Handle popups', async () => {
            await productPage.handlePopups();
        });

        await test.step('Choose first active size', async () => {
            await productPage.chooseFirstActiveSize();
        });

        await test.step('Get product details', async () => {
            productName = await productPage.getProductName();
            productPrice = await productPage.getProductPrice();
            productColor = await productPage.getProductColor();
            productSize = await productPage.getProductSize();
        });

        await test.step('Click "Dodaj do koszyka" button', async () => {
            await productPage.addToCart();
        });

        await test.step('Click "Przejdź do kasy" button', async () => {
            await cartConfirmationModal.clickGoToCartBtn();
        });

        await test.step('Assert product details', async () => {
            await expect.soft(cartPage.productName).toHaveText(productName);
            await expect.soft(cartPage.productColor).toHaveText(`Kolor: ${productColor}`);
            await expect.soft(cartPage.productSize).toHaveText(`Rozmiar: ${productSize}`);
            await expect.soft(cartPage.productTotalPrice).toHaveText(productPrice);
            await expect.soft(cartPage.productFinalPrice).toHaveText(productPrice);
        });
    });

    test('Add product to cart using quick shop button', async ({ page }) => {
        const quickShopModal = new QuickShopModal(page);
        const cartPage = new CartPage(page);

        let productPrice: string;
        let productName: string;
        let productColor: string;
        let productSize: string;

        await test.step('Get product name', async () => {
            productPrice = await jacketsPage.getProductPrice();
        });

        await test.step('Click quick shop on first product', async () => {
            await jacketsPage.clickFirstProductQuickShop();
        });

        await test.step('Get product details', async () => {
            productName = await quickShopModal.getProductName();
            productColor = await quickShopModal.getProductColor();
            productSize = await quickShopModal.getProductSize();
        });

        await test.step('Choose first active size', async () => {
            await quickShopModal.chooseFirstActiveSize();
        });

        await test.step('Click "Zobacz koszyk" button', async () => {
            await quickShopModal.clickGoToCartBtn();
        });

        await test.step('Assert product details', async () => {
            await expect.soft(cartPage.productName).toHaveText(productName);
            await expect.soft(cartPage.productColor).toHaveText(productColor, { ignoreCase: true });
            await expect.soft(cartPage.productSize).toHaveText(`Rozmiar: ${productSize}`);
            await expect.soft(cartPage.productTotalPrice).toHaveText(productPrice);
            await expect.soft(cartPage.productFinalPrice).toHaveText(productPrice);
        });
    });

    test('Add product to mini cart', async ({ page }) => {
        const quickShopModal = new QuickShopModal(page);
        const miniCartModal = new MiniCartModal(page);

        let productPrice: string;
        let productName: string;
        let productSize: string;

        await test.step('Get product name', async () => {
            productPrice = await jacketsPage.getProductPrice();
        });

        await test.step('Click quick shop on first product', async () => {
            await jacketsPage.clickFirstProductQuickShop();
        });

        await test.step('Get product details', async () => {
            productName = await quickShopModal.getProductName();
            productSize = await quickShopModal.getProductSize();
        });

        await test.step('Choose first active size', async () => {
            await quickShopModal.chooseFirstActiveSize();
        });

        await test.step('Close quick shop', async () => {
            await quickShopModal.waitForGoToCartBtn();
            await quickShopModal.closeQuickShop();
        });

        await test.step('Hover over mini cart', async () => {
            await miniCartModal.hoverOverMiniCart();
        });

        await test.step('Assert product details', async () => {
            await expect.soft(miniCartModal.productName).toHaveText(productName);
            await expect.soft(miniCartModal.productSize).toHaveText(`Rozmiar: ${productSize}`);
            await expect.soft(miniCartModal.productFinalPrice).toHaveText(productPrice);
            await expect.soft(miniCartModal.productTotalPrice).toHaveText(productPrice);
        });
    });
});
