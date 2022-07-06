import React from "react"
import Day from "./Day.js"

const Week = ({ days, month, id }) => {
  return (
    <>
      {days.map((day, i) => (
        <Day day={day} id={i} month={month} key={i} />
      ))}
    </>
  )
}

export default Week
