import { configureStore, combineReducers } from "@reduxjs/toolkit"
import eventReducer from "./event"

const reducers = combineReducers({
  eventReducer,
})

const store = configureStore({
  reducer: reducers,
})

export default store
