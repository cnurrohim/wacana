import React from "react"

const Decoration = () => {
  return (
    <div className="w-20 h-10 absolute top-0 right-0 flex flex-col">
      <div className="flex flex-row">
        <span className="h-10 w-1/2 bg-accentPrimary-700"></span>
        <span className="h-10 w-1/2 bg-accentPrimary"></span>
      </div>
      <div className="flex flex-row justify-end">
        <span className="h-10 w-1/2 bg-accentPrimary-800"></span>
      </div>
    </div>
  )
}

export default Decoration
