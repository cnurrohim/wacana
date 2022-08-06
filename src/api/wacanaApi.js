import axios from "axios"

const wacanaApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getEvents = async ({ month, year }) => {
  const response = await wacanaApi.get(`/event/month/${month}/year/${year}`)
  return response.data
}

export const getEvent = async (id) => {
  const response = await wacanaApi.get(`/event/${id}`)
  return response.data
}

export const postEvent = async (post) => {
  return await wacanaApi.post(`/event`, post)
}

export const updateEvent = async ({ id, post }) => {
  return await wacanaApi.patch(`/event/${id}`, post)
}

export const deleteEvent = async (id) => {
  return await wacanaApi.delete(`/event/${id}`)
}

export default wacanaApi
