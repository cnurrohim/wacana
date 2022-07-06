import React from "react"
import { ENDOFTHEWEEK } from "../../constants/Calendar"
import moment from "moment"

const Week = ({ days }) => {
  return (
    <>
      {days.map((day, d) => {
        const isToday = () => moment().format("d") === d + 1
        const isTextBold = () => {
          if (isToday()) return "font-bold"
          return ""
        }
        const getTextColor = () => {
          if (d === ENDOFTHEWEEK) return "text-tertiary font-bold"
          if (d === ENDOFTHEWEEK - 1) return "text-tertiary font-medium "
          return "text-tertiary font-medium"
        }
        return (
          <div
            className={`${getTextColor()} ${isTextBold()} capitalize  h-[52px] text-center flex justify-center items-center `}
            key={d}
          >
            {day}
          </div>
        )
      })}
    </>
  )
}

export default Week
