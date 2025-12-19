import {test, expect} from '@playwright/test';
import {ProfilePage} from '../pages/ProfilePage';
import {LoginPage} from '../pages/Login';
import { HomePage } from '../pages/HomePage';

test.describe('Order for product for new customer', () => {
    test.beforeEach(async ({page}) => {
        
        const Home = new HomePage(page)
        await Home.gotoHomePage()
        
    })
    test('Order a product as a new customer', async ({page}) => {



})
});