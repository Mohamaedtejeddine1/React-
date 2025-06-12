import axios from 'axios'

const apiurl = 'http://localhost:5000/users'
const token = localStorage.getItem("token");




 


export async function getAllUsers() {
    return await axios.get(`${apiurl}/getAllUsers`)
}

 export async function deleteUserById(id) {
     return await axios.delete(`${apiurl}/deleteUserById/${id}`)
}
export async function signin(data) {
  return await axios.post('http://localhost:5000/users/login', data, {
    withCredentials: true,  
  });
}

export async function signup(data){
    return await axios.post('http://localhost:5000/users/register',data)

}
export async function logout() {
  const token = localStorage.getItem("token"); // or your token key

  return await axios.post(
    `${apiurl}/logout`,
    {}, // no request body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export async function createUser(userData) {
    return await axios.post(`${apiurl}/createUser`,userData)
}

export async function updateUserById(userData,idUser) {
    return await axios.put(`${apiurl}/updateUserById/${idUser}`,userData)
}
export async function updateCandidatDetails(idUser, data) {
    return await axios.put(`${apiurl}/updateCandidatDetails/${idUser}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    });
  }


export async function updateProfil(idUser, data) {
    return await axios.put(`${apiurl}/updateProfil/${idUser}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
          },
      
      });
}
export const getUserProfile = async (id) => {
  try {
    const response = await axios.get(`${apiurl}/getUserProfile/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};