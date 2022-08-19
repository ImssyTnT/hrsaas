import request from '@/utils/request'

/**
 * 获取所有权限
 * @returns promise
 */
export const getPrimissionList = () => {
  return request({
    method: 'GET',
    url: '/sys/permission',
  })
}
