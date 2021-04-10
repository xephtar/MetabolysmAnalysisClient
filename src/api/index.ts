import request from '@/request/index'

export const getTableList = () => {
  return request.get('http://127.0.0.1:8000/api/articles/?search=cancer')
}

export const getItem = (data:any) => {
  return request.get(`http://127.0.0.1:8000/api/articles/?search=${data.name}`)
}
