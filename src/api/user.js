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
