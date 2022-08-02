import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data mobile password
 * @returns promise
 */
export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data,
  })
}

/**
 * 获取用户基本信息
 * @returns promise
 */
export const getUserInfoApi = () => {
  return request({
    method: 'POST',
    url: '/sys/profile',
  })
}

/**
 * 获取员工基本信息
 * @param {String} id 用户id
 * @returns promise
 */
export const getUserDetailInfo = (id) => {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`,
  })
}
