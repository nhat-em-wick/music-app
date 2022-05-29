import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlay: false,
  currentTime: 0,
  duration: 0,
  isMute: false,
  stream: null,
  currentVolume: 100,
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    playing: (state, action) => {
      state.isPlay = action.payload
    },
    updateCurrentTime: (state, action) => {
      state.currentTime = action.payload
    },
    updateDuration: (state, action) => {
      state.duration = action.payload
    },
    mute: (state, action) => {
      state.isMute = action.payload
    },
    stream: (state, action) => {
      state.stream = action.payload
    },
    updateVolume: (state, action) => {
      state.currentVolume = action.payload
    }
  }
})

export const {playing, updateCurrentTime, updateDuration, mute, stream, updateVolume} = audioSlice.actions

export default audioSlice.reducer