import axiosClient from "./axiosClient";

const zingApi = {
  home: (params) => {
    const url = '/zing-mp3/home'
    return axiosClient.get(url)
  },
  getDetailPlaylist: (params) => {
    const url = '/zing-mp3/playlist'
    return axiosClient.get(url, {params})
  },
  getDetailSong: (params) => {
    const url = '/zing-mp3/info-song'
    return axiosClient.get(url, {params})
  },
  getSongStream: (params) => {
    const url = '/zing-mp3/song'
    return axiosClient.get(url, {params})
  },
  searchAll: (params) => {
    const url = '/zing-mp3/search/all'
    return axiosClient.get(url, {params})
  },
  searchComponent: (params) => {
    const url = '/zing-mp3/search/component'
    return axiosClient.get(url, {params})
  },
  chartHome: () => {
    const url = '/zing-mp3/zing-chart'
    return axiosClient.get(url)
  },
  newRelease: () => {
    const url = '/zing-mp3/new-release'
    return axiosClient.get(url)
  },
  getSectionBottom : (params) => {
    const url = '/zing-mp3/section-bottom'
    return axiosClient.get(url, {params})
  },
}

export default zingApi