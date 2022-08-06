import React from "react"
import Days from "./Days"

const Weeks = ({ days, events, isAddNewEventAllowed }) => {
  return (
    <>
      {days.map((day, i) => (
        <Days events={events} day={day} key={i} isAddNewEventAllowed={isAddNewEventAllowed} />
      ))}
    </>
  )
}

export default Weeks
