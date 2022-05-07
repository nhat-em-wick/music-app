import React, {useEffect} from 'react'
import { BrowserRouter ,Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Discover from '../pages/discover/Discover'
import User from '../pages/user/User'
import Popular from '../pages/popular/Popular'
import Radio from '../pages/radio/Radio'
import Playlists from '../pages/playlists/Playlists'
import Favorite from '../pages/favorite/Favorite'
import Stream from '../pages/stream/Stream'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Albums from '../pages/albums/Albums'
import DetailAlbum from '../pages/detail-album/DetailAlbum'
const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Discover/>}/>
          <Route  path='ca-nhan' element={<User/>}/> 
          <Route path='pho-bien' element={<Popular/>}/> 
          <Route path='radio' element={<Radio/>}/>
          <Route path='truc-tiep' element={<Stream/>}/>
          <Route path='danh-sach-phat' element={<Playlists/>}/> 
          <Route path='yeu-thich' element={<Favorite/>}/> 
          <Route path='albums' element={<Albums/>}></Route> 
          <Route path='/albums/:albumId' element={<DetailAlbum/>}/> 

          <Route path='dang-nhap' element={<Login/>}/>
          <Route path='dang-ki' element={<Register/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const ScrollToTop = () => {

  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [pathname])

  return null
}

export default Router