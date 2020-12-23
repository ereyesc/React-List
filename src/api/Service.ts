import axios from 'axios';

export const getCall = (url:string) => {
    return axios.get('https://reqres.in'+url);
}
export const postCall = (url:string, payload:Object) => {
    return axios.post('https://reqres.in'+url, payload);
}
export const putCall = (url:string, payload:Object) => {
    return axios.put('https://reqres.in'+url, payload);
}
export const deleteCall = (url:string) => {
    return axios.delete('https://reqres.in'+url);
}