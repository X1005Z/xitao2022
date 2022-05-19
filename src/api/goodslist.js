import instance from './request.js'

export function fetchGoodsList(page = 1, pagesize = 10) {
    return instance.get(`/getgoods?pageindex=${page}&pagesize=${pagesize}`);
}
