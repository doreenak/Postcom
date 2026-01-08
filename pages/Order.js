import { HomePage } from "./HomePage";
const { expect } = require('@playwright/test');

exports.OrderPage = class orderPage {
    constructor(page) {
        this.page = page
        this.url = '/orders';

        // Define selectors
        this.search_box = page.getByRole('textbox', { name: 'Search for products, brands,' });
        this.cartItems = page.locator('.cart-item-row');
        this.product_list = page.locator('.product-list');
        this.first_product = page.locator('.absolute.inset-0.flex.items-center.justify-center.gap-3').first();
        this.productName = page.getByText('--20.00% Hisense☆☆☆☆☆(0) UGX 900,000 Buy Now! -31% Mens Long Sleeve Button Up').first();
        this.view_cart_item = page.getByRole('link', { name: 'View cart' });
        this.clear_cart_button = page.getByRole('button', { name: 'Clear Cart' });
        this.continue_shopping_button = page.getByRole('button', { name: 'Continue Shopping' });
        this.add_to_cart_btn = page.getByRole('button', { name: 'ADD TO CART' });
        this.view_cart = page.getByRole('link', { name: 'VIEW CART' });
        this.checkoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
        this.choose_delivery_method = page.getByRole('radio', { name: 'Door Delivery' });
        this.select_address = page.locator('.flex.items-start').first();
        this.terms_and_conditions_checkbox = page.getByRole('checkbox', { name: 'I agree to the terms &' });
        this.place_order_button = page.getByRole('button', { name: 'Place order' });
        this.payment_method_radio = page.getByRole('radio', { name: 'Pay on Delivery' });
        this.place_order_button = page.getByRole('button', { name: 'PLACE ORDER' });
        this.order_list = page.locator('.order-list');
        this.first_order = page.locator('.order-item').first();
        this.order_details_button = page.getByRole('button', { name: 'View Details' });
        this.cancel_order_button = page.getByRole('button', { name: 'Cancel Order' });
        this.delivery_address = page.getByRole('textbox', { name: 'Enter your preferred delivery' });
        this.delivery_place = page.getByRole('combobox');
        this.street_address = page.getByRole('textbox', { name: 'Street name and number' });
        this.delivery_instructions = page.getByRole('textbox', { name: 'Examples: Near the blue gate' });
        this.save_address_button = page.getByRole('button', { name: 'Save Address' });
        this.enterAddressDetails = page.getByRole('textbox', { name: 'your.email@example.com' });


    }

    async gotoOrderPage() {
        await this.page.goto(this.url);

    }
    // async enterAddressDetails(address) {
    //     // Fill in address details during checkout
    //     await this.page.getByLabel('Street Address').fill(address.street);
    //     await this.page.getByLabel('City').fill(address.city);
    //     await this.page.getByLabel('Postal Code').fill(address.postalCode);
    //     await this.page.getByLabel('Country').fill(address.country);
    // }

    async checkCartIsEmpty() {
        await this.page.goto('/cart');
        const cartItems = this.page.locator('.cart-item-row');
        const clear_cart_button = this.page.getByRole('button', { name: 'Clear Cart' });

        // 3. Check if cart has items
        // .count() returns the number of elements matching the locator
        const itemCount = await cartItems.count();

        if (itemCount > 0) {
            console.log(`Found ${itemCount} items. Clearing cart...`);
            await clear_cart_button.click();

            // Wait for the cart to be empty (optional but recommended)
            await expect(cartItems).toHaveCount(0);
        } else {
            console.log('Cart is already empty.');
        }
        await this.continue_shopping_button.click();
    }
    async orderproductAsExistingCustomer() {
        await expect(this.page).toHaveURL(/.*\/shop/);
        const cartCounter = await this.checkCartIsEmpty();
        await this.first_product.scrollIntoViewIfNeeded();
        await this.first_product.click();
        //await this.add_to_cart_btn.click();
        // Order.js line 42
        // This matches only "VIEW CART" and ignores "View cart"
        //await this.page.pause();
        const addToCartBtn = this.page.getByRole('button', { name: 'ADD TO CART' });
        const viewCartLink = this.page.getByRole('link', { name: 'VIEW CART', exact: true });
        // await expect(this.page.getByRole('link', { name: 'VIEW CART', exact: true })).toBeVisible();
        // await this.page.getByRole('link', { name: 'VIEW CART', exact: true }).click();
        await addToCartBtn.click();
        await viewCartLink.click();

        const checkoutButton = this.page.getByRole('button', { name: 'Proceed to Checkout' });
        await expect(checkoutButton).toBeEnabled();
        await checkoutButton.click();

        await expect(this.page).toHaveURL(/.*\/checkout/);
        await this.choose_delivery_method.check();
        //await this.page.pause();
        if (await this.enterAddressDetails.isVisible()) {
            await this.page.locator('.w-4.h-4.cursor-pointer').click();
        } else {
            console.log('Address details form is not visible, proceeding with existing address.');
        }
        await this.select_address.click();
        await this.terms_and_conditions_checkbox.check();
        await this.place_order_button.click();
        await this.page.pause();
        await expect(this.page.getByRole('heading', { name: 'Payment Method' })).toBeVisible();

        await this.page.getByRole('combobox').selectOption({ index: 2 }); // Select 'Mobile Money' option
        await this.page.getByRole('textbox', { name: 'Enter phone number' }).fill('0770000000');
        await this.page.getByRole('button', { name: 'Pay UGX' }).click();
        await expect(this.page.getByRole('button', { name: 'Search' })).toBeVisible();

        await this.page.getByRole('heading', { name: ' Order Information' }).click();

        return 'Order placed successfully';


    }
    //await this.search_box.click();
    // await this.search_box.fill(productName);
    // await this.search_box.press('Enter');
    // await this.page.getByRole('img', { name: productName }).click();
    // await this.page.getByRole('button', { name: 'ADD TO CART' }).click();

}