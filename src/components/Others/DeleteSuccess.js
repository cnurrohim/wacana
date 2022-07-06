import React from "react"
import { ReactComponent as Illustration } from "../SVG/Enthusiastic-pana.svg"
import {
  resetSelectedIdState,
  showDeleteSuccess,
  resetEntryDataState,
} from "../../store/event"
import { useDispatch } from "react-redux"

const DeleteSuccess = () => {
  const dispatch = useDispatch()
  return (
    <div className="bg-pink-600 p-10 flex flex-col justify-center items-center h-full  rounded-r-xl">
      <h1 className="font-bold text-slate-100 text-4xl mb-14">Event Deleted</h1>

      <Illustration className="w-64 h-auto " />
      <div className="flex flex-row justify-around w-full mt-auto gap-5">
        <button
          className="py-1 px-2 border text-white box-content border-white hover:text-neutral-100 hover:border-neutral-100"
          onClick={() => {
            dispatch(showDeleteSuccess(false))
            dispatch(resetSelectedIdState())
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

export default DeleteSuccess
