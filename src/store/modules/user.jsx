import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'
const userStore = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token_key') || '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token_key', action.payload)
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
