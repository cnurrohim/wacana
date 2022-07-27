import { apiSlice } from "./apiSlice"
import { createSelector } from "@reduxjs/toolkit"

const eventsApiTags = apiSlice.enhanceEndpoints({ addTagTypes: ["events"] })
export const eventsApiSlice = eventsApiTags.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ month, year }) => `/event/month/${month}/year/${year}`,
      providesTags: ["events"],
    }),
    getEvent: builder.query({
      query: ({ eventId }) => `/event/${eventId}`,
      providesTags: ["events"],
    }),
    postEvent: builder.mutation({
      query: (event) => ({
        url: `/event`,
        method: "POST",
        body: { ...event },
      }),
      invalidatesTags: ["events"],
    }),
    updateEvent: builder.mutation({
      query: (event) => ({
        url: `/event/${event._id}`,
        method: "PATCH",
        body: { ...event },
      }),
      invalidatesTags: ["events"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["events"],
    }),
  }),
})

export const {
  useGetEventsQuery,
  usePostEventMutation,
  useUpdateEventMutation,
  useGetEventQuery,
  useDeleteEventMutation,
} = eventsApiSlice
