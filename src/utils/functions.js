const functions = {
    /**
     * 复制文本
     * @param selector
     * @param f
     */
    copyText: function (selector, f) {
        selector.select()
        document.execCommand("copy")
        if (typeof f === "function" && f) {
            f(selector.val())
        }
    },

    /**
     * 获取URL参数
     * @param key
     * @returns {*}
     * @constructor
     * @return {string}
     */
    GetQueryString(key) {
        let r = window.location.search.substr(1).match(
            new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")
        )

        if (r != null) {
            return decodeURI(r[2])
        }

        return null
    },

    /**
     * 获取当前uri
     * @returns {*}
     * @constructor
     * @return {string}
     */
    GetRequestUri() {
        return window.location.pathname
    },

    /**
     * 验证是否是手机
     * @returns {RegExpMatchArray}
     * @constructor
     */
    IsMobile() {
        return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i)
    },

    /**
     * 获取所有文件
     * @param dir
     * @returns {*[]}
     */
    modules(dir) {
        console.log('222')
        let modules = [], data = {}

        dir.keys().forEach(value => {
            if (value.replace(/(\.\/|\.js)/g, '').toLowerCase() !== 'common' && dir(value).default) {
                modules = [...modules, ...dir(value).default]
            }
        })

        modules.forEach(value => {
            data[value.path] = value
        })

        modules = []
        for (let i in data) {
            modules.push(data[i])
        }

        return modules
    },





};
export default functions
