import Validator from "fastest-validator"
import { Schema } from "./Schema"

const inputs = {
  title: { invalid: false, message: "" },
  description: { invalid: false, message: "" },
  startingDate: { invalid: false, message: "" },
  startingTime: { invalid: false, message: "" },
  endingTime: { invalid: false, message: "" },
  image: { invalid: false, message: "" },
  colorMood: { invalid: false, message: "" },
}

export const validateInput = (userInputs) => {
  const validation = new Validator()
  const check = validation.compile(Schema)

  return check(userInputs)
}

export const getValidationMessage = (validations) => {
  validations.forEach((validation, i) => {
    inputs[validation.field].invalid = true
    inputs[validation.field].message = validation.message
  })

  return inputs
}
