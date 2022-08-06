import React from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom"

import { useEvent } from "../../../contexts/eventProvider"
import { useCalendar } from "../../../contexts/calendarContext"

/**
 * date wrapper with circle indicating there is event in it
 * @param children children
 * @param currentEvent Array
 * @param isOutDated Boolean
 * @returns JSX.Element
 */
export const Container = ({ children, day, currentEvent, isOutDated, isAddNewEventAllowed }) => {
  const navigate = useNavigate()
  const { newEvent, setNewEvent } = useEvent()
  const { setCurrentMonth } = useCalendar()
  const eventOutDate = moment(day).isBefore(moment(), "day")

  let border = ""

  const handleNewEventDate = (day) => {
    const ISOdate = day.toISOString()

    let chosenDate = [newEvent.startingDate, newEvent.endingDate].filter((item) => {
      return item !== null
    })
    if (chosenDate.length === 2) chosenDate = []

    chosenDate.push(ISOdate)
    chosenDate.sort()

    const endingDate = chosenDate[1] ? chosenDate[1] : null

    setNewEvent({
      ...newEvent,
      ...{ startingDate: chosenDate[0], endingDate },
    })

    if (isAddNewEventAllowed) navigate(`/event`)
  }

  let bgColor = getChosenDateBGColor(day, newEvent)

  let borderColor = ""

  if (currentEvent.length > 0) {
    borderColor = currentEvent[0].colorMood.replace("bg", "border")
    border = `rounded-[50%] border-2  ${borderColor}`
    border = eventOutDate ? `rounded-[50%] border-2 border-secondary-900` : border
  }

  const textStyle = getTextStyle(day, isOutDated, newEvent)

  const content = (
    <span
      className={`w-full h-full   
        ${border}
        ${bgColor} 
        ${textStyle} 
        hover:rounded-[50%] hover:bg-accentPrimary
        hover:cursor-pointer hover:text-textSecondary
        text-center flex justify-center items-center
        `}
      onClick={() => {
        handleNewEventDate(day)
      }}
    >
      {children}
    </span>
  )

  return <>{content}</>
}

function getChosenDateBGColor(day, newEvent) {
  const isTodayEventExist = newEvent._id

  const colorMood = isTodayEventExist ? newEvent.colorMood : "bg-accentPrimary-700"

  if (moment(day).isSame(newEvent.startingDate)) return `rounded-[50%] ${colorMood}`
  if (moment(day).isSame(newEvent.endingDate)) return `rounded-[50%]  ${colorMood}`

  return ""
}

function getTextStyle(day, isOutDated, newEvent) {
  let textStyle = "text-textPrimary "
  textStyle = isOutDated ? `text-textPrimary-500` : textStyle
  textStyle = moment().isSame(day, "day") ? `text-accentPrimary font-bold` : textStyle

  textStyle =
    moment(day).isSame(newEvent.startingDate) ||
    moment(day).isSame(newEvent.endingDate) ||
    (moment(day).isAfter(newEvent.startingDate) && moment(day).isBefore(newEvent.endingDate))
      ? `text-textSecondary-800 font-semibold`
      : textStyle

  return textStyle
}
