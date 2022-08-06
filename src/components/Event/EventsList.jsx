import React from "react"
import moment from "moment"
import EventsListByDate from "./EventsListByDate"

import { BlankSpaces } from "../Layout"

const EventsList = ({ events }) => {
  const eventGroup = {
    ongoingEvent: {},
    outDatedEvent: {},
    upcomingEvent: {},
  }

  Object.keys(events).forEach((eventDate) => {
    if (moment(eventDate).isBefore(moment().format("YYYY-MM-DD"))) {
      eventGroup.outDatedEvent = { ...eventGroup.outDatedEvent, [eventDate]: events[eventDate] }
    }

    if (moment(eventDate).isAfter(moment().format("YYYY-MM-DD"))) {
      eventGroup.upcomingEvent = { ...eventGroup.upcomingEvent, [eventDate]: events[eventDate] }
    }
    if (moment(eventDate).isSame(moment().format("YYYY-MM-DD"))) {
      eventGroup.ongoingEvent = { ...eventGroup.ongoingEvent, [eventDate]: events[eventDate] }
    }
  })

  return (
    <div className={`flex flex-col h-full p-5`}>
      <BlankSpaces />
      <div className={`overflow-y-scroll no-scollbar`}>
        <div className="h-full w-full">
          <EventsListByDate eventGroup={eventGroup.ongoingEvent} current />
          <EventsListByDate eventGroup={eventGroup.upcomingEvent} upcoming />
          <EventsListByDate eventGroup={eventGroup.outDatedEvent} outDated />
        </div>
      </div>
    </div>
  )
}

export default EventsList
