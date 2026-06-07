import { HardAssertions, SoftAssertions, BaseComponent } from '@opencart-auto/pw-core';
import { products } from '../data/products';


export class Ribbon extends BaseComponent
{
    async ribbonCheck()
    {
        const ribbonMenuWithDDL: string[][] = [
            ['Desktops', 'Show All Desktops'],
            ['Laptops & Notebooks', 'Show All Laptops & Notebooks'],
            ['Components', 'Show All Components'],
            ['MP3 Players', 'Show All MP3 Players'],
        ];
        const ribbonMenu: string[] = ['Tablets', 'Software', 'Phones & PDAs', 'Cameras'];

        for (const ribbon of ribbonMenuWithDDL)
        {
            const locator = this.page.getByRole('link', { name: ribbon[0] });
            if (await locator.isVisible())
            {
                await locator.click();
                await SoftAssertions.count(this.page.getByRole('link', { name: ribbon[1] }), 1);
            }
        }

        await Promise.all(
            ribbonMenu.map((ribbon) => SoftAssertions.visible(this.page.getByRole('link', { name: ribbon })))
        );
    }

    async openProductPage(category = products.NIKON_D300.category!)
    {
        await this.click(this.page.getByRole('link', { name: category }));
        await HardAssertions.visible(this.page.getByRole('heading', { name: category, level: 2 }));
    }
}
