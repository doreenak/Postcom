const { expect } = require('@playwright/test');
const { WebMailPage } = require('./WebMailPage');
const { LoginPage } = require('./Login');
const { faker } = require('@faker-js/faker');
const { HomePage } = require('./HomePage');


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
        this.selectMaleRadio = this.page.getByRole('radio', { name: 'Male', exact: true });
        this.selectFemaleRadio = this.page.getByRole('radio', { name: 'Female' });
        this.saveProfileButton = this.page.getByRole('button', { name: 'Save Profile' });
        this.dateOfBirthInput = this.page.getByRole('textbox', { name: 'Date of Birth' });
    }

    async createNewUser() {

        const webMailPage = new WebMailPage(this.page);

        const email = await this.gotoCreateAccountPage();
        await this.page.bringToFront();
        await this.page.goto('/auth/register');
        await this.gotoCreateAccount('New', 'User');
        await this.submit(email);
        await this.setPhoneNumber('');

        const confirmLink = await webMailPage.confirmWebMailRegistration();

        const [registrationTab] = await Promise.all([
            this.context.waitForEvent('page'),
            confirmLink.click()
        ]);
        const createAccountOnNewTab = new this.constructor(registrationTab);
        await createAccountOnNewTab.setPassword('0xXxx@@x0', '0xXxx@@x0');
        //await this.page.pause();
        console.log('redirected to profile page');
        const loginOnNewTab = new LoginPage(registrationTab);
        await expect(loginOnNewTab.email_textbox).toBeVisible({ timeout: 10000 });

        await loginOnNewTab.login(email, '0xXxx@@x0');
        await expect(registrationTab.getByRole('heading', { name: 'Complete Your Profile' })).toBeVisible();

        await createAccountOnNewTab.gotoCompleteProfilePage();
        await expect(await registrationTab.getByText('Shop Postcom - Your Ultimate').nth(1)).toBeVisible();
        console.log('New user created and profile completed successfully');

        const homePageOnNewTab = new HomePage(registrationTab);
        // Ensure the shop is loaded before searching
        await registrationTab.goto('/shop');
        await homePageOnNewTab.orderProductAsNewCustomer();
        return registrationTab;


    }

    async gotoCreateAccountPage() {
        await this.page.goto(this.url);
        const webMail = new WebMailPage(this.page);
        const email = await webMail.createNewFakeUser(); // Ensure this is awaited
        return email;
        //signup using temporary email

    }

    async gotoCreateAccount(firstName, lastName) {
        await this.first_name_input.fill(firstName);
        await this.last_name_input.fill(lastName);

    }

    async gotoCompleteProfilePage() {

        const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
        const formattedDob = birthDate.toISOString().split('T')[0];
        const randomGender = faker.person.sex(); // Returns 'male' or 'female'

        // 3. Fill the form fields
        // Filling birth date input
        await this.dateOfBirthInput.fill(formattedDob);

        if (randomGender === 'male') {
            await this.selectMaleRadio.check();
        } else {
            await this.selectFemaleRadio.check();
        }
        await this.saveProfileButton.click();
        console.log(`Testing with: DOB=${formattedDob}, Gender=${randomGender}`);
        //return new CompleteProfilePage(this.page);
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

    async submit(email) {
        await this.email_input.fill(String(email));

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