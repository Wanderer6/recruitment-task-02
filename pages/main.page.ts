import { Locator, Page } from '@playwright/test';
import { NavigationListComponent } from './components/navigation-list.component';

export class MainPage {
    readonly page: Page;
    readonly acceptCookiesBtn: Locator;

    navigationListComponent: NavigationListComponent;

    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesBtn = page.getByRole('button', { name: 'W porządku' });
        this.navigationListComponent = new NavigationListComponent(this.page);
    }

    async acceptCookies() {
        await this.acceptCookiesBtn.click();
    }
}