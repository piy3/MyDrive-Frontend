import api from "./interceptor";

//user requests
export const login = async(data)=>{
    return api.post(`/api/v1/user/login`, data)
}
export const registerUser = async (data) => {
  return api.post(`/api/v1/user/register`, data)
}

//folder requests
export const getFolders = async (id) => {
  return api.get(`/api/v1/folder/getFolders`, {
    params: id ? { id } : {}
  })
}

export const createFolder = async (data) => {
  return api.post('/api/v1/folder/createFolder',data)
}