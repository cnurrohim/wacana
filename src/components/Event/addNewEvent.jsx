import React from "react"
import Calendar from "../Calendar/Calendar"

import { RightLayout } from "../Layout"
import FormAddNewEvent from "./FormAddNewEvent"

function AddNewEvent() {
  return (
    <>
      <Calendar />
      <RightLayout>
        <FormAddNewEvent />
      </RightLayout>
    </>
  )
}

export default AddNewEvent
