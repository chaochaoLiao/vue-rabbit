import http from '@/utils/http'

export const getBannerListApi = () => {
    return http.get('home/banner')
}

export const findNewApi = () => {
    return http.get('home/new')
}

export const getHotAPI = () => {
    return  http.get('home/hot')
  }

  export const getGoodsAPI = () => {
    return http({
      url: '/home/goods'
    })
  }