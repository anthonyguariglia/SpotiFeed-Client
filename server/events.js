/* eslint-disable no-tabs */
/* eslint-disable indent */
const getFormFields = require('../lib/get-form-fields.js')
const spotifyApi = require('./api')
const updateUi = require('./ui')
const $ = require('jquery')
const store = require('../app/store')

const onLoginSpotify = function () {
  spotifyApi
    .loginSpotify()
    .then(updateUi.onLoginSpotifySuccess)
    .catch(updateUi.onLoginSpoitifyFailure)
    // .then(onGetData())
}

const onGetData = function () {
  $('.recent-uploads').html(
		'<div class="loading-image"><img src="https://i.imgur.com/zhCrmFO.gif" alt="loading" style="height: 100px; margin: 75px 480px;"></div>'
	)
  spotifyApi
    .getData()
    .then(updateUi.onGetDataSuccess)
    .catch(updateUi.onGetDataFailure)
}

const onCreatePlaylist = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)
  const name = formData.name

  spotifyApi
    .createPlaylist(name)
    .then(updateUi.onCreatePlaylistSuccess)
    .catch(updateUi.onCreatePlaylistFailure)
}

const onDeletePlaylist = function (event) {
  const name = event.target.id.split('_').join(' ')
  spotifyApi
    .deletePlaylist(name)
    .then(updateUi.onDeletePlaylistSuccess)
    .catch(updateUi.onDeletePlaylistFailure)
}

const onAddAlbumToPlaylist = function (event) {
  event.preventDefault()
  // console.log(event.target.id)
  const playlistAlbum = event.target.id
  const playlistName = playlistAlbum.split('-')[0]
  const albumId = playlistAlbum.split('-')[1]
  // console.log(playlistName, albumId)
  spotifyApi
    .addAlbumToPlaylist(playlistName, albumId)
    .then(updateUi.onAddAlbumSuccess)
    .catch(updateUi.onAddAlbumFailure)
}

const onDeleteAlbumFromPlaylist = function (event) {
  // console.log(event.target)
  const playlistAlbum = event.target.id
  const playlistName = playlistAlbum.split('-')[0]
  let trackName
  if (playlistAlbum.split('-').length === 3) {
    trackName = playlistAlbum.split('-')[1] + '\u002D' + playlistAlbum.split('-')[2]
  } else {
    trackName = playlistAlbum.split('-')[1]
  }
  // console.log(playlistName, trackName)
  spotifyApi
    .deleteAlbumFromPlaylist(playlistName, trackName)
    .then(updateUi.onDeleteAlbumSuccess)
    .catch(updateUi.onDeleteAlbumFailure)
}

const onGetPlaylistData = function (event) {
  event.preventDefault()
  store.user.scrollY = window.scrollY
  // console.log('target of playlist: ', event.target)
  // console.log('parents of target', $(event.target).parents('.trash'))

  try {
    const siblings = $(event.target).siblings('.trash')
    const playlistName = siblings[0].id.split('_').join(' ')
    // console.log(playlistName)
    spotifyApi
      .getPlaylistData(playlistName)
      .then(updateUi.onGetPlaylistDataSuccess)
      .catch(updateUi.onGetPlaylistDataFailure)
  } catch {
    // console.log(error)
  }
}

const onGetPlaylists = function () {
  spotifyApi
    .getPlaylists()
    .then(updateUi.onGetPlaylistsSuccess)
    .catch(updateUi.onGetPlaylistsFailure)
}

const onGetArtists = function () {
  spotifyApi
    .getArtists()
    .then(updateUi.onGetArtistsSuccess)
    .catch(updateUi.onGetArtistsFailure)
}

module.exports = {
  onLoginSpotify,
  onGetData,
  onCreatePlaylist,
  onDeletePlaylist,
  onAddAlbumToPlaylist,
  onDeleteAlbumFromPlaylist,
  onGetPlaylistData,
  onGetPlaylists,
  onGetArtists
}
