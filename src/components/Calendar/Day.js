import React from "react"
import moment from "moment"
import { setEntryData, selectDate } from "../../store/event"
import { useSelector, useDispatch } from "react-redux"

const Day = ({ day, id, month }) => {
  const entryData = useSelector((state) => state.eventReducer.entryData)
  const events = useSelector((state) => state.eventReducer.events)
  const dispatch = useDispatch()

  const isToday = () => moment().isSame(day, "day")
  //const isSunday = () => moment(day).day() == 0
  const isInCurrentMonth = () => month.containsDay(day)
  const isStartingDay = () => moment(day).isSame(entryData.startingDate)
  const isEndingDay = () => moment(day).isSame(entryData.endingDate)
  const isOneDayEvent = () =>
    moment(entryData.startingDate).isSame(entryData.endingDate)

  const isInBetween = () =>
    moment(day).isAfter(entryData.startingDate) &&
    moment(day).isBefore(entryData.endingDate)

  const isDateOutDated = () => moment(day).isBefore(moment())

  const todayEvents = events.filter((event) => {
    return (
      event.startingDate !== null &&
      moment(day).format("YYYY-MM-DD") ===
        moment(event.startingDate.toString()).format("YYYY-MM-DD")
    )
  })

  const dateColor = () => {
    if (isStartingDay()) return `text-textSecondary-800`

    if (isStartingDay() && !isOneDayEvent() && entryData.endingDate !== null)
      return `text-textSecondary-800 font-semibold`

    if (isEndingDay() && !isOneDayEvent() && entryData.endingDate !== null)
      return `text-textSecondary-800  font-semibold`

    if (isInBetween()) return `text-textSecondary-800  font-semibold`

    if (isToday()) return "text-textPrimary"

    if (!isInCurrentMonth()) return "text-textPrimary-700"

    const isOutDated = isDateOutDated() && !isToday()
    if (isOutDated) return "text-textPrimary"

    return "text-textPrimary"
  }

  const dateDecoration = () => {
    const isTodayEventExist = todayEvents.length > 0 && !entryData.startingDate

    // if (isToday())
    //   return "rounded-[50%] border-2 border-transparent bg-secondary"

    if (isDateOutDated() && !isToday() && isTodayEventExist) {
      return `rounded-[50%] border-2 border-secondary-900`
    }

    if (isTodayEventExist) {
      const borderColor = todayEvents[0].colorMood.replace("bg", "border")
      return `rounded-[50%] border-2 ${borderColor}`
    }

    return "border-transparent border-2"
  }

  const eventNotificationColor = () => {
    const isTodayEventExist = todayEvents.length > 0 && !entryData.startingDate
    const isEventOutdated = isDateOutDated() && !isToday() && isTodayEventExist

    if (isEventOutdated) {
      return `bg-secondary-900 text-textPrimary hover:text-textPrimary-100 border-secondary`
    }

    if (isTodayEventExist)
      return `${todayEvents[0].colorMood} text-secondary border-secondary`

    return "hidden"
  }

  const chosenDateDecoration = () => {
    const isTodayEventExist = entryData._id

    const colorMood = isTodayEventExist
      ? entryData.colorMood
      : "bg-accentPrimary-700"

    if (isStartingDay()) return `rounded-[50%] ${colorMood}`
    if (isEndingDay()) return `rounded-[50%]  ${colorMood}`

    return ""
  }

  const betweenDateDecoration = () => {
    const isTodayEventExist = entryData._id

    const colorMood = isTodayEventExist
      ? entryData.colorMood
      : "bg-accentPrimary-700"

    const halfBgColor = isTodayEventExist
      ? colorMood.replace("bg", "from")
      : "from-accentPrimary-700"

    if (isStartingDay() && !isOneDayEvent() && entryData.endingDate !== null)
      return `bg-gradient-to-l-50 ${halfBgColor} to-secondary`

    if (isEndingDay() && !isOneDayEvent() && entryData.endingDate !== null)
      return `bg-gradient-to-r-50  ${halfBgColor} to-secondary`

    if (isInBetween()) return `${colorMood}`

    return ""
  }

  const dateContainerDecoration = () => {
    if (isToday() && !isInBetween()) return "bg-secondary-900"

    if (!isInCurrentMonth()) return "bg-secondary"

    const isOutDated = isDateOutDated() && !isToday()
    if (isOutDated) return "bg-secondary"

    return "bg-secondary"
  }

  const getPadding = () => {
    if (entryData.startingDate) return `p-0`

    return ` p-[0.2em]`
  }

  const dateOnClick = (day) => {
    const ISOdate = day.toISOString()
    const chosenDate = {
      startingDate: entryData.startingDate,
      endingDate: entryData.endingDate,
    }

    if (!entryData.startingDate) chosenDate.startingDate = ISOdate
    if (entryData.startingDate) chosenDate.endingDate = ISOdate
    if (day < moment(entryData.startingDate)) {
      chosenDate.endingDate = entryData.startingDate
      chosenDate.startingDate = ISOdate
    }
    if (entryData.endingDate) {
      chosenDate.startingDate = ISOdate
      chosenDate.endingDate = null
    }

    dispatch(setEntryData({ ...entryData, ...chosenDate }))
    dispatch(selectDate(ISOdate))
  }

  return (
    <>
      <div
        className={`${dateColor()} relative h-[52px] my-[1px] ${getPadding()} ${betweenDateDecoration()} ${dateContainerDecoration()}`}
      >
        <span
          key={id}
          className={`w-full h-full block  
          ${dateDecoration()} 
          ${chosenDateDecoration()} 
          hover:rounded-[50%] hover:bg-accentPrimary
          hover:cursor-pointer hover:text-textSecondary
          
          text-sm
           text-center flex justify-center items-center
          `}
          onClick={() => {
            dateOnClick(day)
          }}
        >
          {day.format("D")}

          {todayEvents.length > 0 && (
            <span
              className={`rounded-full  font-bold
               border-2
               inline-block text-xs ${eventNotificationColor()}
               py-1 px-2  absolute -top-1 -right-1 z-10`}
            >
              {todayEvents.length}
            </span>
          )}
        </span>
      </div>
    </>
  )
}

export default Day
