import axios from 'axios'
const BASE_URL = 'http://localhost:5000'

export const getRequest = async (endPoint) => {
    try{
        const response =  await axios.get(`${BASE_URL}${endPoint}`)
        return response
    } catch (error) {
        console.error('Error fetching Api:', error)
        return {}
    }
}

export const postRequest = async (endPoint, data = {}) => {
    try {
        const response = await axios.post(`${BASE_URL}${endPoint}`, data)
        return response
      } catch (error) {
        console.error('Error While Posting request', error)
        return {}
      }
}