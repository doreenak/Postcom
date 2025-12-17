import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage';
import { LoginPage } from '../pages/Login';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page suite', () => {
    test.beforeEach(async ({ page }) => {
        const Home = new HomePage(page)
        await Home.gotoHomePage()
    })

    test('Verify homepage title and logo', async ({ page }) => {
        // await page.pause();
        await expect(page).toHaveTitle('Postcom');
        const Home = new HomePage(page)
        await expect(Home.logo).toBeVisible();
    });

    test('Search for a product from homepage', async ({ page }) => {
        const Home = new HomePage(page)
        await Home.searchProduct('HP laptop')
        await expect(page.locator('span').filter({ hasText: /^HP laptop$/ })).toBeVisible();
    });

    test('Verify exclusive deals on the site', async ({ page }) => {
        const Home = new HomePage(page)
        await Home.verifyExclusiveDeals()
        await expect(Home.exclusive_deals).toBeVisible();
    });

    test('Navigate to Cart from homepage', async ({ page }) => {
        const Home = new HomePage(page)
        await Home.goToCart()
        // await page.pause();
        await expect(page.getByRole('heading', { name: 'Your Cart (0 Items)' })).toBeVisible();
    });

    test('Select the first product from the homepage', async ({ page }) => {
        const Home = new HomePage(page)
        // await page.pause();
        await Home.selectFirstProduct()
        await expect(page.getByRole('button', { name: 'ADD TO CART' })).toBeVisible();
    });

    
    test('Verify footer is visible on homepage', async ({ page }) => {
        const Home = new HomePage(page)
        await expect(Home.footer).toBeVisible();
    });

    test('Verify featured products section is visible on homepage', async ({ page }) => {
        const Home = new HomePage(page)
        // await page.pause();
        await expect(Home.featured_products_section).toBeVisible();
    });

})