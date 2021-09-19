import { request } from 'umi'

export async function commonConfig(options?: Record<string, any>) {
  return request<API.Guest.CommonConfigResult>('/api/v1/guest/comm/config', {
    method: 'GET',
    ...(options || {}),
  })
}
