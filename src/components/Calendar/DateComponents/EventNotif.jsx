import React from "react"

/**
 * show how many events in current date
 * @param currentEvent Array
 * @param isOutDated Boolean
 * @returns JSX.Element
 */
export const EventNotif = ({ currentEvent, isOutDated }) => {
  let bgColor = "bg-secondary-900 text-white"
  if (currentEvent.length > 0 && !isOutDated) {
    bgColor = currentEvent[0].colorMood + " text-secondary"
  }

  return (
    <span
      className={`rounded-full  font-bold
               border-2
               inline-block text-xs
               py-1 px-2  absolute -top-1 -right-1 z-10
               ${bgColor}   border-secondary
               `}
    >
      {currentEvent.length}
    </span>
  )
}
