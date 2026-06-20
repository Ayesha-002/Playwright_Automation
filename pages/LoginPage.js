export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username, password) {
    if (username !== undefined) await this.usernameInput.fill(username);
    if (password !== undefined) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }

  async isUsernameVisible() {
  return await this.usernameInput.isVisible();
  }

  async isPasswordVisible() {
    return await this.passwordInput.isVisible();
  }

  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }

  async getPageTitle() {
    return await this.page.title();
  }
}