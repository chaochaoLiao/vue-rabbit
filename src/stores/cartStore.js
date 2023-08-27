import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { useUserStore } from "./user"
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/api/cart'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const isLogin = computed(() => userStore.userInfo.token)
    const userStore = useUserStore()
    const addCart = async (goods) => {    
        const { skuId, count } = goods
        if( isLogin.value ){
           await insertCartAPI({ skuId, count})
           const res = await findNewCartListAPI()
           cartList.value = res.result
        } else {
       //通过传过来的商品对象中的skuId判断商品是否已经被添加过
       const item = cartList.value.find(item => goods.skuId === item.skuId )
       if (item) {
        item.count = item.count + goods.count
       } else {
        cartList.value.push(goods)
       }
        }

    }
    const updata = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    const countFix = (skuId, count) => {
        const item = cartList.value.find(item => item.skuId === skuId)
        item.count = count
    }
    const clearCartList = () => { cartList.value = []}
    
    const removeCart = async (skuId) => {
        if(isLogin.value) {
           await delCartAPI([skuId])
           const res = await findNewCartListAPI()
           cartList.value = res.result
        } else {
            cartList.value = cartList.value.filter(item => item.skuId!== skuId)
        }
        
    }
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }

   const totalPrice = computed(() => {
       return totalPrice.value = cartList.value.reduce((sum, item) => {
            return sum + item.price * item.count
        }, 0)
    })
    const totalCount = computed(() => {
        return totalPrice.value = cartList.value.reduce((sum, item) => {
             return sum + item.count
         }, 0)
     })
    const isAll = computed(() => {
        return cartList.value.every(item => item.selected)
    })
    const selectedCount = computed(() => {
        const selectedItem = cartList.value.filter(item => item.selected)

        return selectedItem.reduce((sum, item) => {
            return sum + item.count
          },0)
    })
    const selectedPrice = computed(() => {
        const selectedItem = cartList.value.filter(item => item.selected)

        return selectedItem.reduce((sum, item) => {
            return sum + item.count * item.price
          },0)
    })

    return {
        cartList,
        addCart,
        removeCart,
        totalPrice,
        totalCount,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        countFix,
        clearCartList,
        updata
    }
},{
    persist: true,
} )