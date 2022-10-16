import { request } from '@/utils/https/request';

export function test(): Promise<any> {
  return request({
    url: 'http://httpbin.org/post',
    method: 'post',
    data: {
      'key': 'value'
    },
  })
}