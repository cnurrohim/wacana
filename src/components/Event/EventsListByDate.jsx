import React from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock as Clock, faCalendarDays } from "@fortawesome/free-regular-svg-icons"

const UpcomingEventsList = ({ eventGroup, outDated, upcoming }) => {
  const title = outDated ? "Outdated Event" : upcoming ? "Upcoming Event" : "Ongoing Event"

  const titleSize = outDated ? "text-xl" : upcoming ? "text-xl" : "text-2xl"

  // sort object by key
  eventGroup = Object.fromEntries(Object.entries(eventGroup).sort())

  return (
    <>
      {eventGroup && Object.keys(eventGroup).length > 0 && (
        <div className="w-full flex flex-col mb-12">
          <h3 className={`${titleSize} font-bold mb-10 text-secondary`}>{title}</h3>
          <div className="flex flex-col gap-y-2">
            {Object.keys(eventGroup).map((eventDate) => {
              const textColor = eventGroup[eventDate][0].colorMood.replace("bg", "text")
              const date = moment(eventDate).format("D")
              return (
                <div className="flex flex-row   leading-none" key={date}>
                  <div className="flex flex-col w-10  items-center flex-shrink-0">
                    <span
                      className={`block text-center font-semibold py-2 items-center  bg-secondary text-2xl w-full leading-none ${textColor}`}
                    >
                      {date}
                    </span>
                    <span className="block text-center  py-2 items-center bg-secondary-700 text-sm w-full leading-none text-primary-200">
                      {moment(eventGroup[eventDate][0].startingDate).format("ddd")}
                    </span>
                  </div>
                  <div className="flex flex-col pl-3 flex-grow">
                    {eventGroup[eventDate].map((event, a) => {
                      const borderColor = event.colorMood.replace("bg", "border")

                      return (
                        <div
                          className={`flex flex-col mb-5 pl-3 border-l-4 ${borderColor}`}
                          key={a}
                        >
                          <Link to={`event/${event._id}`}>
                            <h2 className="text-md font-semibold capitalize mb-3 text-secondary hover:text-secondary-700 hover:cursor-pointer  leading-tight">
                              {event.title}
                            </h2>
                          </Link>
                          {event.endingDate !== event.startingDate && (
                            <span className="text-secondary text-xs font-thin mb-2 flex flex-row leading-none">
                              <FontAwesomeIcon icon={faCalendarDays} className="mr-3" />{" "}
                              <p className="">
                                {moment(event.startingDate).format("ddd")}{" "}
                                {moment(event.startingDate).format("D")} -{" "}
                                {moment(event.endingDate).format("ddd")}{" "}
                                {moment(event.endingDate).format("D")}
                              </p>
                            </span>
                          )}

                          <span className="text-secondary text-xs font-thin leading-none mb-4">
                            <FontAwesomeIcon icon={Clock} className="mr-2" /> {event.startingTime} -{" "}
                            {event.endingTime}
                          </span>

                          {event.image && (
                            <img src={event.image} alt={event.title} className="mb-2" />
                          )}

                          <p className="text-sm text-secondary-700">{event.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default UpcomingEventsList
