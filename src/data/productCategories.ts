import {IProductCategory} from '../models/IProductCategory';

export const productCategories: IProductCategory[] = 
[
    {
        name: 'Laptops',
        path: '/laptops',
        expectedProducts: ['MacBook', 'Sony VAIO']
    },
    {
        name: 'Phones',
        path: '/phones',
        expectedProducts: ['iPhone', 'Samsung Galaxy']
    }
];
