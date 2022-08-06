import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import TimePicker from "react-time-picker"
import FileBase from "react-file-base64"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"

import { getEvent, updateEvent } from "../../api/wacanaApi"
import { colorMoodSet } from "../../constants/ColorMood"
import { validateInput, getValidationMessage } from "./ValidateInput"
import { useEvent } from "../../contexts/eventProvider"

const FormEditEvent = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const { newEvent, setNewEvent } = useEvent()
  const [isImageDeleted, setIsImageDeleted] = useState(false)
  const [validationMessages, setValidationMessages] = useState({})
  const queryClient = useQueryClient()

  useQuery(["event", eventId], () => getEvent(eventId), {
    networkMode: "always",
    onSuccess: (event) => {
      setNewEvent(event)
    },
  })

  const updateEventMutation = useMutation(updateEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events")
      navigate("/")
    },
    onError: (err) => {
      setValidationMessages({
        save: { invalid: true, message: "Update Failed: " + err.message },
      })
    },
    networkMode: "always",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    let postData = { ...newEvent }
    if (postData.endingDate == null) {
      postData = { ...postData, endingDate: postData.startingDate }
    }

    const validationResult = validateInput(postData)

    if (validationResult.check) {
      updateEventMutation.mutate({ id: postData._id, post: postData })
    } else {
      setValidationMessages(getValidationMessage(validationResult.messages))
    }
  }

  const onTitleChanged = (e) => setNewEvent({ ...newEvent, title: e.target.value })

  const onDescriptionChanged = (e) => setNewEvent({ ...newEvent, description: e.target.value })

  const onStartingTimeChanged = (value) => setNewEvent({ ...newEvent, startingTime: value })

  const onEndingTimeChanged = (value) => setNewEvent({ ...newEvent, endingTime: value })

  const onChoosingImage = ({ base64 }) => {
    setNewEvent({ ...newEvent, image: base64 })
    setIsImageDeleted(false)
  }
  const onColorChanged = (moodColor) => setNewEvent({ ...newEvent, colorMood: moodColor })

  return (
    <div className="px-10 py-5 flex h-full flex-col text-secondary">
      <ErrorMessage validationMessages={validationMessages} inputField={"save"} />
      <form className="flex flex-col h-full">
        <ErrorMessage validationMessages={validationMessages} inputField={"startingDate"} />

        <div className="relative">
          <label htmlFor="title" className="mb-2 text-secondary">
            Event Name
          </label>
          <input
            type="text"
            name="title"
            className="w-full min-h-20 border-0 focus:outline-none mb-5 p-2 bg-tertiary-200 text-tertiary-700"
            value={newEvent.title}
            onChange={onTitleChanged}
          />
          <ErrorMessage validationMessages={validationMessages} inputField={"title"} />
        </div>
        <label htmlFor="description" className="mb-2 text-secondary">
          Description
        </label>
        <textarea
          name="description"
          className="w-full h-32 border-0 focus:outline-none mb-5 p-2 bg-tertiary-200 text-tertiary-700 overflow-y-scroll no-scollbar"
          value={newEvent.description}
          onChange={onDescriptionChanged}
        />
        <div className="relative">
          <label htmlFor="startingTime" className="mb-2 text-secondary">
            Time
          </label>
          <div className="mb-5">
            <TimePicker
              name="startingTime"
              disableClock
              format="HH mm"
              value={newEvent.startingTime}
              onChange={onStartingTimeChanged}
            />
            <TimePicker
              name="endingTime"
              disableClock
              format="HH mm"
              value={newEvent.endingTime}
              onChange={onEndingTimeChanged}
            />
          </div>
          <ErrorMessage validationMessages={validationMessages} inputField={"startingTime"} />
        </div>
        <div className="mb-2 flex flex-row  justify-between relative">
          <FileBase type="file" multiple={false} onDone={onChoosingImage} />
          {isImageDeleted && (
            <p className="text-xs absolute top-6 right-0 text-red-600">Image Deleted!</p>
          )}
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="text-red-500 text-xl self-center hover:cursor-pointer"
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
                    newEvent.colorMood === moodColor && "border-2 border-secondary"
                  }  hover:border-2 hover:border-white`}
                  onClick={(e) => onColorChanged(moodColor)}
                ></span>
              )
            })}
          </div>
          <ErrorMessage validationMessages={validationMessages} inputField={"colorMood"} />
        </div>
        <div className="flex flex-row justify-end w-full mt-auto gap-5 mb-2">
          <button
            className="py-1 px-6 border-2 box-content text-accentSecondary hover:text-accentSecondary-500 hover:border-accentSecondary-500 border-accentSecondary font-semibold"
            onClick={() => {
              navigate(`/event/${newEvent._id}`)
            }}
          >
            Cancel
          </button>

          <button
            className="py-1 px-5 bg-accentSecondary hover:bg-accentSecondary-500 text-tertiary"
            onClick={handleSubmit}
          >
            Update Event
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormEditEvent

const ErrorMessage = ({ validationMessages, inputField }) => {
  if (!(inputField in validationMessages)) return <></>
  if (Object.keys(validationMessages).length === 0) return <></>

  return (
    <p className="absolute bottom-0 right-0 text-xs text-red-600">
      {validationMessages[inputField].message}
    </p>
  )
}
