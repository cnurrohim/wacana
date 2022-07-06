import React from "react"

import Month from "./Month"
import Weekdays from "./Weekdays"
import Week from "./Week"
import { days } from "calendar-months"
import { DAYSINWEEK } from "../../constants/Calendar"

const Calendar = ({
  month,
  setCurrentMonth,
  maxHeight,
  padding,
  border,
  firstLayer,
  secondLayer,
}) => {
  return (
    <div
      className={`w-[30%] ${padding} pl-10 ${border} grid grid-cols-7 
      ${maxHeight} 
      bg-secondary relative
      shadow-md
      rounded-l-xl
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
        <div className={`${firstLayer}`}> </div>
      </div>

      <Month
        month={month}
        setCurrentMonth={setCurrentMonth}
        className={`${secondLayer}`}
        secondLayer={secondLayer}
      />

      <Weekdays days={DAYSINWEEK} />

      {month.calendarWeeks(days.MONDAY).map((week, i) => (
        <Week days={week} month={month} id={i} key={i} />
      ))}
    </div>
  )
}

export default Calendar
