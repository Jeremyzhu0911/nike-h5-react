import axios from 'axios';
import {BASE_URL, TIME_OUT} from "src/server/config";
import {Loading, Message} from 'element-ui';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
});

const loading = {
    loadingInstance: null,
    open: function () {
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({
                target: ".main",
                text: "拼命加载中",
                background: "#1c1e2147"
            })
        }
    },
    close: function () {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
}

//请求和拦截
instance.interceptors.request.use(res => {
    //发送请求之前
    loading.open();
    return res.data;
}, error => {
    loading.close();
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                console.log("请求错误");
                break;
            case 401:
                console.log("请求错误");
                break;
            default:
                console.log("请求错误");
        }
    }
    return Promise.reject(error);;
})

//响应拦截器
instance.interceptors.response.use(res => {
    //响应拦截
    loading.close();
    if(res.data.code !== 200){
        Message({
            message: res.data.message || "服务器异常",
            type: "warning",
            duration: 5*1000
        })
    }
    return res.data;
}, error => {
    loading.close();
        Message({
            message: error.message || "服务器异常",
            type: "error",
            duration: 5*1000
        })
    return Promise.reject(error);
})

export default instance;
