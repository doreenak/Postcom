import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/Login'
import { ProfilePage } from '../pages/ProfilePage'

test.describe('Profile Page suite', () => {

    test.beforeEach(async ({ page }) => {
        const Login = new LoginPage(page)
        await Login.gotoLoginPage()
        await Login.login('postcom2@sharklasers.com', 'Postcom2@')
        await expect(page.getByText('Continue as Customer')).toBeVisible();
        await expect(page.getByText('Continue as Vendor')).toBeVisible();
    })

    // test.afterEach(async (page) => {
    //     await page.close()
    // })

    test.describe('Continue as Customer', () => {
        test('Navigate to My Account Page from User Menu', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToMyAccount()
            await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
        })

        test('Navigate to Orders page from User Menu', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToOrders()
            await expect(page.getByRole('heading', { name: 'Orders', exact: true })).toBeVisible();
        })

        test('Navigate to Wishlist page from User Menu', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToWishlist()
            await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
        })

        test('Navigate to Profile page from User Menu', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToProfile()
            await expect(page.getByRole('button', { name: 'Edit Profile' })).toBeVisible();
        })
    })

    test.describe('Continue as Vendor', () => {

        test.beforeEach(async ({ page }) => {
            await page.getByText('Continue as Vendor').click();
        })
        test('Navigate to My Wallet Page from vendor dashboard', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await page.getByRole('link', { name: 'Wallet' }).click();
            // await Profile.navigateToVendorPage()
            await expect(page.getByRole('row', { name: '# Reference Status Total' })).toBeVisible();

        })

        test('Navigate to Products Page on vendor dashboard', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToProducts()
            await expect(page.getByRole('heading', { name: 'Products', exact: true })).toBeVisible();
        })

        test('Navigate to Promotions Page from vendor dashboard', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToPromotions()
            await expect(page.getByRole('heading', { name: 'Promotions', exact: true })).toBeVisible();
        })

        test('Navigate to Settlements Page from vendor dashboard', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToSettlements()
            await expect(page.getByRole('button', { name: 'ACCOUNTS' })).toBeVisible();
        test('Navigate to Fulfillment Orders Page from vendor dashboard', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToFulfillmentOrders()
            await expect(page.getByRole('button', { name: 'Filter' })).toBeVisible();
        })

        test('Navigate to Shipments Page from vendor dashboard', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToShipments()
            await expect(page.getByRole('row', { name: '# Tracking No. Order No.' })).toBeVisible();
        })

        test('Navigate to Returns Page from vendor dashboard', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToReturns()
            await expect(page.getByRole('heading', { name: 'returns', exact: true })).toBeVisible();
        })

        test('Navigate to Inventory Page from vendor dashboard', async ({ page }) => {
            const Profile = new ProfilePage(page)
            await Profile.navigateToInventory()
            await expect(page.getByRole('heading', { name: 'Inventory', exact: true })).toBeVisible();
        })
    })
})
})

//import { test, expect } from '@playwright/test';

// // /test('test', async ({ page }) => {
// //   await expect(page.getByRole('img', { name: 'Delivery background' })).toBeVisible();

// //   await page.getByText('Continue as Vendor').click();
// //   await expect(page.getByRole('row', { name: '# Reference Status Total' })).toBeVisible();

// //   await page.getByRole('link', { name: 'Wallet' }).click();
// //   await page.getByRole('link', { name: 'Products' }).click();
// //   await expect(page.getByRole('heading', { name: 'Products', exact: true })).toBeVisible();

// //   await page.getByRole('link', { name: 'Promotions' }).click();
// //   await expect(page.getByRole('heading', { name: 'Promotions', exact: true })).toBeVisible();

// //   await page.getByRole('link', { name: 'Settlements' }).click();
// //   await expect(page.getByRole('button', { name: 'ACCOUNTS' })).toBeVisible();

// //   await page.getByRole('link', { name: 'Fulfillment orders' }).click();
// //   await expect(page.getByRole('button', { name: 'Filter' })).toBeVisible();

// //   await page.getByRole('link', { name: 'Shipments' }).click();
// //   await expect(page.getByRole('row', { name: '# Tracking No. Order No.' })).toBeVisible();

// //   await page.getByRole('link', { name: 'Returns' }).click();
// //   await expect(page.getByRole('heading', { name: 'returns', exact: true })).toBeVisible();

// //   await page.getByRole('link', { name: 'Inventory' }).click();
// //   await expect(page.getByRole('heading', { name: 'Inventory', exact: true })).toBeVisible();

// //   await page.locator('path').nth(1).click();
// })