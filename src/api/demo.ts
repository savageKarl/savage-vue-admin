import { request } from '@/utils/https/request';

export const test = () => {
  return request({
    url: 'http://httpbin.org/post',
    method: 'post',
    data: {
      'key': 'value'
    },
  })
}