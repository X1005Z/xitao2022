import instance from './request.js'

export function fetchLogin(username, password) {
    return instance.post('/login', {
        username,
        password
    })
}

// 上传头像
export function fetchUploadAvatar(formData) {
    return instance.post('/upload', formData)
}

// 添加地址
export function fetchAddAddress(user_id, data) {
    return instance.post(`/addaddress/${user_id}`, data)
}

// 获取用户地址
export function fetchUserAddress(user_id) {
    return instance.get(`/getaddress/${user_id}`)
}

// 删除用户地址
export function fetchDelUserAddress(address_id) {
    return instance.post(`/deladdress/${address_id}`)
}

// 修改用户地址
export function fetchEditUserAddress(address_id, data) {
    return instance.post(`/updateaddress/${address_id}`, data)
}