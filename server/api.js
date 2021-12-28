// const store = require('../app/store')
const { apiUrl } = require('../app/config')
const store = require('../app/store')
const $ = require('jquery')

const loginSpotify = function () {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/loginSpotify',
    type: 'jsonp',
    crossDomain: true,
    headers: {
      method: 'GET, OPTIONS',
      'Access-Control-Allow-Origin': 'http://localhost:7165'
    }
  })
}

const getData = function () {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/get-data'
  })
}

const createPlaylist = function (name) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/user/playlists/' + name,
    headers: {
      secret_token: store.user.token
    }
  })
}

const deletePlaylist = function (name) {
  return $.ajax({
    method: 'DELETE',
    url: apiUrl + '/user/playlists/' + name,
    headers: {
      secret_token: store.user.token
    }
  })
}

const addAlbumToPlaylist = function (name, id) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/user/playlists/' + name + '/albums/' + id,
    headers: {
      secret_token: store.user.token
    }
  })
}

const deleteAlbumFromPlaylist = function (name, id) {
  return $.ajax({
    method: 'PATCH',
    url: apiUrl + '/user/playlists/' + name + '/albums/' + id,
    headers: {
      secret_token: store.user.token
    }
  })
}

const getPlaylistData = function (name) {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/user/playlists/' + name,
    headers: {
      secret_token: store.user.token
    }
  })
}

const getPlaylists = function (name) {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/user/playlists',
    headers: {
      secret_token: store.user.token
    }
  })
}

const getArtists = function (name) {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/user/artists',
    headers: {
      secret_token: store.user.token
    }
  })
}

module.exports = {
  loginSpotify,
  getData,
  createPlaylist,
  addAlbumToPlaylist,
  deletePlaylist,
  deleteAlbumFromPlaylist,
  getPlaylistData,
  getPlaylists,
  getArtists
}
