import React from "react"
import { ReactComponent as Illustration } from "../SVG/Oops-pana.svg"
import { useNavigate } from "react-router-dom"

const ErrorPanel = ({ errorMessage }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-pink-600 p-10 flex flex-col justify-center items-center h-full rounded-none sm:rounded-none md:rounded-none lg:rounded-r-xl xl:rounded-r-xl">
      <h1 className="font-bold text-slate-100 text-4xl mb-5">Oops!</h1>
      <p className="text-pink-200 w-52 text-center mb-10">{errorMessage}</p>
      <Illustration className="w-64 h-auto " />
      <div className="flex flex-row justify-around w-full mt-auto gap-5">
        <button
          className="py-1 px-2 border text-white box-content border-white hover:text-neutral-100 hover:border-neutral-100"
          onClick={() => {
            navigate("/")
          }}
        >
          Go Back
        </button>
      </div>
      <a href="https://storyset.com/web" className="text-xs text-white absolute bottom-2 right-2">
        Web illustrations by Storyset
      </a>
    </div>
  )
}

export default ErrorPanel
