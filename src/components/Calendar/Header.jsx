import React from "react"
import { ENDOFTHEWEEK } from "../../constants/Calendar"
import { DAYSINWEEK } from "../../constants/Calendar"
import moment from "moment"

const Header = () => {
  const getTextColor = (d) => {
    if (d === ENDOFTHEWEEK) return "text-tertiary font-bold"
    if (d === ENDOFTHEWEEK - 1) return "text-tertiary font-medium "
    return "text-tertiary font-medium"
  }

  return (
    <>
      {DAYSINWEEK.map((day, d) => {
        const isToday = () => moment().format("d") === d + 1
        const isTextBold = isToday() ? "font-bold" : ""
        const textColor = getTextColor(d)

        return (
          <div
            className={`${textColor} ${isTextBold} capitalize  h-[52px] text-center flex justify-center items-center `}
            key={d}
          >
            {day}
          </div>
        )
      })}
    </>
  )
}

export default Header
