import React, { useState } from "react"
import Calendar from "../Calendar/Calendar"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { RightLayout } from "../Layout"
import LoadingPanel from "../Others/LoadingPanel"
import ErrorPanel from "../Others/ErrorPanel"
import ConfirmDeleteEvent from "./ConfirmDeleteEvent"
import { getEvent } from "../../api/wacanaApi"
import { useEvent } from "../../contexts/eventProvider"

function DeleteEvent() {
  const { setNewEvent } = useEvent()
  const { eventId } = useParams()
  const navigate = useNavigate()
  const {
    isSuccess,
    isLoading,
    error,
    data: event,
  } = useQuery(["event", eventId], () => getEvent(eventId), {
    networkMode: "always",
    onSuccess: (event) => {
      if (event) {
        setNewEvent(event)
      } else {
        navigate("/")
      }
    },
  })

  let content = ""
  content = isLoading ? (
    <LoadingPanel />
  ) : isSuccess && event ? (
    <ConfirmDeleteEvent event={event} />
  ) : isSuccess && !event ? (
    <ErrorPanel errorMessage={"record not found"} />
  ) : (
    <ErrorPanel errorMessage={error.error} />
  )

  return (
    <>
      <Calendar />
      <RightLayout>{content}</RightLayout>
    </>
  )
}

export default DeleteEvent
