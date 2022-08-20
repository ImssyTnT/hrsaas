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

export const addPermission = (data) => {
  return request({
    method: 'POST',
    url: 'sys/permission',
    data,
  })
}
