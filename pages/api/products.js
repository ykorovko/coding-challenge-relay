// @flow
import { faker } from '@faker-js/faker';

export type Product = {
  id: number,
  name: string,
  price: string,
  description: string,
  category: string,
  createdAt: string,
};

export const products: Product[] = new Array(9).fill(1).map((_, i) => ({
  id: i + 1,
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  createdAt: faker.date.past().toISOString(),
}));

export const get = () => products;

export const add = (product: Product) => {
  const newProduct = {
    id: Date.now(),
    createdAt: faker.date.past().toISOString(),
    ...product,
  };

  products.push(newProduct);

  return newProduct;
};
