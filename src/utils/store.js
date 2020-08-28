export default {
    /**
     * 获取存储对象
     * @returns {Storage}
     */
    getStore() {
        return window.localStorage
    },

    /**
     * 获取存储
     * @param key
     * @param origin
     * @returns {string}
     */
    get(key, origin) {
        const data = this.getStore().getItem(key);
        if (!data) {
            return data
        }
        return !origin ? JSON.parse(data) : data
    },

    /**
     * 设置存储
     * @param key
     * @param value
     */
    set(key, value) {
        if (typeof value !== 'string') {
            value = JSON.stringify(value)
        }

        return this.getStore().setItem(key, value)
    },

    /**
     * 删除
     * @param key
     */
    remove(key) {
        return this.getStore().removeItem(key)
    },

    /**
     * 全部清除
     */
    clear() {
        return this.getStore().clear()
    }
}
