import { BasePage, HardAssertions, Wait } from '@opencart-auto/pw-core';
import { CART_SUCCESS_ALERT_FRAGMENT } from '../state/alertMessages';
import { CatalogPaths } from '../state/paths';

export class ProductListingPage extends BasePage {
    productCards = this.page.locator('.product-thumb');
    categoryHeader = this.page.getByRole('heading', { level: 2 });

    private get addToCartSuccessAlert() {
        return this.page.locator('.alert.alert-success.alert-dismissible');
    }

    getProductByName(product: string) {
        return this.page.locator('.product-thumb', {
            has: this.page.getByRole('link', { name: product }),
        });
    }

    async openSearchResults(term: string) {
        await this.goto(CatalogPaths.search(term));
    }

    async checkProductListed(product: string) {
        await HardAssertions.visible(this.getProductByName(product));
    }

    async addToCartProductByName(name: string) {
        const card = this.getProductByName(name);
        await Wait.click(card.getByRole('button', { name: 'Add to Cart' }));
    }

    private wishListButton(productCard: ReturnType<ProductListingPage['getProductByName']>) {
        return productCard.locator(
            'button[data-original-title="Add to Wish List"], button[onclick^="wishlist.add"]'
        );
    }

    async addToWishListProductByName(product: string) {
        const productCard = this.getProductByName(product);
        await Wait.click(this.wishListButton(productCard));
        await Wait.forDOM(this.page);
    }

    async productAddedMessage(product: string) {
        const message = this.addToCartSuccessAlert;
        await HardAssertions.containsText(message, product);
        await HardAssertions.containsText(message, CART_SUCCESS_ALERT_FRAGMENT);
    }

    async assertNoAddToCartSuccess() {
        await HardAssertions.count(this.addToCartSuccessAlert, 0);
    }

    async getProductCount(): Promise<number> {
        return this.productCards.count();
    }

    async verifyCategory(title: string) {
        await HardAssertions.hasText(this.categoryHeader, title);
    }

    async verifyAtLeastOneProduct() {
        await HardAssertions.visible(this.productCards.first());
    }
}
