import { defineStore } from "pinia"
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = (goods) => {
       //通过传过来的商品对象中的skuId判断商品是否已经被添加过
       const item = cartList.value.find(item => goods.skuId === item.skuId )
       if (item) {
        item.count = item.count + goods.count
       } else {
        cartList.value.push(goods)
       }

    }
    return {
        cartList,
        addCart
    }
},{
    persist: true,
} )