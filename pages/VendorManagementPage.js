const { expect } = require('@playwright/test')

exports.VendorPage = class vendorPage {
    constructor(page) {
        this.page = page;
        this.url = '/welcome/couriers/redirect'

        this.continue_as_vendor_button = page.getByText('Continue as Vendor');
        this.continue_as_customer_button = page.getByText('Continue as Customer');

        this.products = page.getByRole('link', { name: 'Products' });
        this.promotions = page.getByRole('link', { name: 'Promotions' });
        this.settlements = page.getByRole('link', { name: 'Settlements' });
        this.fulfillment_orders = page.getByRole('link', { name: 'Fulfillment orders' });
        this.shipments = page.getByRole('link', { name: 'Shipments' });
        this.returns = page.getByRole('link', { name: 'Returns' });
        this.inventory = page.getByRole('link', { name: 'Inventory' });
        this.add_products = page.getByRole('button', { name: 'Add Product' })

    }

    async continueAsVendor() {
        await this.page.goto(this.url);
        //await this.page.pause();
        await this.page.getByText('Continue as Vendor', { timeout: 10000 }).click();
        await expect(this.page.getByRole('heading', { name: 'My Wallet' })).toBeVisible();
        //await this.addProduct();


    }

    async addProduct() {
        await this.page.pause();
        await this.continueAsVendor();
        await this.products.click()
        await this.add_products.click();
        await this.page.getByRole('button', { name: 'Select' }).first().click();
        await this.page.getByRole('listitem').filter({ hasText: 'SIMPLE' }).click();
        // const myTrigger = this.page.getByRole('button', { name: 'Select' }).nth(1);

        // // Define the specific checkboxes for this instance
        // const myOptions = this.page.locator('.author-list input[type="checkbox"]');
        const categoryTrigger = this.page.locator('div')
            .filter({ hasText: 'Categories' })
            .getByRole('button', { name: 'Select' })
            .first(); // .first() ensures we don't hit the parent categorization block

        await this.selectRandomFromAnyDropdown(categoryTrigger);

        // 2. Select Family
        const familyTrigger = this.page.locator('div')
            .filter({ hasText: 'Family' })
            .getByRole('button', { name: 'Select' }).first();

        await this.selectRandomFromAnyDropdown(familyTrigger);

        // Instead of counting all listitems (which includes sidebar), 
        // wait for the specific dropdown to disappear or the next button to be clickable
        const categoryButton = this.page.getByRole('button', { name: 'Select' }).nth(2);

        // Ensure the dropdown has actually closed and the next button is ready
        await expect(categoryButton).toBeVisible();
        await categoryButton.click();

        await this.page.getByRole('textbox', { name: 'Product Name' }).fill('New Test Product');
        await this.page.getByRole('textbox', { name: 'Product Price' }).fill('100000');
        await this.page.getByRole('textbox', { name: 'Product Weight in Kgs' }).fill('2.5');
        await this.page.getByRole('textbox', { name: 'Product Discount' }).fill('80000');
        await this.page.getByRole('textbox', { name: 'Write a simple description of' }).fill('Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
        await this.page.getByRole('textbox', { name: 'Write everything about the' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
        await this.page.getByRole('button', { name: 'Create Product' }).click();

    }
    async selectRandomFromAnyChecklist(trigger, options) {
        // 1. Open the dropdown
        await trigger.click();
        await options.first().waitFor({ state: 'visible', timeout: 5000 });

        const count = await options.count();
        if (count === 0) throw new Error("No options found for the provided locator.");

        const randomIndex = Math.floor(Math.random() * count);
        await options.nth(randomIndex).check();
    }

    async selectRandomFromAnyDropdown(trigger, options) {
        // 1. Open the dropdown
        await trigger.click();
        const dropdownOptions = this.page.getByRole('listitem').filter({ state: 'visible' });
        await dropdownOptions.first().waitFor({ state: 'visible' });

        const count = await dropdownOptions.count();
        if (count > 0) {
            const randomIndex = Math.floor(Math.random() * count);
            await dropdownOptions.nth(randomIndex).click();
        } else {
            throw new Error("No options found in the dropdown after clicking trigger.");
        }
    }

    async updateInventoryAddStock() {

        await this.continueAsVendor();
        await this.inventory.click();
        await this.page.pause();
        await this.addStock();
        await this.page.getByRole('button', { name: 'BACK' }).click();
        await this.increaseStock();


    }

    async addStock() {
        await this.page.getByRole('button', { name: 'Add Stock' }).click();
        await this.page.getByRole('textbox', { name: 'Enter lot number' }).fill('LOT1103');
        await this.page.getByRole('spinbutton').fill('5');
        await this.page.getByRole('button', { name: 'Save' }).click();

    }
    async increaseStock() {
        await this.continueAsVendor();
        await this.inventory.click();
        await this.page.getByRole('button', { name: 'Update stock' }).click();
        await expect(this.page.getByRole('heading', { name: 'Lot Management' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Update stock' }).first().click();
        const dialog = this.page.getByRole('dialog');
        const originalValueContainer = dialog.locator('div').filter({ hasText: /^Original$/ });

        const addCount = Math.floor(Math.random() * 5) + 1;
        console.log(`Adding ${addCount} items to stock`);

        for (let i = 0; i < addCount; i++) {
            await this.page.getByRole('button', { name: 'Increase', exact: true }).click();
        }
        await this.page.getByPlaceholder('Quantity to add').click();
        await dialog.getByRole('spinbutton').fill(addCount.toString());
        const stockActions = [
            'New Arrival',
            'Return to Stock',
            'Production Add',
            'Correction',
            'Audit',
            'Other'
        ];

        const randomIndex = Math.floor(Math.random() * stockActions.length);
        const chosenAction = stockActions[randomIndex];

        // Log the choice for easier debugging in CI/CD
        console.log(`Randomly selected stock action: ${chosenAction}`);

        // Click the button using the exact name to avoid strict mode violations
        await this.page.getByRole('button', { name: chosenAction, exact: true }).click();
        await this.page.getByRole('button', { name: 'Add Stock' }).click();

    }

    async reduceStock() {
        await this.continueAsVendor();
        await this.inventory.click();
        await this.page.getByRole('button', { name: 'Update stock' }).click();
        await expect(this.page.getByRole('heading', { name: 'Lot Management' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Update stock' }).first().click();
        const dialog = this.page.getByRole('dialog');

        const originalValueContainer = dialog.locator('div').filter({ hasText: /^Original$/ });
        // 2. Generate random numbers for actions
        const reduceCount = Math.floor(Math.random() * 3) + 1;
        console.log(`Adding ${reduceCount} items to stock`);

        for (let i = 0; i < reduceCount; i++) {
            await this.page.getByRole('button', { name: 'Reduce', exact: true }).click();
        }
        await this.page.getByPlaceholder('Quantity to remove').click();
        await dialog.getByRole('spinbutton').fill(reduceCount.toString());
        const stockActions = [
            'Lost',
            'Return',
            'Expired',
            'Sold',
            'Damaged',
            'Audit',
            'Correction',
            'Other'
        ];

        const randomIndex = Math.floor(Math.random() * stockActions.length);
        const chosenAction = stockActions[randomIndex];
        console.log(`Randomly selected stock action: ${chosenAction}`);

        await this.page.getByRole('button', { name: chosenAction, exact: true }).click();
        await this.page.getByRole('button', { name: 'Remove Stock' }).click();


    }


}