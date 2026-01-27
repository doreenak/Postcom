import { test, expect } from '@playwright/test';
import { OrderPage } from '../pages/Order';
import { ProfilePage } from '../pages/ProfilePage';
import { LoginPage } from '../pages/Login';
import { HomePage } from '../pages/HomePage';
import { CreateAccountPage } from '../pages/CreateAccountPage';
import { WebMailPage } from '../pages/WebMailPage';
import { ne } from '@faker-js/faker';

test.describe('Order for product', () => {
    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);
        const Home = new HomePage(page)
        await Home.gotoHomePage()

    })

    test.only('Order a product as a new customer', async ({ page }) => {
        const CreateAccount = new CreateAccountPage(page);
        const registrationTab = await CreateAccount.createNewUser();
        const orderPage = new OrderPage(registrationTab);

        //await registrationTab.goto('/shop'); // Ensure the shop is loaded
        await orderPage.orderProductAsNewCustomer();
        //await expect(page).toHaveURL(/.*confirmation/); // Assert the outcome
    });

    test('Order a product as an existing customer', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.gotoLoginPage();
        await Login.login('postcom2@sharklasers.com', 'Postcom2@');
        
        const orderPage = new OrderPage(page);
        await page.goto('/shop');   
        await orderPage.orderproductAsExistingCustomer();
        //await expect(page).toHaveURL(/.*confirmation/); // Assert the outcome
    });
})