import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
const Header = ({ month }) => {
  const monthInArray = month.format("YYYY").split("")

  return (
    <>
      <div className="flex flex-col gap-4  text-slate-700 mr-10 p-5">
        <FontAwesomeIcon className="text-4xl" icon={faCalendarAlt} />
        <div className="text-5xl flex flex-col gap-2 justify-center h-full">
          {monthInArray.map((m) => {
            return <span>{m}</span>
          })}
        </div>
      </div>
    </>
  )
}

export default Header
