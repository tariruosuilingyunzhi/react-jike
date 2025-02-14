import { createSlice } from '@reduxjs/toolkit'
import { request, setToken as _setToken, getToken, removeToken } from '@/utils'
import { LoginApi, UserInfoApi } from '@/apis/user'
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
    const res = await LoginApi(loginValues)
    dispatch(setToken(res.data.token))
  }
}

const fetchUserInfo = () => {
  return async dispatch => {
    const res = await UserInfoApi()
    dispatch(setUserInfo(res.data))
  }
}

export { setToken, clearUserInfo, fetchLogin, fetchUserInfo }
const userReducer = userStore.reducer
export default userReducer
