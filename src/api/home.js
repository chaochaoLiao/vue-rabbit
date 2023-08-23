import http from '@/utils/http'

export const getBannerListApi = (params = {}) => {
    const { distributionSite = '1' } = params
    return http.get('home/banner', {
      distributionSite
    })
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