import React from "react"
import { ReactComponent as Cat } from "../SVG/Cat astronaut-bro.svg"

const LoadingPanel = () => {
  return (
    <div className=" p-10 flex flex-col justify-center items-center h-full rounded-none sm:rounded-none md:rounded-none lg:rounded-r-xl xl:rounded-r-xl">
      <h1 className="font-bold text-textSecondary text-4xl mb-5">No Event</h1>
      <Cat className="w-64 h-auto " />
      <p className="text-textSecondary w-52 text-center mb-10">
        Let's schedule event by picking a date first
      </p>
      <a
        href="https://storyset.com/web"
        className="text-xs text-textSecondary-700 absolute bottom-5"
      >
        Web illustrations by Storyset
      </a>
    </div>
  )
}

export default LoadingPanel
