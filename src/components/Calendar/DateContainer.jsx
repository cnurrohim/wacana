import React from "react"
import moment from "moment"
import { useCalendar } from "../../contexts/calendarContext"
import { Container } from "./DateComponents/Container"
import { DateText } from "./DateComponents/DateText"
import { EventNotif } from "./DateComponents/EventNotif"

export const DateContainer = ({ children, day, currentEvent, isAddNewEventAllowed }) => {
  const { currentMonth } = useCalendar()
  const isOutDated = !currentMonth.containsDay(day)
  const eventOutDate = moment(day).isBefore(moment(), "day")

  const notif =
    currentEvent.length > 0 ? (
      <EventNotif currentEvent={currentEvent} isOutDated={eventOutDate} />
    ) : (
      ""
    )
  return (
    <Container
      day={day}
      isOutDated={isOutDated}
      currentEvent={currentEvent}
      isAddNewEventAllowed={isAddNewEventAllowed}
    >
      <DateText>
        {children}
        {notif}
      </DateText>
    </Container>
  )
}
