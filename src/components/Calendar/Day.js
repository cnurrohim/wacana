import React from "react"
import moment from "moment"

import { DateContainer } from "./dayComponents/DateContainer"
import { DateEventsNotifier } from "./dayComponents/DateEventsNotifier"
import { DateInnerContainer } from "./dayComponents/DateInnerContainer"
import { useNavigate } from "react-router-dom"
import { useEvent } from "../../contexts/eventProvider"

const Day = ({
  day,
  month,
  events,
  isCreatingNewEvent,
  newEvent,
  setCurrentMonth,
}) => {
  const navigate = useNavigate()
  const { setNewEvent } = useEvent()

  const thisDayEvents = events.filter((event) => {
    return (
      event.startingDate !== null &&
      moment(day).format("YYYY-MM-DD") ===
        moment(event.startingDate.toString()).format("YYYY-MM-DD")
    )
  })

  const dateRelation = dateRelationWithEventAndMonth({ day, newEvent, month })

  const dateOnClick = (day) => {
    const ISOdate = day.toISOString()

    let chosenDate = [newEvent.startingDate, newEvent.endingDate].filter(
      (item) => {
        return item !== null
      }
    )
    if (chosenDate.length === 2) chosenDate = []

    chosenDate.push(ISOdate)
    chosenDate.sort()

    const endingDate = chosenDate[1] ? chosenDate[1] : null

    setNewEvent({
      ...newEvent,
      ...{ startingDate: chosenDate[0], endingDate },
    })

    setCurrentMonth(month)
    if (isCreatingNewEvent) navigate(`/event`)
  }

  return (
    <>
      <DateContainer dateRelation={dateRelation} newEvent={newEvent}>
        <DateInnerContainer
          day={day}
          dateRelation={dateRelation}
          events={thisDayEvents}
          newEvent={newEvent}
          dateOnClick={dateOnClick}
        >
          {day.format("D")}
          <DateEventsNotifier
            day={day}
            Events={thisDayEvents}
            newEvent={newEvent}
          />
        </DateInnerContainer>
      </DateContainer>
    </>
  )
}

export default Day

function dateRelationWithEventAndMonth({ day, newEvent, month }) {
  const dateRelation = {
    TODAY: false,
    IS_IN_CURRENT_MONTH: false,
    NOT_IN_CURRENT_MONTH: false,
    EVENT_START_DATE: false,
    EVENT_END_DATE: false,
    AFTER_EVENT: false,
    BETWEEN_EVENT_DATE: false,
    OUT_DATED: false,
    NOT_OUT_DATED: false,
    SINGLE_DAY_EVENT: false,
    MULTI_DAY_EVENT: false,
  }

  if (moment().isSame(day, "day")) dateRelation.TODAY = true

  if (month.containsDay(day)) dateRelation.IS_IN_CURRENT_MONTH = true

  if (!month.containsDay(day)) dateRelation.NOT_IN_CURRENT_MONTH = true

  if (moment(day).isAfter(moment())) dateRelation.NOT_OUT_DATED = true
  if (moment(day).isBefore(moment())) dateRelation.OUT_DATED = true

  if (newEvent === null) return dateRelation

  if (moment(day).isSame(newEvent.startingDate))
    dateRelation.EVENT_START_DATE = true

  if (moment(day).isSame(newEvent.endingDate))
    dateRelation.EVENT_END_DATE = true

  if (moment(day).isAfter(newEvent.startingDate))
    dateRelation.AFTER_EVENT = true

  if (
    moment(day).isAfter(newEvent.startingDate) &&
    moment(day).isBefore(newEvent.endingDate)
  )
    dateRelation.BETWEEN_EVENT_DATE = true

  dateRelation.SINGLE_DAY_EVENT = moment(newEvent.endingDate).isSame(
    newEvent.startingDate
  )

  dateRelation.MULTI_DAY_EVENT = moment(newEvent.startingDate).isBefore(
    newEvent.endingDate
  )

  return dateRelation
}
