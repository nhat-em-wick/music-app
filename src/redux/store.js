import { configureStore } from "@reduxjs/toolkit";

import audioReducer from "./audio/audioSlice";
import musicReducer from './music/musicSlice'

export const store =  configureStore ({
  reducer: {
    audio: audioReducer,
    music: musicReducer
  }
})

