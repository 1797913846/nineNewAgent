/**
 * http配置
 */
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
import router from './router'

/********************************************************** 
let url;
//读取数据
function isIndexDb() {
    var indexedDB =
        window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.msIndexedDB;
    if (!indexedDB) {
        console.log("你的浏览器不支持IndexedDB");
    } else {
        console.log("你的浏览器支持IndexedDB");
    }
    var request = window.indexedDB.open("resetData", 2);
    var db;
    request.onsuccess = function (e) {
        //success：打开成功^-^
        console.log("数据库打开成功...");
        db = e.target.result;
        var transaction = db.transaction(['url']);
        var objectStore = transaction.objectStore('url');
        var request = objectStore.get(1);

        request.onerror = function (event) {
            console.log('事务失败');
        };

        request.onsuccess = function (event) {
            if (request.result) {
                console.log('Name: ' + request.result.name);
                url = request.result.name;
                console.log('url>>', url);
                // axios 配置
                //设置请求超时时间，现在，在超时前，所有请求都会等待 2.5 秒
                axios.defaults.timeout = 5000;
                //设置接口的域名
                axios.defaults.baseURL = url;

                // 添加请求拦截器
                axios.interceptors.request.use(
                    config => {
                        //如果存在token,请求头里面设置
                        var token = sessionStorage.getItem("token") || localStorage.getItem("token")
                        if (token) {
                            config.headers.Token = token;
                        }
                        return config;
                    },
                    err => {
                        return Promise.reject(err);
                    });

                // 添加请求拦截器
                axios.interceptors.response.use(
                    response => {
                        //console.log(JSON.stringify(response))
                        if (response) {
                            switch (response.data.code) {
                                case 401:
                                    // 401 清除token信息并跳转到登录页面
                                    router.replace({
                                        path: '/login',
                                        query: { redirect: router.currentRoute.fullPath }
                                    });
                                    break;
                            }
                        }
                        return response;
                    },
                    error => {
                        return Promise.reject(error.response.data)
                    });
            } else {
                console.log('未获得数据记录');
            }
        };
    };
};
if (localStorage.getItem("version") == 2) {
    isIndexDb();
}
********************************************************** */

// axios 配置
//设置请求超时时间，现在，在超时前，所有请求都会等待 2.5 秒
axios.defaults.timeout = 5000;
//设置接口的域名
let burl;
if (localStorage.getItem("baseUrl") == "http://assets.smartqmx.com") {
    burl = "http://139.129.39.75";
} else if (localStorage.getItem("baseUrl") == "http://webapi.smartqmx.com") {
    burl = "http://47.102.136.48";
} else {
    burl = localStorage.getItem("baseUrl");
}
axios.defaults.baseURL = burl;

console.log('axios', axios.defaults.baseURL)

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        //如果存在token,请求头里面设置
        var userName = localStorage.getItem("userName");
        var token = sessionStorage.getItem("token" + userName) || localStorage.getItem("token" + userName)
        if (token) {
            config.headers.Token = token;
        }
        config.params = {
            ...config.params,
            timeStamp: Date.parse(new Date()) / 1000
        }
        config.baseURL = localStorage.getItem('baseUrl');
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// 添加请求拦截器
axios.interceptors.response.use(
    response => {
        //console.log(JSON.stringify(response))
        return response;
    },
    error => {
        console.log(error.response.status);  // 对响应错误做点什么
        if (error.response.status == 401) {
            // 401 清除token信息并跳转到登录页面
            router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath }
            });
        }
        if (error.response.status == 403) {
            // 401 清除token信息并跳转到登录页面
            Vue.prototype.$alert('您没有访问权限', '提示', {
                confirmButtonText: '确定',
                center: true,
                type: "error"
            })
        }
        if (error.response.status == 408) {
            // 401 清除token信息并跳转到登录页面
            Vue.prototype.$alert(error.response.data.msg, '提示', {
                confirmButtonText: '确定',
                center: true,
                type: "error",
                callback: action => {
                    var IFrameRequest = document.createElement("iframe");
                    IFrameRequest.id = "IFrameRequest";
                    IFrameRequest.src = 'tencent://message/?uin=1984856434';
                    IFrameRequest.style.display = "none";
                    document.body.appendChild(IFrameRequest);
                }
            })
        }
        return Promise.reject(error.response.data)
    });

export default axios;
