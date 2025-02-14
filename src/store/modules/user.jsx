import { createSlice } from '@reduxjs/toolkit'
import { request, setToken as _setToken, getToken } from '@/utils'

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
  },
})

const { setToken, setUserInfo } = userStore.actions

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

export { setToken, fetchLogin, fetchUserInfo }
const userReducer = userStore.reducer
export default userReducer
