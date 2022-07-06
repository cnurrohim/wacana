import React from "react"
import { ReactComponent as Illustration } from "../SVG/Enthusiastic-bro.svg"
import { showSaveSuccess, resetEntryDataState } from "../../store/event"
import { useDispatch } from "react-redux"

const SaveSuccess = () => {
  const dispatch = useDispatch()
  return (
    <div className="bg-sky-600 p-10 flex flex-col justify-center items-center h-full  rounded-r-xl">
      <h1 className="font-bold text-slate-100 text-4xl mb-5">Saved</h1>
      <p className="text-slate-200 w-52 text-center mb-10">
        Your event has been saved
      </p>
      <Illustration className="w-64 h-auto " />
      <div className="flex flex-row justify-around w-full mt-auto gap-5">
        <button
          className="py-1 px-2 border text-white box-content border-white hover:text-neutral-100 hover:border-neutral-100"
          onClick={() => {
            dispatch(showSaveSuccess(false))
            dispatch(resetEntryDataState())
          }}
        >
          OK
        </button>
      </div>
      <a
        href="https://storyset.com/web"
        className="text-xs text-white absolute bottom-2 right-2"
      >
        Web illustrations by Storyset
      </a>
    </div>
  )
}

export default SaveSuccess
