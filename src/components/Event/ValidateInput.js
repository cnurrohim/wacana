import Validator from "fastest-validator"
import { Schema } from "./Schema"

export const validateInput = (userInputs) => {
  const validation = new Validator()
  const check = validation.compile(Schema)

  const result = check(userInputs)
  if (result.length > 0) {
    return { check: false, messages: result }
  } else {
    return { check: result }
  }
}

export const getValidationMessage = (validations) => {
  const inputs = {
    title: { invalid: false, message: "" },
    description: { invalid: false, message: "" },
    startingDate: { invalid: false, message: "" },
    startingTime: { invalid: false, message: "" },
    endingTime: { invalid: false, message: "" },
    image: { invalid: false, message: "" },
    colorMood: { invalid: false, message: "" },
    save: { invalid: false, message: "" },
  }

  validations.forEach((validation, i) => {
    inputs[validation.field].invalid = true
    inputs[validation.field].message = validation.message
  })

  return inputs
}
