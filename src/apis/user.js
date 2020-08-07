import service from "../utils/request";

// 登录
export function login (data) {
    return service({
        url: '/login/',
        method: 'post',
        data: data
    })
}

// 注册
export function register (data) {
    return service({
        url: '/register/',
        method: 'post',
        data: data
    })
}

// 获取验证码
export function getCode (data) {
    return service({
        url: '/getSms/',
        method: 'post',
        data: data
    })
}
