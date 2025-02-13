import { createSlice } from '@reduxjs/toolkit'
const userStore = createSlice({
  name: 'user',
  initialState: {
    token: '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
  },
})

const { setToken } = userStore.actions
export { setToken }
const userReducer = userStore.reducer
export default userReducer
