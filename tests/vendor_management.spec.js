import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import { VendorPage } from '../pages/VendorManagementPage';

test.describe('Vendor management', () => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        const Home = new HomePage(page)
        await Home.gotoHomePage()
        const Login = new LoginPage(page)
        await Login.gotoLoginPage();
        await Login.login('postcom@sharklasers.com', 'Postcom2@')
        
    })
    test.afterEach(async ({ page }) => {
    await page.close()
  })

    test.only('Add product to vendor shop', async ({ page }) => {

        const vendorPage = new VendorPage(page)
        await vendorPage.addProduct();

    })

    test('Update inventory by adding stock', async({page}) =>{

        const vendorPage = new VendorPage(page)
        await vendorPage.updateInventoryAddStock();

    })

    test('Increase Stock', async({page}) =>{
        const vendorPage = new VendorPage(page)
        await vendorPage.increaseStock();
    })

    test('Reduce Stock', async({page}) =>{
        const vendorPage = new VendorPage(page)
        await vendorPage.reduceStock();
    })
})