export const DateContainer = ({ children, dateRelation, newEvent }) => {
  let textStyle = getTextStyle(dateRelation)
  let bgColor = getBgColor(dateRelation, newEvent)

  let padding =
    dateRelation.EVENT_START_DATE || dateRelation.EVENT_END_DATE
      ? `p-0`
      : ` p-[0.2em]`

  return (
    <div
      className={`${textStyle} ${bgColor} ${padding} relative h-[52px] my-[1px]  `}
    >
      {children}
    </div>
  )
}

function getTextStyle(dateRelation) {
  let textStyle = "text-textPrimary"
  textStyle = dateRelation.NOT_IN_CURRENT_MONTH
    ? `text-textPrimary-500`
    : textStyle

  textStyle =
    dateRelation.EVENT_START_DATE ||
    dateRelation.EVENT_END_DATE ||
    dateRelation.BETWEEN_EVENT_DATE
      ? `text-textSecondary-800 font-semibold`
      : textStyle

  return textStyle
}

function getBgColor(dateRelation, newEvent) {
  const isTodayEventExist = newEvent._id

  const colorMood = isTodayEventExist
    ? newEvent.colorMood
    : "bg-accentPrimary-700"

  const halfColorMood = colorMood.replace("bg", "from")

  if (
    dateRelation.EVENT_START_DATE &&
    newEvent.startingDate &&
    newEvent.endingDate &&
    dateRelation.MULTI_DAY_EVENT
  )
    return `bg-gradient-to-l-50 ${halfColorMood} to-secondary`

  if (
    dateRelation.EVENT_END_DATE &&
    newEvent.startingDate &&
    newEvent.endingDate &&
    dateRelation.MULTI_DAY_EVENT
  )
    return `bg-gradient-to-r-50 ${halfColorMood} to-secondary`

  if (dateRelation.BETWEEN_EVENT_DATE) return colorMood

  return "bg-secondary"
}
