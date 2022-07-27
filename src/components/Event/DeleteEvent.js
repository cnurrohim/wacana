import React, { useState } from "react"
import { useParams } from "react-router-dom"
import Month from "calendar-months"

import Calendar from "../Calendar/Calendar"
import { RightLayout } from "../Layout"
import ConfirmDeleteEvent from "./ConfirmDeleteEvent"
import { useGetEventQuery } from "../../api/eventsApiSlice"

function DeleteEvent() {
  const { eventId } = useParams()

  const [currentMonth, setCurrentMonth] = useState(Month.now)
  const {
    data: event,
    isLoading,
    isError,
    isSuccess,
  } = useGetEventQuery({
    eventId,
  })

  let content = <p>Loading...</p>
  if (isSuccess) {
    content = (
      <>
        <Calendar
          month={currentMonth}
          setCurrentMonth={setCurrentMonth}
          newEvent={event}
        />
        <RightLayout>
          <ConfirmDeleteEvent event={event} />
        </RightLayout>
      </>
    )
  }

  return <>{content}</>
}

export default DeleteEvent
