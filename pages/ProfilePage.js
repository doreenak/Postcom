exports.ProfilePage = class profilePage {
    constructor(page) {
        this.page = page
        this.user_menu = page.getByRole('button', { name: 'User menu' });
        this.my_account = page.getByRole('link', { name: 'My Account' });
        this.profile_link = page.getByRole('link', { name: 'Profile' });
        this.orders = page.getByRole('link', { name: 'Orders' });
        this.wishlist = page.getByRole('link', { name: 'Wishlist' });
        this.wallet = page.getByRole('link', { name: 'My Wallet' });
        this.products = page.getByRole('link', { name: 'Products' });
        this.promotions = page.getByRole('link', { name: 'Promotions' });
        this.settlements = page.getByRole('link', { name: 'Settlements' });
        this.fulfillment_orders = page.getByRole('link', { name: 'Fulfillment orders' });
        this.shipments = page.getByRole('link', { name: 'Shipments' });
        this.returns = page.getByRole('link', { name: 'Returns' });
        this.inventory = page.getByRole('link', { name: 'Inventory' });
        this.mainEmail = page.getByLabel('Main Email');
    }

    async navigateToProfile() {
        await this.user_menu.click();
        await this.my_account.click();
    }
    
    
    async navigateToMyAccount() {
        await this.user_menu.click();
        await this.my_account.click();
    }

    
    async navigateToProfile() {
        await this.user_menu.click();
        await this.profile_link.click();
    }

    
    async navigateToOrders() {
        await this.user_menu.click();
        await this.orders.click();
    }

    
    async navigateToWishlist() {
        await this.user_menu.click();
        await this.wishlist.click();
    }

    // async navigateToVendorPage() {
    //    await this.wallet.waitFor();
    // }
     async navigateToProducts() {
        await this.products.click();
    }
    async navigateToPromotions() {
        await this.promotions.click();
    }
    async navigateToSettlements() {
        await this.settlements.click();
    }
    async navigateToFulfillmentOrders() {
        await this.fulfillment_orders.click();
    }
    async navigateToShipments() {
        await this.shipments.click();
    }
    async navigateToReturns() {
        await this.returns.click();
    }
    async navigateToInventory() {
        await this.inventory.click();
    }
}