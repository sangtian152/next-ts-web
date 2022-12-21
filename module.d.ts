import type { _RouteRecordBase } from 'vue-router'
import * as axios from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * @description 设置为true，上传文件请求
     */
    isUpload?: boolean;
  }
}
