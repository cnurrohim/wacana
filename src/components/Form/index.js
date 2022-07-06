import React, { useState, useEffect } from "react"
import {
  setEntryData,
  fetchEvent,
  postEvent,
  resetEntryDataState,
  resetSelectedIdState,
  showEditForm,
  resetEventState,
  updateEvent,
  showDetails,
} from "../../store/event"
import { useSelector, useDispatch } from "react-redux"
import TimePicker from "react-time-picker"
import FileBase from "react-file-base64"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { Schema } from "../../store/event"
import Validator from "fastest-validator"

const Form = () => {
  const event = useSelector((state) => state.eventReducer.entryData)
  const isEditForm = useSelector((state) => state.eventReducer.isEditForm)
  const [isImageDeleted, setIsImageDeleted] = useState(false)
  const [inputInvalid, setinputInvalid] = useState({
    title: { invalid: false, message: "" },
    description: { invalid: false, message: "" },
    startingTime: { invalid: false, message: "" },
    image: { invalid: false, message: "" },
    colorMood: { invalid: false, message: "" },
  })

  const validation = new Validator()

  const check = validation.compile(Schema)

  const selectedIdEvent = useSelector(
    (state) => state.eventReducer.selectedIdEvent
  )

  const dispatch = useDispatch()
  useEffect(() => {
    if (selectedIdEvent !== "") {
      dispatch(fetchEvent(selectedIdEvent))
    }
  }, [dispatch, selectedIdEvent])

  const [isAnytime, setisAnytime] = useState(false)
  const [refresh, setRefresh] = useState(0)

  const colorMoodSet = [
    "bg-red-500",
    "bg-blue-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
  ]

  const isInvalidInput = (data) => {
    const validations = check(data)

    if (validations.length > 0) {
      validations.map((validation, i) => {
        inputInvalid[validation.field].invalid = true
        inputInvalid[validation.field].message = validation.message
        setinputInvalid({
          ...inputInvalid,
          [validation.field]: {
            invalid: true,
            message: validation.message,
          },
        })
      })
      return true
    }

    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let postData = { ...event }
    if (postData.endingDate == null) {
      postData = { ...postData, endingDate: postData.startingDate }
    }

    if (isInvalidInput(postData)) return false

    if (selectedIdEvent !== "") {
      dispatch(updateEvent(selectedIdEvent, postData))
    } else {
      dispatch(postEvent(postData))
    }

    setRefresh((refresh) => refresh + 1)

    clearInput()
    if (isEditForm) {
      dispatch(showDetails(false))
    }
  }

  const clearInput = () => {
    dispatch(resetEntryDataState())
    dispatch(resetEventState())
    dispatch(showEditForm(false))
    dispatch(showDetails(true))
  }

  return (
    <div className="px-10 py-5 flex h-full flex-col text-secondary">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="relative">
          <label htmlFor="title" className="mb-2 text-secondary">
            Event Name
          </label>
          <input
            type="text"
            name="title"
            className="w-full min-h-20 border-0 focus:outline-none mb-5 p-2 bg-tertiary-300 text-tertiary-700"
            onChange={(e) =>
              dispatch(setEntryData({ ...event, title: e.target.value }))
            }
            value={event.title}
          />

          {inputInvalid.title.invalid === true && (
            <p className="absolute bottom-0 right-0 text-xs text-red-600">
              {inputInvalid.title.message}
            </p>
          )}
        </div>

        <label htmlFor="description" className="mb-2 text-secondary">
          Description
        </label>
        <textarea
          name="description"
          className="w-full h-32 border-0 focus:outline-none mb-5 p-2 bg-tertiary-300 text-tertiary-700 overflow-y-scroll no-scollbar"
          onChange={(e) =>
            dispatch(setEntryData({ ...event, description: e.target.value }))
          }
          value={event.description}
        />

        <div className="relative">
          <label htmlFor="startingTime" className="mb-2 text-secondary">
            Time
          </label>
          <div className="mb-5">
            {!isAnytime && (
              <>
                <TimePicker
                  name="startingTime"
                  disableClock
                  format="HH mm"
                  onChange={(value) =>
                    dispatch(setEntryData({ ...event, startingTime: value }))
                  }
                  value={event.startingTime}
                />
                <TimePicker
                  name="endingTime"
                  disableClock
                  format="HH mm"
                  onChange={(value) =>
                    dispatch(setEntryData({ ...event, endingTime: value }))
                  }
                  value={event.endingTime}
                />
              </>
            )}
          </div>
          {inputInvalid.startingTime.invalid === true && (
            <p className="absolute bottom-0 right-0 text-xs text-red-600">
              {inputInvalid.startingTime.message}
            </p>
          )}
        </div>

        <div className="mb-2 flex flex-row  justify-between relative">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              dispatch(setEntryData({ ...event, image: base64 }))
              setIsImageDeleted(false)
            }}
          />
          {isImageDeleted && (
            <p className="text-xs absolute top-6 right-0 text-red-600">
              Image Deleted!
            </p>
          )}
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="text-red-500 text-xl self-center hover:cursor-pointer"
            onClick={() => {
              dispatch(setEntryData({ ...event, image: "" }))
              setIsImageDeleted(true)
            }}
          />
        </div>

        <div className="relative pb-5">
          <label htmlFor="color-mood" className="mb-2 block text-secondary">
            Color Mood
          </label>
          <div className="flex flex-row ">
            {colorMoodSet.map((moodColor, i) => {
              return (
                <span
                  key={i}
                  className={`w-5 h-5 ${moodColor} ${
                    event.colorMood == moodColor && "border-2 border-secondary"
                  }  hover:border-2 hover:border-white`}
                  onClick={(e) =>
                    dispatch(setEntryData({ ...event, colorMood: moodColor }))
                  }
                ></span>
              )
            })}
          </div>
          {inputInvalid.colorMood.invalid === true && (
            <p className="absolute bottom-0 right-0 text-xs text-red-600">
              {inputInvalid.colorMood.message}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-end w-full mt-auto gap-5 mb-2">
          <button
            className="py-1 px-6 border-2 box-content text-accentSecondary hover:text-accentSecondary-500 hover:border-accentSecondary-500 border-accentSecondary font-semibold"
            onClick={() => {
              clearInput()
            }}
          >
            Cancel
          </button>

          {selectedIdEvent !== "" && (
            <button
              className="py-1 px-5 bg-accentSecondary hover:bg-accentSecondary-500 text-tertiary font-semibold"
              onClick={handleSubmit}
            >
              Update Event
            </button>
          )}

          {selectedIdEvent === "" && (
            <button
              className="py-1 px-5 bg-accentSecondary hover:bg-accentSecondary-500 text-tertiary"
              onClick={handleSubmit}
            >
              Save Event
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Form
