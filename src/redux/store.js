import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'

import { apiSlice } from '@/redux/api/apiSlice'
import uploadAvatarSlice from '@/sections/user/account/uploadAvatarSlice'
import kanbanSlice from '@/sections/kanban/kanbanSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    avatar: uploadAvatarSlice,
    kanban: kanbanSlice,
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
