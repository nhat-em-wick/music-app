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
    singer: 'Mr.Siro'
  },
  {
    id: 2,
    name: 'Càng níu giữ càng dễ mất',
    src: cangNiu,
    singer: 'Mr.Siro'
  },
  {
    id: 3,
    name: 'Nguyện làm tri kỷ',
    src: triki,
    singer: 'Mr.Siro'
  },
  {
    id: 4,
    name: 'Lặng lẽ tổn thương',
    src: langLe,
    singer: 'Mr.Siro'
  },
  {
    id: 5,
    name: 'Mashup',
    src: mashup,
    singer: 'Mr.Siro'
  }
]