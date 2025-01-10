import type { Product, ProductList } from "../types/Product";
import { ProductCategory } from "../types/Product";
import productsData from './products.json';

export const products: Product[] = productsData.map(product => ({
  ...product,
  category: product.category as ProductCategory
}));

export const getProducts = (
  skip: number = 0,
  limit: number = 10,
  sortBy: 'price' | 'category' | null = null,
  sortOrder: 'asc' | 'desc' = 'asc'
): ProductList => {
  let sortedProducts = [...productsData];

  // Сортировка по цене
  if (sortBy === 'price') {
    sortedProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  // Сортировка по категории
  if (sortBy === 'category') {
    sortedProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.category.localeCompare(b.category);
      } else {
        return b.category.localeCompare(a.category);
      }
    });
  }

  const total = sortedProducts.length;
  const products = sortedProducts
    .slice(skip, skip + limit)
    .map(product => ({
      ...product,
      category: product.category as ProductCategory,
    }));

  return {
    products,
    total,
    skip,
    limit,
  };
};