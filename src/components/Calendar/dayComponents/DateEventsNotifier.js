import moment from "moment"

export const DateEventsNotifier = ({ day, Events, newEvent }) => {
  const isDateOutDated = () => moment(day).isBefore(moment())

  if (Events.length <= 0) return <></>

  if (newEvent.startingDate !== null) return <></>

  if (isDateOutDated()) return <OutDatedEventsNotifier Events={Events} />

  return (
    <span
      className={`rounded-full  font-bold
               border-2
               inline-block text-xs
               py-1 px-2  absolute -top-1 -right-1 z-10
               ${Events[0].colorMood} text-secondary border-secondary
               `}
    >
      {Events.length}
    </span>
  )
}

const OutDatedEventsNotifier = ({ Events }) => {
  return (
    <span
      className={`rounded-full  font-bold
               border-2
               inline-block text-xs
               py-1 px-2  absolute -top-1 -right-1 z-10
               bg-secondary-900 text-textPrimary hover:text-textPrimary-100 border-secondary
               `}
    >
      {Events.length}
    </span>
  )
}
