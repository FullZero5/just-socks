import type { Product, ProductList } from "../types/Product";
import { ProductCategory } from "../types/Product";
import productsData from './products.json';

type SortBy = 'price' | 'category' | 'color' | null;

export const products: Product[] = productsData.map(product => ({
  ...product,
  category: product.category as ProductCategory
}));

export const getProducts = (
  skip: number = 0,
  limit: number = 10,
  sortBy: SortBy = null,
  sortOrder: 'asc' | 'desc' = 'asc',
  filterByColor: string | null = null
): ProductList => {
  let filteredProducts = [...productsData];

  // Фильтрация по цвету
  if (filterByColor) {
    filteredProducts = filteredProducts.filter(
      (product) => product.color.toLowerCase() === filterByColor.toLowerCase()
    );
  }

  // Сортировка
  if (sortBy) {
    filteredProducts = sortProducts(filteredProducts, sortBy, sortOrder);
  }

  const total = filteredProducts.length;
  const products = filteredProducts
    .slice(skip, skip + limit)
    .map((product) => ({
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

// Функция сортировки
const sortProducts = (
  products: Product[],
  sortBy: SortBy,
  sortOrder: 'asc' | 'desc'
): Product[] => {
  return products.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      case 'category':
        return sortOrder === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      case 'color':
        return sortOrder === 'asc'
          ? a.color.localeCompare(b.color)
          : b.color.localeCompare(a.color);
      default:
        return 0;
    }
  });
};