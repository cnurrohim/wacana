import React from "react"
import Month from "./Month"
import Weekdays from "./Weekdays"
import Week from "./Week"
import { days } from "calendar-months"
import { DAYSINWEEK } from "../../constants/Calendar"
import moment from "moment"
import { useGetEventsQuery } from "../../api/eventsApiSlice"
import { BlankSpaces } from "../Layout"

const Calendar = ({ month, setCurrentMonth, newEvent, isCreatingNewEvent }) => {
  const monthString = moment(month).format("M")
  const yearString = moment(month).format("YYYY")

  const { data, isSuccess } = useGetEventsQuery({
    month: monthString,
    year: yearString,
  })

  const events = isSuccess ? data : []

  return (
    <div
      className={`w-full sm:w-full md:w-full lg:w-[40%] xl:w-[30%] p-5 pl-10 grid grid-cols-7 
      h-full sm:h-full md:h-full lg:h-[550px] xl:h-[550px]
      bg-secondary relative
      shadow-md
      rounded-none sm:rounded-none md:rounded-none lg:rounded-l-xl xl:rounded-l-xl
      `}
    >
      <div className="w-20 h-10 absolute top-0 right-0 flex flex-col">
        <div className="flex flex-row">
          <span className="h-10 w-1/2 bg-accentPrimary-700"></span>
          <span className="h-10 w-1/2 bg-accentPrimary"></span>
        </div>
        <div className="flex flex-row justify-end">
          <span className="h-10 w-1/2 bg-accentPrimary-800"></span>
        </div>
      </div>

      <div className={`col-span-7`}>
        <BlankSpaces />
      </div>

      <Month month={month} setCurrentMonth={setCurrentMonth} />

      <Weekdays days={DAYSINWEEK} />

      {month.calendarWeeks(days.MONDAY).map((week, i) => (
        <Week
          days={week}
          month={month}
          id={i}
          key={i}
          events={events}
          newEvent={newEvent}
          isCreatingNewEvent={isCreatingNewEvent}
          setCurrentMonth={setCurrentMonth}
        />
      ))}
    </div>
  )
}

export default Calendar
