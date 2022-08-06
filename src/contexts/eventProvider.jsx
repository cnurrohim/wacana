import React, { useState, useContext } from "react"

const EventContext = React.createContext()

export function useEvent() {
  return useContext(EventContext)
}

export const initialEvent = {
  startingDate: null,
  endingDate: null,
  startingTime: "00:00",
  endingTime: "23:59",
  colorMood: "bg-red-500",
  title: "",
  description: "",
  image: "",
}

export const EventProvider = ({ children }) => {
  const [newEvent, setNewEvent] = useState(initialEvent)

  return <EventContext.Provider value={{ newEvent, setNewEvent }}>{children}</EventContext.Provider>
}

export default EventProvider
