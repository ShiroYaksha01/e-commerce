import { defineStore } from 'pinia';

interface Category {
    id: number;
    name: string;
    group: string;
}

interface Product {
    id: number;
    name: string;
    categoryId: number;
    group: string;
    countSold: number;
}



export const useProductStore = defineStore('product', {
    state: () => ({
        groups: [],
        promotions: [],
        categories: [] as Category[],
        products: [] as Product[]
    }),

    getters: {
        // 1) List all categories under a given group
        getCategoriesByGroup: (state) => {
            return (groupName: string) =>
            state.categories.filter(category => category.group === groupName)
        },

        // 2) List all products under a specific group
        getProductsByGroup: (state) => {
            return (groupName: string) =>
            state.products.filter(product => product.group === groupName)
        },

        // 3) List all products in a specific category
        getProductsByCategory: (state) => {
            return (categoryId: number)  =>
            state.products.filter(product => product.categoryId === categoryId)
        },

        // 4) Popular products (countSold > 10)
        getPopularProducts: (state) => {
            return state.products.filter(product => product.countSold > 10)
        },
    },

    actions: {},
})