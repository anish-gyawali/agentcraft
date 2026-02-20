import axios from "axios"

const API_URL = "http://localhost:8000"

export const sendMessage = (message, mode = "multi_agent") => {
  if (mode === "book") {
    return axios.post(`${API_URL}/chat/book`, { message })
  }
  return axios.post(`${API_URL}/chat`, { message, mode })
}

export const indexCodebase = () =>
  axios.post(`${API_URL}/index`)

export const indexPDF = (filepath) =>
  axios.post(`${API_URL}/index/pdf`, { filepath })