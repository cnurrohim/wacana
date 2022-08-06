import React from "react"
import moment from "moment"

import { DateContainer } from "./DateContainer"
import { useEvent } from "../../contexts/eventProvider"

const Day = ({ day, events, isAddNewEventAllowed }) => {
  const { newEvent } = useEvent()

  let currentEvent = []
  if (typeof events !== "undefined") {
    currentEvent = events[moment(day).format("YYYY-MM-DD")]
      ? events[moment(day).format("YYYY-MM-DD")]
      : []
  }
  const bgColor = getBgColor(day, newEvent)
  let padding = ""

  padding =
    moment(day).isSame(newEvent.startingDate) || moment(day).isSame(newEvent.endingDate)
      ? `p-0`
      : ` p-[0.2em]`

  const content = (
    <DateContainer
      day={day}
      currentEvent={currentEvent}
      isAddNewEventAllowed={isAddNewEventAllowed}
    >
      {moment(day).format("D")}
    </DateContainer>
  )

  let container = (
    <div className={`${bgColor} ${padding} relative h-[52px] my-[1px]`}>{content}</div>
  )

  return <>{container}</>
}

export default Day

function getBgColor(day, newEvent) {
  const isTodayEventExist = "_id" in newEvent

  const colorMood = isTodayEventExist ? newEvent.colorMood : "bg-accentPrimary-700"

  const halfColorMood = colorMood.replace("bg", "from")

  // not picking ending date yet
  if (moment(day).isSame(newEvent.startingDate) && newEvent.endingDate === null)
    return "bg-secondary"

  // same day event
  if (moment(day).isSame(newEvent.startingDate) && newEvent.endingDate === newEvent.startingDate)
    return "bg-secondary"

  // starting date
  if (moment(day).isSame(newEvent.startingDate))
    return `bg-gradient-to-l-50 ${halfColorMood} to-secondary`

  // ending date
  if (moment(day).isSame(newEvent.endingDate))
    return `bg-gradient-to-r-50 ${halfColorMood} to-secondary`

  // between starting and end
  if (moment(day).isAfter(newEvent.startingDate) && moment(day).isBefore(newEvent.endingDate))
    return colorMood

  // normal
  return "bg-secondary"
}
