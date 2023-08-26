import { defineStore } from "pinia"
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = () => {

    }
    return {
        cartList,
        addCart
    }
} )