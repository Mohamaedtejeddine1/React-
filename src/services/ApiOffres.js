// frontend/src/services/ApiOffres.js
import axios from 'axios';

const apiurl = 'http://localhost:5000/offres';






// Add request interceptor to include token

  

export async function getOffresByRecruteur() {
    const token = localStorage.getItem("token");
  
    return await axios.get(`${apiurl}/getOffresByRecruteur`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  }



export async function getAllOffres() {
  const token = localStorage.getItem("token"); 

  return await axios.get(`${apiurl}/getAllOffres`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


// Fetch a specific job offer by ID
export async function getOffreById(id) {
    return await axios.get(`${apiurl}/getOffreById/${id}`);
}

export const createOffre = async (offreData) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${apiurl}/createOffre`, offreData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
// Update a job offer
export async function updateOffre(id, offreData) {
    const token = localStorage.getItem('jwt_token_9antra');
    return await axios.put(`${apiurl}/updateOffre/${id}`, offreData, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}

// Delete a job offer
export async function deleteOffre(id) {
    const token = localStorage.getItem('jwt_token_9antra');
    return await axios.delete(`${apiurl}/deleteOffre/${id}`, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}