import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

const Month = ({ month, setCurrentMonth, secondLayer }) => {
  return (
    <>
      <div className="col-span-4 text-2xl text-tertiary font-semibold">
        <span className={`capitalize ${secondLayer} block`}>
          {month.format("MMMM")}
        </span>
      </div>
      <div className="justify-between text-2xl text-tertiary-300 font-thin ">
        <span className="uppercase">{month.format("YYYY")}</span>
      </div>
      <div className="text-2xl text-accentPrimary hover:text-accentPrimary-500 flex justify-center items-start ">
        <button
          onClick={() => setCurrentMonth(month.previousMonth())}
          className={``}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      </div>
      <div className="text-2xl text-accentPrimary hover:text-accentPrimary-500  flex justify-center items-start ">
        <button onClick={() => setCurrentMonth(month.nextMonth())}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </>
  )
}

export default Month
