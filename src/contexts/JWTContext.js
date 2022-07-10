import { createContext, useEffect, useReducer } from 'react'

import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'

import { API_LOGIN, API_REFRESH_TOKEN, API_USER_INFO } from '@/routes/api'
// utils
import { _getApi, _postApi } from '@/utils/axios'
import {
  isValidToken,
  setRefreshToken,
  setRememberMe,
  setSession,
} from '@/utils/jwt'

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  LOGIN: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

AuthProvider.propTypes = {
  children: PropTypes.node,
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : ''

        if (accessToken && isValidToken(accessToken)) {
          const user = await getUserInfo(accessToken)
          setSession(accessToken)

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          })
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    initialize()
  }, [])

  const login = async (email, password, remember) => {
    const { data: { refreshToken } = {} } = await _postApi(API_LOGIN, {
      email,
      password,
    })
    const { data: { accessToken } = {} } = await _postApi(
      API_REFRESH_TOKEN,
      null,
      {
        headers: {
          'X-Refresh-Token': refreshToken,
        },
      }
    )
    const user = await getUserInfo(accessToken)

    setRememberMe(remember)
    setRefreshToken(refreshToken)
    setSession(accessToken)

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    })
  }

  const logout = async () => {
    setRememberMe(null)
    setRefreshToken(null)
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  const register = async () => {
    // TODO
  }

  const getUserInfo = async (accessToken) => {
    const decoded = jwtDecode(accessToken)
    const {
      email,
      name: displayName = '',
      Role: { id: roleId, name: role } = {},
      Team: { id: teamId, name: team } = {},
      id: userId,
      linkAvatar,
    } = await _getApi(`${API_USER_INFO}/${decoded.userId}`)

    return {
      email,
      displayName,
      role,
      roleId,
      userId,
      linkAvatar,
      team,
      teamId,
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
