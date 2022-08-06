import React from "react"
import Details from "./Details"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import Calendar from "../Calendar/Calendar"
import { RightLayout } from "../Layout"
import LoadingPanel from "../Others/LoadingPanel"
import ErrorPanel from "../Others/ErrorPanel"

import { getEvent } from "../../api/wacanaApi"
import { useEvent } from "../../contexts/eventProvider"

function EventDetail() {
  const { eventId } = useParams()
  const { setNewEvent } = useEvent()

  const {
    isSuccess,
    isLoading,
    error,
    data: event,
  } = useQuery(["events", eventId], () => getEvent(eventId), {
    networkMode: "always",
    onSuccess: (event) => {
      setNewEvent(event)
    },
  })

  let content = <></>

  content = isLoading ? (
    <LoadingPanel />
  ) : isSuccess && event ? (
    <Details event={event} />
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

export default EventDetail
