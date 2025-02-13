import { createSlice } from '@reduxjs/toolkit'
import { request, setToken as _setToken, getToken } from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() | '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
  },
})

const { setToken } = userStore.actions

const fetchLogin = loginValues => {
  return async dispatch => {
    const res = await request.post('/authorizations', loginValues)
    dispatch(setToken(res.data.token))
  }
}

export { setToken, fetchLogin }
const userReducer = userStore.reducer
export default userReducer
