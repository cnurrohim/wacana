import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

import { useCalendar } from "../../contexts/calendarContext"

const CalendarNavigation = () => {
  const { currentMonth } = useCalendar()
  return (
    <>
      <div className="col-span-4 text-2xl text-tertiary font-semibold">
        <span className={`capitalize h-16 block`}>{currentMonth.format("MMMM")}</span>
      </div>
      <div className="justify-between text-2xl text-accentPrimary font-thin ">
        <span className="uppercase">{currentMonth.format("YYYY")}</span>
      </div>

      <Navigation month={currentMonth.previousMonth()}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </Navigation>
      <Navigation month={currentMonth.nextMonth()}>
        <FontAwesomeIcon icon={faAngleRight} />
      </Navigation>
    </>
  )
}

export default CalendarNavigation

const Navigation = ({ children, month }) => {
  const { setCurrentMonth } = useCalendar()
  return (
    <div className="text-2xl text-accentPrimary hover:text-accentPrimary-500  flex justify-center items-start ">
      <button onClick={() => setCurrentMonth(month)}>{children}</button>
    </div>
  )
}
