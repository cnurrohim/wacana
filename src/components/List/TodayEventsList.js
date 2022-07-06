import React from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock as Clock } from "@fortawesome/free-regular-svg-icons"

const UpcomingEventsList = ({ eventAssorted }) => {
  const today = moment().format("D")
  return (
    <>
      {eventAssorted[today] && (
        <div className="w-full bg-yellow-500 flex flex flex-col pt-5 px-10 py-5">
          <h3 className="font-semibold text-2xl mb-10">Today Events</h3>
          <div className="flex flex-row">
            <div className="flex flex-col h-20  items-center">
              <span className="font-bold text-[40px] p-0 leading-none">
                {today}
              </span>
              <span>{moment().format("ddd")}</span>
            </div>
            <div className="flex flex-col pt-1  pl-7">
              {eventAssorted[today].map((event, i) => {
                return (
                  <div className="flex flex-col mb-5" key={i}>
                    <h2 className="">{event.event}</h2>
                    {event.endingDate !== event.startingDate && (
                      <p>
                        {moment(event.startingDate).format("ddd")}{" "}
                        {moment(event.startingDate).format("D")} -{" "}
                        {moment(event.endingDate).format("ddd")}{" "}
                        {moment(event.endingDate).format("D")}
                      </p>
                    )}

                    <span className="text-neutral-100">
                      <FontAwesomeIcon icon={Clock} className="" />{" "}
                      {event.startingTime} - {event.endingTime}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UpcomingEventsList
