import React from "react"
import { days } from "calendar-months"

import Decoration from "./Decoration"

import CalendarNavigation from "./CalendarNavigation"
import Header from "./Header"
import Weeks from "./Weeks"
import { useCalendar } from "../../contexts/calendarContext"

const Calendar = ({ events, isAddNewEventAllowed }) => {
  const { currentMonth } = useCalendar()

  return (
    <div
      className={`w-full sm:w-full md:w-full lg:w-[40%] xl:w-[30%] p-5 pl-10 grid grid-cols-7 
      h-full sm:h-full md:h-full lg:h-[550px] xl:h-[550px]
      bg-secondary relative
      shadow-md
      rounded-none sm:rounded-none md:rounded-none lg:rounded-l-xl xl:rounded-l-xl
      `}
    >
      <Decoration />
      <div className={`col-span-7 h-20`}></div>
      <CalendarNavigation />
      <Header />

      {currentMonth.calendarWeeks(days.MONDAY).map((week, i) => (
        <Weeks events={events} days={week} key={i} isAddNewEventAllowed={isAddNewEventAllowed} />
      ))}
    </div>
  )
}

export default Calendar
