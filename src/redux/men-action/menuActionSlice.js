import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: null,
  active: false
}

export const menuActionSlice = createSlice({
  name: 'menu-action',
  initialState,
  reducers: {
    updateItemMenuAction: (state,action) => {
      state.item = action.payload
    },
    menuActionToggle: (state, action) => {
      state.active = action.payload
    }
  }
})

export const {updateItemMenuAction, menuActionToggle} = menuActionSlice.actions

export default menuActionSlice.reducer