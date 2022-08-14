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

/**
 * 获取员工列表
 * @param {Object} params
 * @returns promise
 */
export const getEmployeesInfoApi = (params) => {
  return request({
    method: 'GET',
    url: '/sys/user',
    params,
  })
}

/**
 * 删除员工
 * @param {Number} id 员工id
 * @returns
 */
export function delEmployeeApi(id) {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`,
  })
}

/**
 * 新增员工
 * @param {Object} data 新增员工所需要的信息
 * @returns
 */
export const addEmployees = (data) => {
  return request({
    method: 'POST',
    url: '/sys/user',
    data,
  })
}
