export type ProductCategory = {
  name: string;
  path: string;
  expectedProducts: string[];
};

export const productCategories: ProductCategory[] = [
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
