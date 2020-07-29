/**
 * 前端Storage工具类作了简单封装：
 * 1、目前使用sessionStorage来存储登录信息（登录状态、登录用户、Token信息等）；
 * 2、如需使用localStorage来存储则统一在这里调整即可；
 */
var Storage = {
    /**
     * 统一转换标记
     */
    flag: false,
    /**
     * 1、flag=true：sessionStorage
     * 2、flag=false: localStorage
     */
    getStorage: function() {
        return this.flag ? window.sessionStorage : window.localStorage;
    },
    setItem: function(key, value) {
        this.getStorage().setItem(key, JSON.stringify(value));
    },
    getItem: function(key) {
        return JSON.parse(this.getStorage().getItem(key));
    },
    removeItem: function(key) {
        this.getStorage().removeItem(key);
    },
    getUserInfo: function() {
        return this.getItem("userInfo");
    }
}

export default Storage;