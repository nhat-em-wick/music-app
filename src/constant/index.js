import bucTranh from '../assets/songs/buc-tranh-tu-nuoc-mat.mp3'
import cangNiu from '../assets/songs/cang-niu-giu-cang-de-mat.mp3'
import triki from '../assets/songs/lam-tri-ki.mp3'
import langLe from '../assets/songs/lang-le-ton-thuong.mp3'
import mashup from '../assets/songs/mashup.mp3'


export const menuBrowse = [
  {
    display: 'Khám phá',
    path: '/',
    icon: 'bx bx-bullseye'
  },
  {
    display: "Cá nhân",
    path: 'ca-nhan',
    icon: 'bx bxs-user-circle'
  },
  {
    display: 'Phổ biến',
    path: 'pho-bien',
    icon: 'bx bx-filter'
  },
  {
    display: 'Radio',
    path: 'radio',
    icon: 'bx bxs-radio'
  }
]

export const menuLibrary = [
  {
    display: 'Trực tiếp',
    path: 'truc-tiep',
    icon: 'bx bx-headphone'
  },
  {
    display: 'danh sách phát',
    path: 'danh-sach-phat',
    icon: 'bx bxs-playlist'
  },
  {
    display: 'Yêu thích',
    path: 'yeu-thich',
    icon: 'bx bxs-heart'
  }
]


export const songs = [
  {
    id: 0,
    name: 'Bức tranh từ nước mắt',
    src: bucTranh,
    singer: 'Mr.Siro',
    thumb: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg'
  },
  {
    id: 2,
    name: 'Càng níu giữ càng dễ mất',
    src: cangNiu,
    singer: 'Mr.Siro',
    thumb: 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/e/1/1/2/e1120261421cfec7513423222b0ca94c.jpg'
  },
  {
    id: 3,
    name: 'Nguyện làm tri kỷ',
    src: triki,
    singer: 'Mr.Siro',
    thumb: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/3/d/3/23d3bfa1656027dcf914d9c3bae263eb.jpg'
  },
  {
    id: 4,
    name: 'Lặng lẽ tổn thương',
    src: langLe,
    singer: 'Mr.Siro',
    thumb: 'https://i1.sndcdn.com/artworks-000508422807-nvw1pt-t500x500.jpg'
  },
  {
    id: 5,
    name: 'Mashup',
    src: mashup,
    singer: 'Mr.Siro',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWMf3xv9blxwmQX93uIeW78GM98kFrnsnfcA&usqp=CAU'
  }
]