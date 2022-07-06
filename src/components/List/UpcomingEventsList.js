import React from "react"
import moment from "moment"

const UpcomingEventsList = ({ eventAssorted }) => {
  const today = moment().format("D")
  return (
    <>
      <div className="w-full bg-yellow-500 flex flex-col pt-5 px-10 py-5">
        <h3 className="font-semibold  mb-3">Upcoming Events</h3>
        <div className="flex flex-row w-fit flex-wrap gap-y-2">
          {eventAssorted &&
            eventAssorted.map((events, i) => {
              if (i <= today) {
                return
              }
              return (
                <div className="flex flex-row w-1/2" key={i}>
                  <div className="flex flex-col ">
                    <span className="font-bold text-[25px] p-0 leading-none">
                      {i}
                    </span>
                    <span>{moment(events[0].startingDate).format("ddd")}</span>
                  </div>
                  <div className="flex flex-col pl-3">
                    {events.map((event, a) => {
                      return (
                        <div className="flex flex-row items-center" key={a}>
                          <span className="rounded-full h-1 w-1 bg-black mr-1"></span>
                          <h2 className="">{event.event}</h2>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default UpcomingEventsList
