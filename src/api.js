import axios from 'axios';

const apiUrl = 'http://localhost:3002'

const apiService = {
     getAllUsers(){
        return axios.get(apiUrl+'/users');
     },

     deleteUser(id){
        return axios.delete(apiUrl+`/users/${id}`);
     },

     addNewUser(data){
        return axios.post(apiUrl+'/register', data);
     },

     login(data){
        return axios.post(apiUrl+'/signin', data);
     },

     updateUser(data, id){
        return axios.patch(apiUrl+`/users/${id}`, data);
     }
}

export default apiService;