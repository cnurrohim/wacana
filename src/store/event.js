import * as api from "../api"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  events: [],
  event: {
    startingDate: null,
    endingDate: null,
    startingTime: "00:00",
    endingTime: "23:59",
    colorMood: "bg-red-500",
    title: "",
    description: "",
    image: "",
  },
  entryData: {
    startingDate: null,
    endingDate: null,
    startingTime: "00:00",
    endingTime: "23:59",
    colorMood: "bg-red-500",
    title: "",
    desciprtion: "",
    image: "",
  },
  selectedDate: null,
  selectedIdEvent: "",
  isDetailsPage: false,
  showDeletePrompt: false,
  isEditForm: false,
  isSaveSuccess: false,
  isDeleteSuccess: false,
  isUpdateSuccess: false,
  isDeleteFailed: {
    isFailed: false,
    errorMessage: "",
  },
  isUpdateFailed: {
    isFailed: false,
    errorMessage: "",
  },
  isSaveFailed: {
    isFailed: false,
    errorMessage: "",
  },
  isError: {
    isError: false,
    errorMessage: "",
  },
}

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventRecords: (state, action) => {
      state.events = action.payload
    },
    setEventDetail: (state, action) => {
      state.event = action.payload
    },
    setEntryDataState: (state, action) => {
      state.entryData = action.payload
    },
    addPostedDataIntoState: (state, action) => {
      state.events = [...state.events, action.payload]
    },
    addUpdatedDataIntoState: (state, action) => {
      state.events.map((event) =>
        event._id === action.payload._id ? action.payload : event
      )
    },
    resetEntryDataState: (state) => {
      state.entryData = initialState.entryData
    },
    resetEventState: (state) => {
      state.event = initialState.event
    },
    resetSelectedIdState: (state) => {
      state.selectedIdEvent = initialState.selectedIdEvent
    },
    setSelectedDateState: (state, action) => {
      state.selectedDate = action.payload
    },
    selectIdEvent: (state, action) => {
      state.selectedIdEvent = action.payload
    },
    filterDeletedEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      )
    },
    setShowDeletePrompt: (state, action) => {
      state.showDeletePrompt = action.payload
    },
    setShowEditForm: (state, action) => {
      state.isEditForm = action.payload
    },
    setShowDetails: (state, action) => {
      state.isDetailsPage = action.payload
    },
    setShowDeleteSuccess: (state, action) => {
      state.isDeleteSuccess = action.payload
    },
    setShowDeleteFailed: (state, action) => {
      state.isDeleteFailed = action.payload
    },
    setShowUpdateSuccess: (state, action) => {
      state.isUpdateSuccess = action.payload
    },
    setShowUpdateFailed: (state, action) => {
      state.isUpdateFailed = action.payload
    },

    setShowSaveSuccess: (state, action) => {
      state.isSaveSuccess = action.payload
    },
    setShowSaveFailed: (state, action) => {
      state.isSaveFailed = action.payload
    },
    setShowCommonError: (state, action) => {
      state.isError = action.payload
    },
  },
})

export default eventSlice.reducer

export const Schema = {
  startingDate: {
    type: "string",
    empty: false,
  },
  endingDate: {
    type: "string",
    optional: true,
  },
  startingTime: {
    type: "string",
    empty: false,
  },
  endingTime: {
    type: "string",
    optional: true,
  },
  colorMood: {
    type: "string",
    empty: false,
  },
  title: {
    type: "string",
    empty: false,
  },
  description: {
    type: "string",
    optional: true,
  },
  image: {
    type: "string",
    optional: true,
  },
}

// ACTION
const {
  setEventRecords,
  addPostedDataIntoState,
  addUpdatedDataIntoState,
  setEntryDataState,
  setSelectedDateState,
  selectIdEvent,
  filterDeletedEvent,
  setShowDeleteSuccess,
  setShowDeleteFailed,
  setShowUpdateSuccess,
  setShowUpdateFailed,
  setShowSaveSuccess,
  setShowSaveFailed,
  setShowCommonError,
  setShowDetails,
  setShowDeletePrompt,
  setShowEditForm,
} = eventSlice.actions

export const { resetEntryDataState } = eventSlice.actions
export const { resetSelectedIdState } = eventSlice.actions
export const { resetEventState } = eventSlice.actions

export const showDeleteSuccess = (isShow) => (dispatch) =>
  dispatch(setShowDeleteSuccess(isShow))

export const showDeleteFailed = (isShow) => (dispatch) =>
  dispatch(setShowDeleteFailed(isShow))

export const showUpdateFailed = (isShow) => (dispatch) =>
  dispatch(setShowUpdateFailed(isShow))

export const showUpdateSuccess = (isShow) => (dispatch) =>
  dispatch(setShowUpdateSuccess(isShow))

export const showSaveFailed = (isShow) => (dispatch) =>
  dispatch(setShowSaveFailed(isShow))

export const showCommonError = (isShow) => (dispatch) =>
  dispatch(setShowCommonError(isShow))

export const showSaveSuccess = (isShow) => (dispatch) =>
  dispatch(setShowSaveSuccess(isShow))

export const showDetails = (isShow) => (dispatch) =>
  dispatch(setShowDetails(isShow))

export const showDeletePrompt = (isShow) => (dispatch) =>
  dispatch(setShowDeletePrompt(isShow))

export const showEditForm = (isShow) => (dispatch) =>
  dispatch(setShowEditForm(isShow))

export const selectEvent = (id) => (dispatch) => {
  dispatch(selectIdEvent(id))
}
export const selectDate = (date) => (dispatch) => {
  try {
    dispatch(setSelectedDateState(date))
  } catch (error) {
    console.error(error.message)
  }
}

export const setEntryData = (date) => (dispatch) => {
  try {
    dispatch(setEntryDataState(date))
  } catch (error) {
    console.error(error.message)
  }
}

export const fetchEvents = (month, year) => async (dispatch) => {
  try {
    const { data } = await api.getEvents(month, year)
    dispatch(setEventRecords(data))
  } catch (error) {
    dispatch(showCommonError({ isError: true, errorMessage: error.message }))
  }
}

export const fetchEvent = (id) => async (dispatch) => {
  try {
    const { data } = await api.getEvent(id)
    dispatch(setEntryDataState(data))
  } catch (error) {
    dispatch(showCommonError({ isError: true, errorMessage: error.message }))
  }
}

export const postEvent = (post) => async (dispatch) => {
  try {
    const { data } = await api.postEvent(post)

    dispatch(addPostedDataIntoState(data))
    dispatch(dispatch(showSaveSuccess(true)))
  } catch (error) {
    dispatch(showSaveFailed({ isFailed: true, errorMessage: error.message }))
  }
}

export const updateEvent = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, post)

    dispatch(addUpdatedDataIntoState(data))
    dispatch(dispatch(showUpdateSuccess(true)))
  } catch (error) {
    dispatch(showUpdateFailed({ isFailed: true, errorMessage: error.message }))
  }
}

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id)

    dispatch(filterDeletedEvent(id))
    dispatch(dispatch(showDeleteSuccess(true)))
    dispatch(dispatch(showDeletePrompt(false)))
  } catch (error) {
    dispatch(dispatch(showDeletePrompt(false)))
    dispatch(showDeleteFailed({ isFailed: true, errorMessage: error.message }))
  }
}
