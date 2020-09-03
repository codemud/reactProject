import verify from './verify'
import store from './store'

const models = {
    /**
     * 初始化
     * @param Component
     * @param rest
     * @returns {boolean}
     */
    Init({ component: Component, ...rest }) {

        // 检查登录
        if (rest.path === '/login') {
            return true
        }
        console.log('111')
        return !!verify.token.get();
    },

    /**
     * 菜单
     */
    menus: {
        /**
         * localstorage key
         */
        key: 'menu-trees',

        /**
         * 选中的菜单
         * localstorage key
         */
        activeKey: 'menu-trees-active',

        /**
         * 选中展开的菜单
         * localstorage key
         */
        activeOptionsKey: 'menu-trees-options-active',

        /**
         * 存储选中菜单
         * @param key
         */
        setActive(key) {
            store.set(this.activeKey, key)
        },

        /**
         * 获取存储选中
         * @param key
         * @returns {*|string}
         */
        getActive(key = '1') {
            const active = store.get(this.activeKey, true);
            return active && active !== 'undefined' ? active : key
        },

        /**
         * 存储选中父级菜单
         * @param key
         */
        setOptionsActive(key) {
            store.set(this.activeOptionsKey, key)
        },

        /**
         * 获取存储选中父级
         * @param key
         * @returns {*|string}
         */
        getOptionsActive(key = ['1']) {
            const active = store.get(this.activeOptionsKey)
            return active && active !== 'undefined' ? active : key
        }
    },

    /**
     * logo
     */
    logo: {
        // 头部
        header: {
            key: 'logo-header',

            /**
             * 获取
             * @returns {*}
             */
            get() {
                return store.get(this.key) || ''
            }
        }
    },

    /**
     * 登录用户信息
     */
    userinfo: {
        key: 'user-info',

        /**
         * 获取
         * @returns {*}
         */
        get() {
            return store.get(this.key) || {}
        }
    },

    /**
     * 登录code
     */
    logincode: {
        key: 'login-code',

        /**
         * 获取
         * @returns {*}
         */
        get() {
            return store.get(this.key)
        }
    },
    conf:{
        /**
         * 设置配置
         */
        set(data,callback) {
            store.set(models.userinfo.key, data.username);
            'function' === typeof callback && callback()
        },
    }

};

export default models
