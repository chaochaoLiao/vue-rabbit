import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/api/cart'
import { findNewCartListAPI } from '@/api/cart'

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        mergeCartAPI(cartStore.cartList.map(item => {
            return {
               skuId: item.skuId,
               selected: item.selected,
               count: item.count
            }
        }))
        const result = await findNewCartListAPI()
        cartStore.cartList.value = result.result

    }
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCartList()
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true,
})