import { test, expect } from '@playwright/test'
import { ProfilePage } from '../pages/ProfilePage';
import { CreateAccountPage } from '../pages/CreateAccountPage';
import { WebMailPage } from '../pages/WebMailPage';
import { LoginPage } from '../pages/Login';
import { HomePage } from '../pages/HomePage';



test.describe('Create Account Page suite', () => {
    let createAccount;
    test.beforeEach(async ({ page }) => {
        const createAccount = new CreateAccountPage(page);
        await createAccount.gotoCreateAccountPage();
    })

    test('Create a new user account', async ({ context, page }) => {

        test.setTimeout(300000);
        //creating a new temporary email
        const createAccount = new CreateAccountPage(page);
        const webMailPage = new WebMailPage(page);
        let newEmail = await webMailPage.createNewFakeUser();
        // await page.pause(5000);
        //submit the email for signup 
        await page.bringToFront();
        await page.goto('/auth/register');
        await createAccount.gotoCreateAccount('New', 'User');
        await createAccount.submit(newEmail);
        await createAccount.setPhoneNumber('');

        //check email of registration
        //await webMailPage.confirmWebMailRegistration();
        //await page.pause();
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            webMailPage.confirmWebMailRegistration()
        ]);

        // Create a new instance of the POM specifically for the new tab
        const createAccountOnNewTab = new CreateAccountPage(newPage);
        await createAccountOnNewTab.setPassword('0xXxx@@x0', '0xXxx@@x0');
        //await createAccount.setPassword('0xXxx@@x0', '0xXxx@@x0');
        //await expect(CreateAccountPage.errorAlert.getText()).toContain('Password confirmation does not match the new password.');
        //await createAccountPage.setPassword('0xXxx@@x0', '0xXxx@@x0');
        //await expect(browser.getUrl()).toContain('/users/healthy-eating-profile');
        console.log('redirected to profile page');
        //await page.pause();
        const login = new LoginPage(page);
        await login.login(newEmail, '0xXxx@@x0');
        const profilePage = new ProfilePage(page);
        await expect(profilePage.user_menu).toBeVisible();
        //await page.getByText('Continue as Customer').click();
        // await expect(profilePage.mainEmail).toHaveValue(newEmail);
        //await expect(ProfilePage.mainEmail.getAttribute('readOnly')).toEqual('true');
    });
})

