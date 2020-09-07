import service from "../utils/request";

// 部门列表
export function departmentList (data) {
    return service({
        url: '/department/list/',
        method: 'post',
        data: data
    })
}
// 修改状态
export function setDeptState (data) {
    return service({
        url: '/department/status/',
        method: 'post',
        data: data
    })
}
// add
export function addDept (data) {
    return service({
        url: '/department/add/',
        method: 'post',
        data: data
    })
}
// add
export function delDept (data) {
    return service({
        url: '/department/delete/',
        method: 'post',
        data: data
    })
}

