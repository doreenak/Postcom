exports.HomePage = class homePage {
    constructor(page) {

    
        this.page = page
        this.url = '/shop';

        // Define selectors
        this.logo = page.getByRole('link', { name: 'Postcom' });
        this.sign_in_or_register = page.getByRole('link', { name: 'Sign in or register' });
        this.search_box =page.getByRole('textbox', { name: 'Search for products, brands,' });
        this.cart_icon = page.getByRole('link', { name: 'View cart' });
        this.categories_menu = page.getByRole('heading', { name: 'More Categories' });
        this.featured_products_section = page.locator('div').filter({ hasText: /^Festive Exclusive DealsShop Now!!!$/ }).nth(2);
        this.footer = page.locator('footer');
        this.continue_as_vendor_button = page.getByText('Continue as Vendor');
        this.continue_as_customer_button = page.getByText('Continue as Customer');
        this.exclusive_deals = page.getByText('Festive Exclusive DealsShop').first();
        this.product_list = page.locator('.product-list');
        this.first_product = page.locator('.absolute.inset-0.flex.items-center.justify-center.gap-3').first();
    }

    async gotoHomePage() {
        await this.page.goto(this.url);
        
    }
    async isLoaded() {
        await this.logo.waitFor();
        await this.search_box.waitFor();
        await this.cart_icon.waitFor();
        await this.categories_menu.waitFor();
        await this.featured_products_section.waitFor();
        await this.footer.waitFor();
    }

    async continueAsVendor() {
        await this.continue_as_vendor_button.click();
    }

    async continueAsCustomer() {
        await this.continue_as_customer_button.click();
    }

    async selectFirstProduct() {
        await this.first_product.scrollIntoViewIfNeeded();
        await this.first_product.click();
    }

    async verifyExclusiveDeals() {
        await this.exclusive_deals.waitFor();
    }

    async searchProduct(productName) {
        await this.search_box.click();
        await this.search_box.fill(productName);
        await this.search_box.press('Enter');
    }

    async goToCart() {
        await this.cart_icon.click();
    }
}