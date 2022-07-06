import React from "react"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import EventsListByDate from "./EventsListByDate"

const EventsList = ({ month, setCurrentMonth, firstLayer, padding }) => {
  const events = useSelector((state) => state.eventReducer.events)

  const eventGroup = {
    todayEvent: new Array(),
    pastEvent: new Array(),
    upcomingEvent: new Array(),
  }

  events.map((event, i) => {
    const date = Number(moment(event.startingDate).format("D"))

    // group berdasarkan event hari ini, besok, kemarin
    const eventIsPassed = moment(event.startingDate).isBefore(moment())
    const eventIsUpcoming = moment(event.startingDate).isAfter(moment())
    const eventIsToday = moment(event.startingDate).isSame(moment(), "day")

    if (eventIsPassed && !eventIsToday) {
      if (!Array.isArray(eventGroup.pastEvent[date]))
        eventGroup.pastEvent[date] = new Array()

      eventGroup.pastEvent[date] = [...eventGroup.pastEvent[date], event]
    }

    if (eventIsUpcoming && !eventIsToday) {
      if (!Array.isArray(eventGroup.upcomingEvent[date]))
        eventGroup.upcomingEvent[date] = new Array()

      eventGroup.upcomingEvent[date] = [
        ...eventGroup.upcomingEvent[date],
        event,
      ]
    }

    if (eventIsToday) {
      if (!Array.isArray(eventGroup.todayEvent[date]))
        eventGroup.todayEvent[date] = new Array()

      eventGroup.todayEvent[date] = [...eventGroup.todayEvent[date], event]
    }
  })

  return (
    <div className={`flex flex-col h-full ${padding}`}>
      <div className={``}>
        <div className={`${firstLayer}`}></div>
      </div>
      <div className={`overflow-y-scroll no-scollbar`}>
        <div className="h-full">
          <div className="w-full">
            <EventsListByDate
              eventGroup={eventGroup.todayEvent}
              current={true}
            />
            <EventsListByDate
              eventGroup={eventGroup.upcomingEvent}
              upcoming={true}
            />
            <EventsListByDate eventGroup={eventGroup.pastEvent} past={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsList
