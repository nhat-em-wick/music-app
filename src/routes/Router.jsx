import React, {useEffect} from 'react'
import { BrowserRouter ,Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Discover from '../pages/discover/Discover'
import User from '../pages/user/User'
import ZingChart from '../pages/zing-chart/ZingChart'
import NewRelease from '../pages/new-release/NewRelease'
import Playlists from '../pages/playlists/Playlists'
import Favorite from '../pages/favorite/Favorite'
import Stream from '../pages/stream/Stream'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Albums from '../pages/albums/Albums'
import DetailAlbum from '../pages/detail-album/DetailAlbum'
import Search from '../pages/search/Search'
import SearchAll from '../pages/search/SearchAll'
import SearchSongs from '../pages/search/SearchSongs'
import SearchAlbum from '../pages/search/SearchAlbum'
import DetailSong from '../pages/detail-song/DetailSong'
import Page404 from '../pages/404/404'
const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Discover/>}/>
          <Route  path='ca-nhan' element={<User/>}/> 
          <Route path='zing-chart' element={<ZingChart/>}/> 
          <Route path='moi-phat-hanh' element={<NewRelease/>}/>
          <Route path='truc-tiep' element={<Stream/>}/>
          <Route path='danh-sach-phat' element={<Playlists/>}/> 
          <Route path='yeu-thich' element={<Favorite/>}/> 
          <Route path='album' element={<Albums/>}></Route> 
          <Route path='/album/:albumId' element={<DetailAlbum/>}/> 
          <Route path='/bai-hat/:songId' element={<DetailSong/>}/>
          <Route path='tim-kiem' element={<Search/>}>
            <Route path='tat-ca' element={<SearchAll/>}></Route>
            <Route path='bai-hat' element={<SearchSongs/>}></Route>
            <Route path='album' element={<SearchAlbum/>}></Route>
          </Route> 

          <Route path='dang-nhap' element={<Login/>}/>
          <Route path='dang-ki' element={<Register/>}/>
          <Route path='*' element={<Page404/>}/>
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