import axios from 'axios'

const api = axios.create({
	baseURL: 'http://10.0.0.6:8000/api'
})

export default api