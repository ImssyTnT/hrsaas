import request from '@/utils/request'

/**
 * 获取公司信息
 * @param {Nmber} id 公司id
 * @returns promise
 */
export const getCompanyInfoApi = (id) => {
  return request({
    method: 'GET',
    url: `/company/${id}`,
  })
}
