import axios from 'axios'

const apiurl = 'http://localhost:5000/offres'

export async function getAllOffres() {
    return await axios.get(`${apiurl}/getAllOffres`)
}
