import store from './store'
import {message} from "antd";

const verify = {
    /**
     * 验证登录code
     * @param code
     * @returns {boolean|string}
     */
    loginCode(code) {

    },

    /**
     * 登录跳转
     * @returns {MessageType}
     */
    loginRedirect() {
        const callback = close => {
            close();
            window.location.href = '/login'
        };
        return message.warning('登录超时',5,()=>callback());
    },

    /**
     * 清除所有登录缓存
     * 菜单
     * 配置
     */
    clearStore() {
        store.clear()
    },

    /**
     * token
     */
    token: {
        /**
         *
         * @param results
         * @returns {{}}
         */
        set(results) {
            store.set('admin-token', results)
        },
        get(){
            let key = 'admin-token';
            return store.get(key,true);
        }
    }
};

export default verify
