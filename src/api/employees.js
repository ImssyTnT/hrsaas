import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns promise
 */
export const getEmployeesApi = () => {
  return request({
    method: 'GET',
    url: '/sys/user/simple',
  })
}
