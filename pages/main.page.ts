import { Locator, Page } from '@playwright/test';
import { NavigationListComponent } from './components/navigation-list.component';
import { CookiesModal } from './modals/cookies.modal';

export class MainPage {
    readonly page: Page;

    navigationListComponent: NavigationListComponent;
    cookiesModal: CookiesModal;

    constructor(page: Page) {
        this.page = page;
        this.navigationListComponent = new NavigationListComponent(this.page);
        this.cookiesModal = new CookiesModal(this.page);
    }
}