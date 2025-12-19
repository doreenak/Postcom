exports.CreateAccountPage = class createAccountPage {

    constructor(page) {
        this.page = page
        this.url = '/auth/register';
        this.uniquePhoneNumber = '';
        this.context = page.context();

        // Define selectors
        this.first_name_input = page.getByRole('textbox', { name: 'First Name *' });
        this.last_name_input = page.getByRole('textbox', { name: 'Last Name *' });
        this.email_input = page.getByRole('textbox', { name: 'Email Address *' });
        this.password_input = this.page.getByRole('textbox', { name: 'Password *', exact: true });
        this.confirm_password_input = this.page.getByRole('textbox', { name: 'Confirm Password *' });
        this.phone_number_input = page.getByRole('textbox', { name: 'Phone Number *' });
        this.create_account_button = page.getByRole('button', { name: 'Create Account' });
        this.next_button = this.page.getByRole('button', { name: 'Next' });
    }

    async gotoCreateAccountPage() {
        await this.page.goto(this.url);
    }

    async gotoCreateAccount(firstName, lastName) {
        await this.first_name_input.fill(firstName);
        await this.last_name_input.fill(lastName);

    }

    async getEmailSentConfirmationMessage() {
        return await this.page.getByText('A confirmation email has been sent to your email address. Please check your inbox to verify your account.').isVisible();
    }

    async setPassword(password, confirmPassword) {
        //await this.page.pause();
        //await this.password_input.waitFor({ state: 'visible' });
        // const [newPage] = await Promise.all([
        //     context.waitForEvent('page'),
        //     page.locator('text=Open registration link').click() // Example trigger
        // ]);

        // // Create a new instance of the POM specifically for the new tab
        // const createAccountOnNewTab = new CreateAccountPage(newPage);
        await this.password_input.fill(password);
        await this.confirm_password_input.fill(confirmPassword);
        //await this.page.pause();
        await this.next_button.click();

        //await browser.pause(5000);
    }

    async submit(emailAddress) {
        await this.email_input.fill(emailAddress);

    }
    async setPhoneNumber(phoneNumberValue) {
        const generateRandomNumberString = (length) => {
            let result = '';
            const characters = '0123456789';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        };
        const finalNumber = phoneNumberValue || generateRandomNumberString(9);
        await this.page.getByRole('textbox', { name: 'Phone Number *' }).fill(finalNumber);
        this.uniquePhoneNumber = finalNumber;

        // await this.phone_number_input.fill(phoneNumberValue);
        await this.next_button.click();
    }
}


//page2.getByRole('textbox', { name: 'Password *', exact: true }).click();
// await page2.getByRole('textbox', { name: 'Confirm Password *' }).