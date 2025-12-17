exports.LoginPage = class LoginPage {
    constructor(page) {

        this.page = page
        this.email_textbox = page.getByRole('textbox', { name: 'Email' });
        this.password_textbox = page.getByRole('textbox', { name: 'Password' })
        this.login_button = page.getByRole('button', { name: 'Login' })
    }
    async gotoLoginPage() {
        // await this.page.goto('https://postcom.labs.eposta.ug/shop')
        // await gotoHomePage();
        await this.page.getByRole('link', { name: 'Sign in or register' }).click();
        //await expect(this.page.getByRole('button', { name: 'Toggle password visibility' })).toBeVisible();
    }
    async login(email, password) {
        await this.email_textbox.fill(email)
        await this.password_textbox.fill(password)
        await this.login_button.click()
    }
}