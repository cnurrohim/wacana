import React from "react"
import Calendar from "../Calendar/Calendar"
import { RightLayout } from "../Layout"
import FormAddNewEvent from "./FormAddNewEvent"
import { useCalendar } from "../../contexts/calendarContext"
import { useEvent } from "../../contexts/eventProvider"

function AddNewEvent() {
  const { currentMonth, setCurrentMonth } = useCalendar()
  const { newEvent } = useEvent()

  return (
    <>
      <Calendar
        month={currentMonth}
        setCurrentMonth={setCurrentMonth}
        isCreatingNewEvent={true}
        newEvent={newEvent}
      />
      <RightLayout>
        <FormAddNewEvent />
      </RightLayout>
    </>
  )
}

export default AddNewEvent
