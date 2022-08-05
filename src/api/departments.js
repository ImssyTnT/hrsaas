import request from '@/utils/request.js'

export const getDeptsApi = () => {
  return request({
    method: 'GET',
    url: '/company/department',
  })
}
