import {test, expect} from '@playwright/test';
import {ProfilePage} from '../pages/ProfilePage';
import {LoginPage} from '../pages/Login';

test.describe('Order for product', () => {
    test.beforeEach(async ({page}) => {
        
        await page.goto('https://postcom.labs.eposta.ug/shop')
        await page.pause();
        // await page.getByRole('link', {name: 'Sign in or register'}).click();
        // await page.getByRole('textbox', {name: 'Email'}).fill('');
        // await page.getByRole('textbox', {name: 'Password'}).fill('');
        // await page.getByRole('button', {name: 'Login'}).click();
        // await page.getByText('Continue as Customer').click();
    })

})