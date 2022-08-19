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

/**
 * 批量导入员工信息
 * @param {Array} data 员工信息数组
 * @returns promise
 */
export const importEmployees = (data) => {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data,
  })
}

/**
 * 获取员工个人信息
 * @param {Number} id 员工信息id
 * @returns promise
 */
export const getEmployeesInfo = (id) => {
  return request({
    method: 'GET',
    url: `/employees/${id}/personalInfo`,
  })
}

/**
 * 修改员工个人信息
 * @param {Object} data 员工信息formData
 * @returns promise
 */
export const updateEmployeesInfo = (data) => {
  return request({
    method: 'PUT',
    url: `/employees/${data.userId}/personalInfo`,
    data,
  })
}

/**
 * 给员工分配角色
 * @param {Objcet} data
 * @returns promise
 */
export const assignRoles = (data) => {
  return request({
    method: 'PUT',
    url: '/sys/user/assignRoles',
    data,
  })
}
