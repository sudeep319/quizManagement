import axios from 'axios';

export const Login = async (data) => {
   return axios.post('http://localhost:4000/api/Login', data)
   .then(res => {
       return res
   })
   .catch(function (error) {
       return false
   })
}
export const getTestList = ()=>{
    return axios.get('http://localhost:4000/api/Test')
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const getTestDetails = (id)=>{
    return axios.get('http://localhost:4000/api/Test/'+id)
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const addTest = (data)=>{
    return axios.post('http://localhost:4000/api/Test', data)
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const deleteTest = (id)=>{
    return axios.delete('http://localhost:4000/api/Test/' + id)
        .then(response => {
            return response
        })
        .catch(function (error) {
            return false
        })
}
export const getQuestionList = (test_id)=>{
    return axios.get('http://localhost:4000/api/TestQuestion'+test_id)
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const addQuestion = (data)=>{
    return axios.post('http://localhost:4000/api/Question', data)
    .then(response => {
        return response
    })
    .catch(function (error) {
        return false
    })
}
export const deleteQuestion = (id)=>{
    return axios.delete('http://localhost:4000/api/Question/' + id)
        .then(response => {
            return response
        })
        .catch(function (error) {
            return false
        })
}