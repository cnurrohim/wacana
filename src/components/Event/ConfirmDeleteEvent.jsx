import React, { useState } from "react"
import moment from "moment"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { ReactComponent as Illustration } from "../SVG/Questions-pana.svg"
import { useNavigate } from "react-router-dom"
import { initialEvent } from "../../contexts/eventProvider"
import { deleteEvent } from "../../api/wacanaApi"
import { useEvent } from "../../contexts/eventProvider"

const ConfirmDeleteEvent = ({ event }) => {
  const [validationMessages, setValidationMessages] = useState({})
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { newEvent, setNewEvent } = useEvent()

  const deleteEventMutation = useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events")
      navigate("/")
    },
    onError: (err) => {
      setValidationMessages({
        delete: { invalid: true, message: "delete Failed: " + err.message },
      })
    },
    networkMode: "always",
  })

  return (
    <div className="bg-pink-600 p-10 flex flex-col justify-center items-center h-full rounded-none sm:rounded-none md:rounded-none lg:rounded-r-xl xl:rounded-r-xl">
      <h1 className="font-bold text-slate-100 text-4xl mb-10">Delete Event?</h1>
      <Illustration className="w-64 h-auto " />
      <p className="text-slate-200 w-52 text-center">You are about to delete</p>
      <p className="text-slate-200 w-52 text-center">
        {moment(event.startingDate).format("MMMM Do")}, {event.title}
        <ErrorMessage validationMessages={validationMessages} inputField={"delete"} />
      </p>
      <div className="flex flex-row justify-around w-full mt-auto gap-5">
        <button
          className="py-1 px-3 border text-white box-content border-white hover:text-neutral-100 hover:border-neutral-100"
          onClick={() => {
            navigate(`/event/${event._id}`)
          }}
        >
          Cancel
        </button>

        <button
          className="py-1 px-3 bg-accentPrimary-700 hover:bg-accentPrimary-600 text-white"
          onClick={() => {
            deleteEventMutation.mutate(event._id)
          }}
        >
          Delete Event
        </button>
      </div>
      <a href="https://storyset.com/web" className="text-xs text-white absolute bottom-2 right-2">
        Web illustrations by Storyset
      </a>
    </div>
  )
}

export default ConfirmDeleteEvent

const ErrorMessage = ({ validationMessages, inputField }) => {
  if (!(inputField in validationMessages)) return <></>
  if (Object.keys(validationMessages).length === 0) return <></>

  return (
    <p className="absolute bottom-0 right-0 text-xs text-red-600">
      {validationMessages[inputField].message}
    </p>
  )
}
