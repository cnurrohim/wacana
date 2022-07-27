import React from "react"
import Day from "./Day.js"

const Week = ({
  days,
  month,
  events,
  isCreatingNewEvent,
  newEvent,
  setCurrentMonth,
}) => {
  return (
    <>
      {days.map((day, i) => (
        <Day
          day={day}
          id={i}
          month={month}
          key={i}
          events={events}
          isCreatingNewEvent={isCreatingNewEvent}
          newEvent={newEvent}
          setCurrentMonth={setCurrentMonth}
        />
      ))}
    </>
  )
}

export default Week
