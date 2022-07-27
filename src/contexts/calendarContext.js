import React, { useState, useContext } from "react"
import Month from "calendar-months"

const CalendarContext = React.createContext()

export function useCalendar() {
  return useContext(CalendarContext)
}

export const initialMonth = Month.now

const CalendarProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  return (
    <CalendarContext.Provider value={{ currentMonth, setCurrentMonth }}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarProvider
