import { create } from 'zustand';
import { ProductStore, Product } from '../types';
import { products as initialProducts } from '../data/products';

export const useProductStore = create<ProductStore>((set) => ({
  products: initialProducts,
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));