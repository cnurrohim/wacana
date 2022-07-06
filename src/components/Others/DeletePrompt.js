import React from "react"
import { ReactComponent as Illustration } from "../SVG/Questions-pana.svg"
import { showDeletePrompt, deleteEvent, showDetails } from "../../store/event"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"

const DeletePrompt = () => {
  const selectedIdEvent = useSelector(
    (state) => state.eventReducer.selectedIdEvent
  )

  const event = useSelector((state) => state.eventReducer.entryData)

  const dispatch = useDispatch()
  return (
    <div className="bg-pink-600 p-10 flex flex-col justify-center items-center h-full  rounded-r-xl">
      <h1 className="font-bold text-slate-100 text-4xl mb-10">Delete Event?</h1>
      <Illustration className="w-64 h-auto " />
      <p className="text-slate-200 w-52 text-center">You are about to delete</p>
      <p className="text-slate-200 w-52 text-center">
        {moment(event.startingDate).format("MMMM Do")}, {event.title}
      </p>
      <div className="flex flex-row justify-around w-full mt-auto gap-5">
        <button
          className="py-1 px-3 border text-white box-content border-white hover:text-neutral-100 hover:border-neutral-100"
          onClick={() => {
            dispatch(showDeletePrompt(false))
            dispatch(showDetails(true))
            // preventing showing edit form
            //dispatch(resetSelectedIdState())
          }}
        >
          Cancel
        </button>

        <button
          className="py-1 px-3 bg-accentPrimary-700 hover:bg-accentPrimary-600 text-white"
          onClick={() => {
            dispatch(deleteEvent(selectedIdEvent))
          }}
        >
          Delete Event
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

export default DeletePrompt
