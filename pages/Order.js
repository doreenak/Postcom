import { HomePage } from "./HomePage";  

exports.OrderPage = class orderPage {
    constructor(page) {
        this.page = page
        this.url = '/orders';

        // Define selectors
        this.search_box = page.getByRole('textbox', { name: 'Search for products, brands,' });
        this.order_list = page.locator('.order-list');
        this.first_order = page.locator('.order-item').first();
        this.order_details_button = page.getByRole('button', { name: 'View Details' });
        this.cancel_order_button = page.getByRole('button', { name: 'Cancel Order' });

    }
}