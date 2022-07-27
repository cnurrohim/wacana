import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseURL = process.env.REACT_APP_API_URL

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
})

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
})
