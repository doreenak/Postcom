import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login';

test.describe('Login suite', () => {

  test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.gotoLoginPage()
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('login with valid credentials', async ({ page }) => {

    const Login = new LoginPage(page)
    await Login.login('arnoldmusiikamwiine@gmail.com', 'Camewent123@')

  });

  test('Login with invalid email and correct password', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.login('arnoldmuiikamwiine@gmail.com', 'Camewent123@')
    await expect(page.getByRole('alert')).toContainText('User with email does not exist');
  });

  test('Login with invalid password', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.login('arnoldmusiikamwiine@gmail.com', 'Cameent123@')
    await expect(page.getByRole('alert')).toContainText('Invalid user password');
  });

  test.only('Login as vendor', async({page}) =>{
    const Login = new LoginPage(page)
    await Login.login('arnoldmusiikamwiine@gmail.com', 'Camewent123@')
    await page.getByText('Continue as vendor').click();
  })
  test('Logout successfully', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.login('arnoldmusiikamwiine@gmail.com', 'Camewent123@')
    await page.getByText('Continue as Customer').click();
    await page.getByRole('button', { name: 'User menu' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
  });
})



