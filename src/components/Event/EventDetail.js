import React from "react"
import Details from "./Details"
import { useParams } from "react-router-dom"

import Calendar from "../Calendar/Calendar"
import { RightLayout } from "../Layout"
import { useGetEventQuery } from "../../api/eventsApiSlice"
import LoadingPanel from "../Others/LoadingPanel"
import { useEvent } from "../../contexts/eventProvider"
import { useCalendar } from "../../contexts/calendarContext"

function EventDetail() {
  const { currentMonth, setCurrentMonth } = useCalendar()
  const { eventId } = useParams()
  const { newEvent } = useEvent()

  const { data: event, isLoading, isSuccess } = useGetEventQuery({ eventId })

  let content = <></>

  content = isLoading ? (
    <>
      <Calendar
        month={currentMonth}
        setCurrentMonth={setCurrentMonth}
        newEvent={newEvent}
      />
      <RightLayout>
        <LoadingPanel />
      </RightLayout>
    </>
  ) : isSuccess && event ? (
    <>
      <Calendar
        month={currentMonth}
        setCurrentMonth={setCurrentMonth}
        newEvent={event}
      />
      <RightLayout>
        <Details event={event} />
      </RightLayout>
    </>
  ) : (
    <p>Trouble .... </p>
  )

  return <>{content}</>
}

export default EventDetail
