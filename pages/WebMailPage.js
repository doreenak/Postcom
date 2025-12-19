exports.WebMailPage = class WebMailPage {
    constructor(page) {
        this.page = page;
        this.context = page.context();
        this.mailPage = null;
        this.url = 'https://www.guerrillamail.com/';

        // Define selectors
        this.email_input = page.getByLabel('Email Address');
        this.password_input = page.getByLabel('Password');
        this.login_button = page.getByRole('button', { name: 'Login' });
        // this.generatedEmailAddress = page.getByTitle('Click to Edit');
        this.email_new_orders = page.getByText('New Orders');
        this.setButton = page.getByRole('button', { name: 'Set' });
        this.refreshButton = page.getByRole('button', { name: 'Refresh' });
        this.email_list = page.locator('.email-list');
        this.email_subjects = page.locator('.email-subject');
        this.email_bodies = page.locator('.email-body');
        this.confirmation_link = page.locator('a.confirmation-link');
        // this.generatedEmailHost = page.locator('#gm-host-select option[selected]');
        this.ReceivedEmailRegistration = page.getByRole('cell', { name: 'Welcome to Our Platform' });
        this.confirmRegistration = page.getByRole('link', { name: 'Sign In Now' });
        this.InBox = page.getByRole('button', { name: 'Inbox' });
        //this.emailHost = page.getByTitle('Click to Edit').locator('following-sibling::select');
        this.EmailInput = page.locator('#inbox-id');
        this.firstEmailOpen = page.getByRole('row', { name: 'Please confirm your email address' }).first();
    }

    getMailLocators(pageInstance) {
        return {
            receivedEmail: pageInstance.getByRole('cell', { name: 'Welcome to Our Platform' }),
            confirmLink: pageInstance.getByRole('link', { name: 'Sign In Now' })
        };
    }

    async openTempWebmail() {
        try {
            this.mailPage = await this.context.newPage();
            await this.mailPage.goto(this.url, { timeout: 60000 });
            console.log('Opened temporary mail website in a new tab');
        } catch (error) {
            console.error('Failed to navigate to temporary mail website:', error.message);
            throw error;
        }
    }

    async createNewFakeUser() {
        let pageTitle = await this.page.title();
        await this.openTempWebmail();
        const email = await this.mailPage.getByText(/[\w+.]+@[\sharklasers]+/).innerText();
        console.log('Fake email address is: ' + email.trim());
        return email.trim();




    }

    async confirmWebMailRegistration() {

        //if (!this.mailPage) throw new Error("Mail page not initialized. Call openTempWebmail first.");
        await this.mailPage.bringToFront();
        await this.mailPage.reload();

        const mailLocators = this.getMailLocators(this.mailPage);
        console.log('Checking for registration email...');

        await mailLocators.receivedEmail.waitFor({ state: 'visible', timeout: 240000 });
        await mailLocators.receivedEmail.click();
        console.log('registration email received');
        await mailLocators.confirmLink.waitFor({ state: 'visible', timeout: 60000 });
        const setPasswordLink = await mailLocators.confirmLink.getAttribute('href');
        await mailLocators.confirmLink.click();
        console.log('Opened registration link from email received to set password: ' + setPasswordLink);
        //await this.page.pause();
        return 'true';

        //const setPasswordLink = await this.confirmRegistration.getAttribute('href');
        // if (!setPasswordLink.includes('/users/register')) {
        //     return '"this link" link exists in email but link is broken : ' + setPasswordLink;
        // }
        // // Go back to the main application page to finalize registration
    }


    async setEmail(Email) {
        await this.generatedEmailAdress.waitForClickable();
        await this.generatedEmailAdress.click();
        await this.EmailInput.setValue(Email);
        await this.setButton.waitForClickable();
        await this.setButton.click();
        await browser.pause(2000);
        await browser.refresh();
    }

    async openFirstEmail() {
        await browser.pause(5000);
        await browser.refresh();
        await this.firstEmailOpen.click();
    }
};


//  async confirmWebMailRegistration() {
//         // Use the mailPage tab to click the email
//         await this.mailPage.reload();
//         const emailRow = this.ReceivedEmailRegistration(this.mailPage);
//         await emailRow.waitFor({ state: 'visible' });
//         await emailRow.click();

//         const link = this.confirmRegistration(this.mailPage);
//         const setPasswordLink = await link.getAttribute('href');

//         // Go back to the main application page to finalize registration
//         await this.page.bringToFront();
//         await this.page.goto(setPasswordLink);
//         return 'true';
//     }