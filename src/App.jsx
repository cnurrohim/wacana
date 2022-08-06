import { Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"
import Index from "./components/Home/index"

import EventProvider from "./contexts/eventProvider"
import CalendarProvider from "./contexts/calendarContext"
import AddNewEvent from "./components/Event/addNewEvent"
import EventDetail from "./components/Event/EventDetail"
import EditEvent from "./components/Event/EditEvent"
import DeleteEvent from "./components/Event/DeleteEvent"

function App() {
  return (
    <EventProvider>
      <CalendarProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />

            <Route path="event">
              <Route index element={<AddNewEvent />} />
              <Route path=":eventId" element={<EventDetail />} />
              <Route path="edit/:eventId" element={<EditEvent />} />
              <Route path="delete/:eventId" element={<DeleteEvent />} />
            </Route>
          </Route>
        </Routes>
      </CalendarProvider>
    </EventProvider>
  )
}

export default App
