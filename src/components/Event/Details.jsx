import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"

import { faClock as Clock, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import moment from "moment"
import { useNavigate } from "react-router-dom"

const Details = ({ event }) => {
  const navigate = useNavigate()
  const textColor = event.colorMood ? event.colorMood.replace("bg", "text") : ""
  const borderColor = event.colorMood.replace("bg", "border")

  const hoverText = "hover:" + textColor.replace("500", "600")
  const hoverBorder = "hover:" + borderColor.replace("500", "600")
  const hoverBg = "hover:" + event.colorMood.replace("500", "600")

  return (
    <div className={`flex flex-col h-full p-5`}>
      <div className={`overflow-y-scroll no-scollbar pt-20`}>
        <div className="flex flex-row w-[100%] justify-between text-2xl mb-10 ">
          <button className="w-10">
            <FontAwesomeIcon
              className="text-accentPrimary-700 text-2xl hover:text-accentPrimary hover:cursor-pointer"
              icon={faAngleLeft}
              onClick={() => {
                navigate("/")
              }}
            />
          </button>
        </div>
        {event.startingDate !== null && (
          <div className="flex flex-row leading-none">
            <div className="flex flex-col w-10  items-center flex-shrink-0">
              <span
                className={`block text-center font-semibold py-2 items-center  bg-secondary text-2xl w-full leading-none ${textColor}`}
              >
                {moment(event.startingDate).format("D")}
              </span>
              <span className="block text-center font-thin py-2 items-center bg-secondary-700 text-sm w-full leading-none text-primary-200">
                {moment(event.startingDate).format("ddd")}
              </span>
            </div>

            <div className={`flex flex-col pl-3 flex-grow`}>
              <div className={`flex flex-col mb-5 pl-3 border-l-4 ${borderColor}`}>
                <h2 className="text-md font-semibold capitalize mb-3 text-secondary leading-tight">
                  {event.title}
                </h2>
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

                {event.image && <img className="mb-2" src={event.image} alt={event.title} />}

                <p className="text-sm text-secondary-700">{event.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row justify-end w-full mt-auto gap-5 mb-2">
          <button
            className={`py-1 px-6 border-2 ${textColor} box-content ${borderColor} 
          ${hoverText} 
          ${hoverBorder} 
          font-semibold`}
            onClick={() => {
              navigate(`/event/delete/${event._id}`)
            }}
          >
            Delete Event
          </button>

          <button
            className={`py-1 px-6 ${event.colorMood} ${hoverBg}`}
            onClick={() => {
              navigate(`/event/edit/${event._id}`)
            }}
          >
            Edit Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details
