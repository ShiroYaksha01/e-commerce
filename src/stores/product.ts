import { defineStore } from 'pinia'
import axios from 'axios'

interface category {
  id?: number
  title: string
  items: number
  imgSrc: string
  bgColor: string
  group?: string
}

interface promotion {
  title: string
  imgSrc: string
  bgColor: string
  buttonColor: string
  url: string
}

interface product {
  id: number
  name: string
  categoryId: number
  countSold: number
  rating: number
  price: number
  imgSrc: string
  size: string
  promotionAsPercent: number
  instock: number
}

export const useProductStore = defineStore('product', {
  state: () => ({
    groups: [] as string[],
    promotions: [] as promotion[],
    categories: [] as category[],
    products: [] as product[]
  }),
  getters: {
    getCategoriesByGroup: (state) => {
      return (groupName: string) => {
        if (!groupName) return state.categories
        return state.categories.filter((cat: category) => cat.group === groupName)
      }
    },
    getProductsByGroup() {
      return (groupName: string) => {
        const groupCategories = this.getCategoriesByGroup(groupName)
        if (!groupCategories || groupCategories.length === 0) return []
        const categoryIds = groupCategories.map((cat: category) => cat.id).filter((id): id is number => id !== undefined)
        return this.products.filter((prod: product) => categoryIds.includes(prod.categoryId))
      }
    },
    getProductsByCategory: (state) => {
      return (categoryId: number) => state.products.filter(prod => prod.categoryId === categoryId)
    },
    getPopularProducts: (state) => {
      return state.products.filter(prod => prod.countSold > 10)
    }
  },
  actions: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/api/categories')
        this.categories = response.data.map((cat: { name: any; productCount: any; image: string; color: any }) => ({
          title: cat.name,
          items: cat.productCount,
          imgSrc: `http://localhost:3000/${cat.image.replace(/\\/g, '/')}`,
          bgColor: cat.color
        }))
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    async fetchPromotions() {
      try {
        const response = await axios.get('http://localhost:3000/api/promotions')
        this.promotions = response.data.map((promo: { title: any; image: string; color: any; buttonColor: any; url: any }) => ({
          title: promo.title,
          imgSrc: `http://localhost:3000/${promo.image.replace(/\\/g, '/')}`,
          bgColor: promo.color,
          buttonColor: promo.buttonColor,
          url: promo.url
        }))
      } catch (error) {
        console.error('Error fetching promotions:', error)
      }
    },
    async fetchGroups() {
      try {
        const response = await axios.get('http://localhost:3000/api/groups')
        this.groups = response.data.map((group: { name: string }) => group.name)
        console.log('✅ Fetched groups:', this.groups)
      } catch (error) {
        console.error('Error fetching groups:', error)
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/products')
        this.products = response.data.map((prod: any) => {
          // Parse image - backend stores as JSON array string like ["uploads\\product\\..."]
          let imagePath = prod.image
          try {
            const parsedImages = JSON.parse(prod.image)
            if (Array.isArray(parsedImages) && parsedImages.length > 0) {
              imagePath = parsedImages[0] // Get first image
            }
          } catch (e) {
            // If not JSON, use as is
            imagePath = prod.image
          }
          
          // Fix backslashes and double slashes
          imagePath = imagePath.replace(/\\/g, '/').replace(/\/\//g, '/')
          
          return {
            id: prod.id,
            name: prod.name,
            categoryId: prod.categoryId,
            countSold: prod.countSold,
            rating: prod.rating,
            price: prod.price,
            imgSrc: `http://localhost:3000/${imagePath}`,
            size: prod.size,
            promotionAsPercent: prod.promotionAsPercentage,
            instock: prod.instock
          }
        })
        console.log('✅ Fetched products:', this.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  },
})