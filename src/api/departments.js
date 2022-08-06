import request from '@/utils/request.js'

/**
 * 获取组织结构
 * @returns promise
 */
export const getDeptsApi = () => {
  return request({
    method: 'GET',
    url: '/company/department',
  })
}

/**
 * 删除部门
 * @param {Number} id 需要删除的部门id
 * @returns
 */
export const delDeptsApi = (id) => {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`,
  })
}

/**
 * 添加部门
 * @param {Object} data
 * @returns promise
 */
export const postDeptApi = (data) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data,
  })
}

/**
 * 根据id获取部门详情
 * @param {String} id 部门id
 * @returns
 */
export const getDeptById = (id) => {
  return request({
    method: 'GET',
    url: `/company/department/${id}`,
  })
}

/**
 * 编辑部门请求
 * @param {Object} data
 * @returns
 */
export const editDeptApi = (data) => {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data,
  })
}
