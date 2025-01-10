export interface ProductList {
[x: string]: any;
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export enum ProductCategory {
    Shirts = "shirts",
    Pants = "pants",
    Shoes = "shoes",
    Socks = "socks",
    Booties = "booties"
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    description: string;
    cover: string;
    coverCredits: string;
    category: ProductCategory;
}