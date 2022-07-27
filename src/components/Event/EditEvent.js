import React from "react"

import Calendar from "../Calendar/Calendar"
import { RightLayout } from "../Layout"
import FormEditEvent from "./FormEditEvent"
import { useEvent } from "../../contexts/eventProvider"
import { useCalendar } from "../../contexts/calendarContext"

function EditEvent() {
  const { currentMonth, setCurrentMonth } = useCalendar()
  const { newEvent } = useEvent()

  return (
    <>
      <Calendar
        month={currentMonth}
        setCurrentMonth={setCurrentMonth}
        newEvent={newEvent}
      />
      <RightLayout>
        <FormEditEvent />
      </RightLayout>
    </>
  )
}

export default EditEvent
