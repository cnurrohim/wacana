import React from "react"
import { ReactComponent as Illustration } from "../SVG/Enthusiastic-cuate.svg"
import {
  resetSelectedIdState,
  showUpdateSuccess,
  resetEntryDataState,
} from "../../store/event"
import { useDispatch } from "react-redux"

const UpdateSuccess = () => {
  const dispatch = useDispatch()

  return (
    <div className="bg-sky-600 p-10 flex flex-col justify-center items-center h-full rounded-none sm:rounded-none md:rounded-none lg:rounded-r-xl xl:rounded-r-xl">
      <h1 className="font-bold text-slate-100 text-4xl mb-14">
        Event Updated!
      </h1>

      <Illustration className="w-64 h-auto " />
      <div className="flex flex-row justify-around w-full mt-auto gap-5">
        <button
          className="py-1 px-2 border text-white0 box-content border-white hover:text-neutral-100 hover:border-neutral-100"
          onClick={() => {
            dispatch(showUpdateSuccess(false))
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

export default UpdateSuccess
