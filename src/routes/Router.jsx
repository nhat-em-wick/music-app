import React from 'react'
import { BrowserRouter ,Routes, Route, Navigate } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Discover from '../pages/discover/Discover'
import User from '../pages/user/User'
import Popular from '../pages/popular/Popular'
import Radio from '../pages/radio/Radio'
import Playlists from '../pages/playlists/Playlists'
import Favorite from '../pages/favorite/Favorite'
import Stream from '../pages/stream/Stream'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Discover/>}/>
          <Route path='ca-nhan' element={<User/>}/> 
          <Route path='pho-bien' element={<Popular/>}/> 
          <Route path='radio' element={<Radio/>}/>
          <Route path='truc-tiep' element={<Stream/>}/>
          <Route path='danh-sach-phat' element={<Playlists/>}/> 
          <Route path='yeu-thich' element={<Favorite/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router