import React from "react"

import Calendar from "../Calendar/Calendar"
import { RightLayout } from "../Layout"
import FormEditEvent from "./FormEditEvent"

function EditEvent() {
  return (
    <>
      <Calendar />
      <RightLayout>
        <FormEditEvent />
      </RightLayout>
    </>
  )
}

export default EditEvent
