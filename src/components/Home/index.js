import React, { useState } from "react"
import Calendar from "../Calendar/Calendar"
import Month from "calendar-months"
import moment from "moment"
import WelcomePanel from "../Others/WelcomePanel"
import { RightLayout } from "../Layout"
import EventsList from "../Event/EventsList"
import { useGetEventsQuery } from "../../api/eventsApiSlice"
import LoadingPanel from "../Others/LoadingPanel"
import { useEvent } from "../../contexts/eventProvider"
import { useCalendar } from "../../contexts/calendarContext"

function Home() {
  const { currentMonth, setCurrentMonth } = useCalendar()

  const monthString = moment(currentMonth).format("M")
  const yearString = moment(currentMonth).format("YYYY")

  const { newEvent } = useEvent()

  const {
    data: events,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEventsQuery({ month: monthString, year: yearString })

  let content
  if (isLoading) {
    content = <LoadingPanel />
  }

  if (isSuccess) {
    content =
      events.length > 0 ? (
        <EventsList events={events} />
      ) : (
        (content = <WelcomePanel />)
      )
  }

  if (isError) {
    content = <p> {error.error} </p>
  }

  return (
    <>
      <Calendar
        month={currentMonth}
        setCurrentMonth={setCurrentMonth}
        newEvent={newEvent}
        isCreatingNewEvent={true}
      />
      <RightLayout>{content}</RightLayout>
    </>
  )
}

export default Home
