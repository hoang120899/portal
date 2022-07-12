import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'

import { apiSlice } from '@/redux/api/apiSlice'
import clientReducer from '@/sections/client/clientSlice'
import kanbanReducer from '@/sections/kanban/kanbanSlice'
import uploadAvatarReducer from '@/sections/user/account/uploadAvatarSlice'
import salaryReducer from '@/sections/caculator/salarySlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    avatar: uploadAvatarReducer,
    kanban: kanbanReducer,
    client: clientReducer,
    salary: salaryReducer,
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
