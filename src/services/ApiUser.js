import axios from 'axios'

const apiurl = 'http://localhost:5000/users'
const token = localStorage.getItem("token");


export async function getAllUsers() {
    return await axios.get(`${apiurl}/getAllUsers`)
}

 export async function deleteUserById(id) {
     return await axios.delete(`${apiurl}/deleteUserById/${id}`)
}
export async function signin(data){
    return await axios.post('http://localhost:5000/users/login',data)
    
}

export async function signup(data){
    return await axios.post('http://localhost:5000/users/register',data)

}
export async function logout () {
    return await axios.post(`${apiurl}/logout`)
}
export async function createUser(userData) {
    return await axios.post(`${apiurl}/createUser`,userData)
}

export async function updateUserById(userData,idUser) {
    return await axios.put(`${apiurl}/updateUserById/${idUser}`,userData)
}