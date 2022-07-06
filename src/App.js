import Month from "calendar-months"
import React, { useState, useEffect } from "react"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "./store/event"
import Calendar from "./components/Calendar/Calendar"
import WelcomePanel from "./components/Others/WelcomePanel"
import EventsList from "./components/List/EventsList"
import Form from "./components/Form/"
import Details from "./components/Form/Details"
import DeletePrompt from "./components/Others/DeletePrompt"
import DeleteFailed from "./components/Others/DeleteFailed"
import DeleteSuccess from "./components/Others/DeleteSuccess"
import UpdateFailed from "./components/Others/UpdateFailed"
import UpdateSuccess from "./components/Others/UpdateSuccess"
import SaveSuccess from "./components/Others/SaveSuccess"
import SaveFailed from "./components/Others/SaveFailed"
import Error from "./components/Others/Error"

function App() {
  const {
    entryData,
    events,
    selectedDate,
    isDetailsPage,
    isEditForm,
    isDeleteSuccess,
    isUpdateSuccess,
    isSaveSuccess,
    showDeletePrompt,
    selectedIdEvent,
    isDeleteFailed,
    isUpdateFailed,
    isSaveFailed,
    isError,
  } = useSelector((state) => state.eventReducer)

  const [currentMonth, setCurrentMonth] = useState(Month.now)
  const monthString = moment(currentMonth).format("M")
  const yearString = moment(currentMonth).format("YYYY")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents(monthString, yearString))
  }, [
    currentMonth,
    dispatch,
    selectedDate,
    selectedIdEvent,
    monthString,
    yearString,
  ])

  const maxHeight = "h-[550px]"
  const padding = "p-5"
  const border = ""
  const firstLayer = "h-20"
  const secondLayer = "h-16"

  return (
    <div
      className={`
      flex justify-center items-center bg-primary text-white relative 
      h-auto sm:h-auto md:h-screen lg:h-screen xl:h-screen
      `}
    >
      <div
        className={`flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row
        ${border}
        h-full
        items-center
        w-screen 
        justify-center 
        z-10 overflow-hidden  `}
      >
        <Calendar
          month={currentMonth}
          setCurrentMonth={setCurrentMonth}
          maxHeight={maxHeight}
          padding={padding}
          border={border}
          firstLayer={firstLayer}
          secondLayer={secondLayer}
        />

        <div
          className={`w-full sm:w-full md:w-full lg:w-[40%] xl:w-[30%] 
          ${border}
          h-full sm:h-full md:h-full lg:h-[550px] xl:h-[550px]
          bg-tertiary
          relative 
          shadow-lg 
          rounded-none sm:rounded-none md:rounded-none lg:rounded-r-xl xl:rounded-r-xl`}
        >
          <img
            src="/images/inkpen-potrait.png"
            alt=""
            className="w-[46px] z-10 absolute -right-16 top-6 hidden sm:hidden md:block lg:block xl:block"
          />

          {selectedIdEvent ? (
            <>
              {showDeletePrompt && (
                <DeletePrompt firstLayer={firstLayer} padding={padding} />
              )}
              {isDeleteFailed.isFailed && (
                <DeleteFailed firstLayer={firstLayer} padding={padding} />
              )}
              {isDeleteSuccess && <DeleteSuccess firstLayer={firstLayer} />}
              {isUpdateFailed.isFailed && (
                <UpdateFailed firstLayer={firstLayer} padding={padding} />
              )}
              {isUpdateSuccess && (
                <UpdateSuccess firstLayer={firstLayer} padding={padding} />
              )}
              {isDetailsPage && (
                <Details firstLayer={firstLayer} padding={padding} />
              )}
              {isEditForm && <Form firstLayer={firstLayer} padding={padding} />}
            </>
          ) : isSaveSuccess ? (
            <SaveSuccess firstLayer={firstLayer} padding={padding} />
          ) : isSaveFailed.isFailed ? (
            <SaveFailed firstLayer={firstLayer} padding={padding} />
          ) : isError.isError ? (
            <Error />
          ) : (
            <>
              {entryData.startingDate === null && events.length === 0 && (
                <WelcomePanel firstLayer={firstLayer} />
              )}
              {entryData.startingDate === null && events.length > 0 && (
                <EventsList
                  month={currentMonth}
                  firstLayer={firstLayer}
                  padding={padding}
                />
              )}
              {entryData.startingDate !== null && (
                <Form firstLayer={firstLayer} padding={padding} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
