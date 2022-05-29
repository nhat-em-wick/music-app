import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  currentTheme : 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.currentTheme = action.payload
    }
  }
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer