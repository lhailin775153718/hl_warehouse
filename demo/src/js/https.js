import axios from 'axios'; // 引入axios
import Storage from './storage'
let imageUrl = 'http://shopkeeper.gdkeyong.com/file/';

axios.defaults.baseURL = 'http://shopkeeper.gdkeyong.com/api'
export default {
    get(_url, _params) {
        _params = _params == null ? {} : _params;

        return new Promise((resolve, reject) => {
            axios({
                url: _url,
                method: 'get',
                params: _params || {},
                headers: {
                    'source': 'H5',
                    'token': 'TOKEN_6c50637d19714f59b8bf107497ea7e20',
                    // 'token': Storage.getItem('userInfo').token,
                }
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            })
        })
    },
    post(_url, _params, isFormData) {
        if (isFormData == "" || isFormData == null || isFormData == undefined) {
            isFormData = false
        }
        return new Promise((resolve, reject) => {
            axios({
                url: _url,
                method: 'post',
                data: _params || {},
                headers: {
                    'source': 'H5',
                    // 'token': Storage.getItem('userInfo').token,
                    'token': 'TOKEN_6c50637d19714f59b8bf107497ea7e20',
                    'Content-Type': isFormData ? 'multipart/form-data' : 'application/json;charset=utf-8'
                }
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            })
        })
    },
    imageUrl
}