import React from "react"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"

import Calendar from "../Calendar/Calendar"
import { RightLayout } from "../Layout"
import EventsList from "../Event/EventsList"

import WelcomePanel from "../Others/WelcomePanel"
import LoadingPanel from "../Others/LoadingPanel"
import ErrorPanel from "../Others/ErrorPanel"
import { useCalendar } from "../../contexts/calendarContext"
import { getEvents } from "../../api/wacanaApi"
import { initialEvent, useEvent } from "../../contexts/eventProvider"

function Home() {
  const { currentMonth } = useCalendar()
  const { setNewEvent } = useEvent()

  const monthString = moment(currentMonth).format("M")
  const yearString = moment(currentMonth).format("YYYY")

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: events,
  } = useQuery(
    ["events", { month: monthString, year: yearString }],
    () => getEvents({ month: monthString, year: yearString }),
    {
      networkMode: "always",
      select: (data) => groupEventsByDate(data),
      onSuccess: () => {
        setNewEvent(initialEvent)
      },
    }
  )

  let content
  if (isLoading) {
    content = <LoadingPanel />
  }

  if (isSuccess) {
    content = Object.keys(events).length > 0 ? <EventsList events={events} /> : <WelcomePanel />
  }

  if (isError) {
    content = <ErrorPanel errorMessage={error.error} />
  }

  return (
    <>
      <Calendar events={events} isAddNewEventAllowed />
      <RightLayout>{content}</RightLayout>
    </>
  )
}

export default Home

function groupEventsByDate(events) {
  const groupbyStartingDate = events.reduce((eventsByDate, event) => {
    const date = moment(event.startingDate).format("YYYY-MM-DD")
    if (date in eventsByDate) {
      return { ...eventsByDate, [date]: eventsByDate[date].concat(event) }
    }

    return { ...eventsByDate, [date]: [event] }
  }, {})

  return groupbyStartingDate
}
