import { createSlice } from '@reduxjs/toolkit'
import { request, setToken as _setToken, getToken, removeToken } from '@/utils'
const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() | '',
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      // 清除本地存储的token
      removeToken()
    },
  },
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

const fetchLogin = loginValues => {
  return async dispatch => {
    const res = await request.post('/authorizations', loginValues)
    dispatch(setToken(res.data.token))
  }
}

const fetchUserInfo = () => {
  return async dispatch => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { setToken, clearUserInfo, fetchLogin, fetchUserInfo }
const userReducer = userStore.reducer
export default userReducer
