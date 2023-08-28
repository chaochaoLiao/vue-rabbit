import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'
import GoodsItem from "@/views/Home/components/GoodsItem.vue"

export const componentPlugin = {
    install (app) {
        app.component('xtx-sku', XtxSku)
        app.component('xtx-image-view', ImageView)
        app.component('GoodsItem', GoodsItem)
    }
}