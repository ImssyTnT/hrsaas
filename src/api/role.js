import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {Object} params
 * @returns promise
 */
export const getRolesApi = (params) => {
  return request({
    method: 'GET',
    url: '/sys/role',
    params,
  })
}

/**
 * 新增角色
 * @param {Objce} data
 * @returns promise
 */
export const addRoles = (data) => {
  return request({
    method: 'POST',
    url: '/sys/role',
    data,
  })
}

/**
 * 删除角色
 * @param {Number} id 角色id
 * @returns promise
 */
export const delRole = (id) => {
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`,
  })
}
