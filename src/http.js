/**
 * http配置
 */
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
import router from './router'

// axios 配置
//设置请求超时时间，现在，在超时前，所有请求都会等待 2.5 秒
axios.defaults.timeout = 5000;
//设置接口的域名
//10.10.1.26  120.26.187.19
// let burl = 'http://47.102.151.13';  
// let burl = 'http://10.10.1.26:808X';
let burl;
console.log('地址', window.location.href)
window.location.host != 'localhost:8080' && window.location.host != "10.10.1.17:8080" ? burl = "http://" + window.location.host : burl = "http://47.102.151.13"
// let burl='/';
axios.defaults.baseURL = burl;

console.log('axios', axios.defaults.baseURL)

let allhref = window.location.href;
let fucktoken;
function getCaption(obj) {
    var index = obj.lastIndexOf("~");
    obj = obj.substring(index + 1, obj.length);
    //  console.log(obj);
    return obj;
}


//判断字符串中是否有newbaby
if (allhref.indexOf("newbaby") != -1) {
    fucktoken = getCaption(allhref);
    console.log('我是新的token', fucktoken);
    localStorage.setItem("managerAuthorization", fucktoken);
    //token存本地，大家各自存
    let matchResult = allhref.match(/newbaby(\S*)~/)[1];
    console.log('是我啊', matchResult);
    localStorage.setItem("baby" + matchResult, fucktoken);
    // if (matchResult.length > 0) {
    //     alert(matchResult[0]);
    // }
}


// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        let token
        //如果存在token,请求头里面设置
        if (allhref.indexOf("newbaby") != -1) {
            let getmMatchResult = allhref.match(/newbaby(\S*)~/)[1];
            token = localStorage.getItem("baby" + getmMatchResult);
        }
        token ? token = token : token = localStorage.getItem('managerAuthorization');
        if (token) {
            config.headers.Authorization = token;
        }
        config.params = {
            ...config.params,
            timeStamp: Date.parse(new Date()) / 1000
        }
        config.baseURL = burl;
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// 添加请求拦截器
axios.interceptors.response.use(
    response => {
        // console.log(JSON.stringify(response))
        // if (response.data.code == 10002) {
        //     router.replace({
        //         path: '/login',
        //         query: { redirect: router.currentRoute.fullPath }
        //     });
        // }
        return response;
    },
    error => {
        console.log(error.response.status);  // 对响应错误做点什么
        if (error.response.status == 400) {
            // 401 清除token信息并跳转到登录页面
            // router.replace({
            //     path: '/login',
            //     query: { redirect: router.currentRoute.fullPath }
            // });
        }
        if (error.response.status == 401) {
            // Vue.prototype.$alert("登录超时，请重新登录", "提示", {
            //     confirmButtonText: "确定",
            //     center: true,
            //     type: "error",
            //     callback: action => {
            //         router.replace({
            //             path: '/login',
            //             query: { redirect: router.currentRoute.fullPath }
            //         });
            //         return false;
            //     }
            // });
            localStorage.clear();
            router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath }
            });
            //401 清除token信息并跳转到登录页面
            return false;
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
            // Vue.prototype.$alert(error.response.data.msg, '提示', {
            //     confirmButtonText: '确定',
            //     center: true,
            //     type: "error",
            //     callback: action => {
            //         var IFrameRequest = document.createElement("iframe");
            //         IFrameRequest.id = "IFrameRequest";
            //         IFrameRequest.src = 'tencent://message/?uin=1984856434';
            //         IFrameRequest.style.display = "none";
            //         document.body.appendChild(IFrameRequest);
            //     }
            // })
        }
        return Promise.reject(error.response.data)
    });

export default axios;
