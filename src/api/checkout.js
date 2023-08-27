import http from '@/utils/http'

export const getCheckInfoAPI = () => {
    return http({
        url:'member/order/pre'
    })
}

export const createOrderAPI = (data) => {
    return http({
        url:'member/order',
        method: 'post',
        data
    })
}