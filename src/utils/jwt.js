import jwtDecode from 'jwt-decode'

// routes
import { API_REFRESH_TOKEN } from '@/routes/api'
import { PATH_AUTH } from '@/routes/paths'

//
import axios, { _postApi } from './axios'

const isValidToken = (accessToken) => {
  if (!accessToken) return false

  const decoded = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

const handleTokenExpired = (exp) => {
  let expiredTimer

  const currentTime = Date.now()

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    handleRefreshToken()
  }, timeLeft)
}

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken) // ~5 days by minimals server
    handleTokenExpired(exp)
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

const setRememberMe = (rememberMe) => {
  if (typeof rememberMe === 'boolean') {
    localStorage.setItem('isRememberMe', rememberMe)
  } else {
    localStorage.removeItem('isRememberMe')
  }
}

const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  } else {
    localStorage.removeItem('refreshToken')
  }
}

const handleRefreshToken = async () => {
  try {
    const isRememberMe = JSON.parse(localStorage.getItem('isRememberMe'))

    if (!isRememberMe) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = PATH_AUTH.login
      return
    }

    const refreshToken = localStorage.getItem('refreshToken')
    const { data: { accessToken } = {} } = await _postApi(
      API_REFRESH_TOKEN,
      null,
      {
        headers: {
          'X-Refresh-Token': refreshToken,
        },
      }
    )
    setSession(accessToken)
    window.location.reload()
  } catch (error) {
    //  TODO
  }
}

export {
  isValidToken,
  setSession,
  setRefreshToken,
  setRememberMe,
  handleRefreshToken,
}
