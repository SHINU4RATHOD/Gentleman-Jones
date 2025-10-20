export type ProductCategory = 'Suits' | 'Shirts' | 'Shoes' | 'Accessories';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageId: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
