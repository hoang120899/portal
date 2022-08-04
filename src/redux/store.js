import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'

import { apiSlice } from '@/redux/api/apiSlice'
import salaryReducer from '@/sections/caculator/salarySlice'
import candidateReducer from '@/sections/candidate/candidateSlice'
import clientReducer from '@/sections/client/clientSlice'
import jobDetailReducer from '@/sections/jobdetail/jobDetailSlice'
import kanbanReducer from '@/sections/kanban/kanbanSlice'
import uploadAvatarReducer from '@/sections/user/account/uploadAvatarSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    avatar: uploadAvatarReducer,
    kanban: kanbanReducer,
    client: clientReducer,
    salary: salaryReducer,
    candidates: candidateReducer,
    jobs: jobDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(apiSlice.middleware),
})

const { dispatch } = store

const useSelector = useAppSelector

const useDispatch = () => useAppDispatch()

export { store, dispatch, useSelector, useDispatch }
