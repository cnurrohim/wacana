import axios from "axios"

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const getEvents = (month, year) =>
  API.get(`/event/month/${month}/year/${year}`)
export const getEvent = (id) => API.get(`/event/${id}`)
export const postEvent = (post) => API.post(`/event`, post)
export const updateEvent = (id, post) => API.patch(`/event/${id}`, post)
export const deleteEvent = (id) => API.delete(`/event/${id}`)

export const loginWithGoogle = (code) => API.post(`/auth/google, ${code}`)
