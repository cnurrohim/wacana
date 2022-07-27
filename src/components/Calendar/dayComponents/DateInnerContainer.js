export const DateInnerContainer = ({
  children,
  day,
  dateRelation,
  events,
  newEvent,
  dateOnClick,
}) => {
  let circleColor = getCircleColor(events, newEvent, dateRelation)
  let bgColor = getChosenDateBGColor(newEvent, dateRelation)

  return (
    <span
      className={`w-full h-full  
          ${circleColor} 
          ${bgColor} 
          hover:rounded-[50%] hover:bg-accentPrimary
          hover:cursor-pointer hover:text-textSecondary
          
          text-sm
           text-center flex justify-center items-center
          `}
      onClick={() => {
        dateOnClick(day)
      }}
    >
      {children}
    </span>
  )
}

function getCircleColor(events, newEvent, dateRelation) {
  const isTodayEventExist = events.length > 0 && !newEvent.startingDate

  if (isTodayEventExist && dateRelation.NOT_OUT_DATED) {
    const borderColor = events[0].colorMood.replace("bg", "border")
    return `rounded-[50%] border-2 ${borderColor}`
  }

  if (dateRelation.OUT_DATED && isTodayEventExist)
    return `rounded-[50%] border-2 border-secondary-900`

  return "border-transparent border-2"
}

function getChosenDateBGColor(newEvent, dateRelation) {
  const isTodayEventExist = newEvent._id

  const colorMood = isTodayEventExist
    ? newEvent.colorMood
    : "bg-accentPrimary-700"

  if (dateRelation.EVENT_START_DATE) return `rounded-[50%] ${colorMood}`
  if (dateRelation.EVENT_END_DATE) return `rounded-[50%]  ${colorMood}`

  return ""
}
