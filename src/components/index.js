import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentPlugin = {
    install (app) {
        app.component('xtx-sku', XtxSku)
        app.component('xtx-image-view', ImageView)
    }
}