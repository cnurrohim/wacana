import React from "react"
import moment from "moment"
import EventsListByDate from "./EventsListByDate"

import { BlankSpaces } from "../Layout"

const EventsList = ({ events }) => {
  const eventGroup = {
    todayEvent: [],
    outDatedEvent: [],
    upcomingEvent: [],
  }

  events.forEach((event) => {
    const date = Number(moment(event.startingDate).format("D"))

    // group berdasarkan event hari ini, besok, kemarin
    const eventIsOutDated = moment(event.startingDate).isBefore(moment())
    const eventIsUpcoming = moment(event.startingDate).isAfter(moment())
    const eventIsToday = moment(event.startingDate).isSame(moment(), "day")

    if (eventIsOutDated && !eventIsToday) {
      if (!Array.isArray(eventGroup.outDatedEvent[date]))
        eventGroup.outDatedEvent[date] = []

      eventGroup.outDatedEvent[date] = [
        ...eventGroup.outDatedEvent[date],
        event,
      ]
    }

    if (eventIsUpcoming && !eventIsToday) {
      if (!Array.isArray(eventGroup.upcomingEvent[date]))
        eventGroup.upcomingEvent[date] = []

      eventGroup.upcomingEvent[date] = [
        ...eventGroup.upcomingEvent[date],
        event,
      ]
    }

    if (eventIsToday) {
      if (!Array.isArray(eventGroup.todayEvent[date]))
        eventGroup.todayEvent[date] = []

      eventGroup.todayEvent[date] = [...eventGroup.todayEvent[date], event]
    }
  })

  return (
    <div className={`flex flex-col h-full p-5`}>
      <BlankSpaces />
      <div className={`overflow-y-scroll no-scollbar`}>
        <div className="h-full w-full">
          <EventsListByDate eventGroup={eventGroup.todayEvent} current={true} />
          <EventsListByDate
            eventGroup={eventGroup.upcomingEvent}
            upcoming={true}
          />
          <EventsListByDate eventGroup={eventGroup.outDatedEvent} past={true} />
        </div>
      </div>
    </div>
  )
}

export default EventsList
