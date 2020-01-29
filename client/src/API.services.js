import axios from 'axios';
var url = '';
if (process.env.NODE_ENV !== 'production') {
    url ='http://localhost:4000/'
  }
export const Login = async (data) => {
   return axios.post(url+'api/Login', data)
   .then(res => {
       return res
   })
   .catch(function (error) {
       return false
   })
}
export const getTestList = ()=>{
    return axios.get(url+'api/Test')
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const getTestDetails = (id)=>{
    return axios.get(url+'api/Test/'+id)
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const addTest = (data)=>{
    return axios.post(url+'api/Test', data)
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const deleteTest = (id)=>{
    return axios.delete(url+'api/Test/' + id)
        .then(response => {
            return response
        })
        .catch(function (error) {
            return false
        })
}
export const getQuestionList = (test_id)=>{
    return axios.get(url+'api/TestQuestion'+test_id)
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const addQuestion = (data)=>{
    return axios.post(url+'api/Question', data)
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const deleteQuestion = (id,test_id)=>{
    return axios.delete(url+'api/Question/' + id+'/'+test_id)
        .then(response => {
            return response
        })
        .catch(function (error) {
            return false
        })
}
export const getTestScore = async (data) => {
    return axios.post(url+'api/Score', data)
    .then(res => {
        return res
    })
    .catch(function (error) {
        return false
    })
 }