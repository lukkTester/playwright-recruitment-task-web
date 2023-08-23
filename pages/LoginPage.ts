import { Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    private readonly usernameInput = "[data-test='username']";
    private readonly passwordInput = "[data-test='password']";
    private readonly loginBtn = "#login-button";

    constructor(page: Page) {
        this.page = page;
    }

    public get Username() {
        return this.page.locator(this.usernameInput);
    }

    public get Password() {
        return this.page.locator(this.passwordInput);
    }

    public get Login() {
        return this.page.locator(this.loginBtn);
    }
}