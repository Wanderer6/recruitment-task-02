import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { JacketsPage } from '../pages/jackets.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';

test.describe('Cart tests', () => {
    let jacketsPage: JacketsPage;

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        jacketsPage = new JacketsPage(page);

        await test.step('Open website', async () => {
            await page.goto('/');
        });

        await test.step('Accept cookies', async () => {
            await mainPage.acceptCookies();
        });

        await test.step('Open "Jackets" shop category', async () => {
            await mainPage.navigationListComponent.openJacketsSubCategory();
        });
    });

    test('Add product to cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        let productName: string;
        let productPrice: string;
        let productColor: string;
        let productSize: string;

        await test.step('Click first product', async () => {
            await jacketsPage.clickFirstProduct();
        });

        await test.step('Handle popups', async () => {
            await productPage.downloadAppModal.closeAppPopup(5000);
            await productPage.newsletterModal.closeNewsletterPopup(5000);
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
            await productPage.cartConfirmationModal.clickGoToCartBtn();
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
            productName = await jacketsPage.quickShopModal.getProductName();
            productColor = await jacketsPage.quickShopModal.getProductColor();
            productSize = await jacketsPage.quickShopModal.getProductSize();
        });

        await test.step('Choose first active size', async () => {
            await jacketsPage.quickShopModal.chooseFirstActiveSize();
        });

        await test.step('Click "Zobacz koszyk" button', async () => {
            await jacketsPage.quickShopModal.clickGoToCartBtn();
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
            productName = await jacketsPage.quickShopModal.getProductName();
            productSize = await jacketsPage.quickShopModal.getProductSize();
        });

        await test.step('Choose first active size', async () => {
            await jacketsPage.quickShopModal.chooseFirstActiveSize();
        });

        await test.step('Close quick shop', async () => {
            await jacketsPage.quickShopModal.waitForGoToCartBtn();
            await jacketsPage.quickShopModal.closeQuickShop();
        });

        await test.step('Hover over mini cart', async () => {
            await jacketsPage.miniCartModal.hoverOverMiniCart();
        });

        await test.step('Assert product details', async () => {
            await expect.soft(jacketsPage.miniCartModal.productName).toHaveText(productName);
            await expect.soft(jacketsPage.miniCartModal.productSize).toHaveText(`Rozmiar: ${productSize}`);
            await expect.soft(jacketsPage.miniCartModal.productFinalPrice).toHaveText(productPrice);
            await expect.soft(jacketsPage.miniCartModal.productTotalPrice).toHaveText(productPrice);
        });
    });
});
