import axios from "axios"

const API_URL = "http://localhost:8000"

export const sendMessage = (message) =>
  axios.post(`${API_URL}/chat`, { message })

export const indexCodebase = () =>
  axios.post(`${API_URL}/index`)