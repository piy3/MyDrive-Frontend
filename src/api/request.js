import api from "./interceptor";

export const login = async(data)=>{
    return api.post(`/api/v1/user/login`, data)
}

export const getFolders = async (id) => {
  return api.get(`/api/v1/folder/getFolders`, {
    params: { id } 
  })
}
