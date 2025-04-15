import axios from "axios";

const http = axios.create({
    baseURL: 'https://v3pz.itndedu.com/v3pz',
    timeout: 10000,
    headers: { 'terminal': 'h5' }
})

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('h5_token')
    //不需要添加token的api
    const whiteUrl = ['/login']
    if (token && !whiteUrl.includes(config.url)) {
        config.headers['h-token'] = token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.code === -1) {

    }
    /**
     * window.location.href
     *表示当前页面的完整 URL（包括协议、域名、路径等）。给它赋值会触发页面跳转。
     *window.location.origin
     *返回当前 URL 的协议 + 域名 + 端口（例如 https://example.com:8080），即网站的根地址。
     */
    if (response.data.code === -2) {
        localStorage.removeItem('h5_token')
        localStorage.removeItem('h5_userInfo')

        window.location.href = window.location.origin
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default http