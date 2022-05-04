import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null, // {}
  currentIndexSong: 0, //
  list: [],
  isRandom: false,
  isRepeat: false,
  songsPlayed: [],
  currentAlbum: null
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    currentSong: (state, action) => {
      state.currentSong = action.payload
    },
    list: (state, action) => {
      state.list = action.payload
    },
    random: (state, action) => {
      state.isRandom = action.payload
    },
    repeat: (state,action) => {
      state.isRepeat = action.payload
    },
    listPlayed: (state, action) => {
      state.songsPlayed = [
        ...state.songsPlayed,
        action.payload
      ]
    },
    clearListPlayed: (state, action) => {
      state.songsPlayed = []
    },
    index: (state,action) => {
      state.currentIndexSong = action.payload
    },
    albumPlay: (state, action) => {
      state.currentAlbum = action.payload
    }
  }
})

export const {currentSong, list, random, repeat, listPlayed, clearListPlayed, index, albumPlay} = musicSlice.actions

export default musicSlice.reducer