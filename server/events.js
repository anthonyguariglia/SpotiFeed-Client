const getFormFields = require('../lib/get-form-fields.js')
const spotifyApi = require('./api')
const updateUi = require('./ui')

const onLoginSpotify = function () {
  spotifyApi
    .loginSpotify()
    // .then(onGetData())
}

const onGetData = function () {
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
  const name = event.target.id
  spotifyApi
    .deletePlaylist(name)
    .then(updateUi.onDeletePlaylistSuccess)
    .catch(updateUi.onDeletePlaylistFailure)
}

const onAddAlbumToPlaylist = function (event) {
  event.preventDefault()
  console.log(event.target.id)
  const playlistAlbum = event.target.id
  const playlistName = playlistAlbum.split('-')[0]
  const albumId = playlistAlbum.split('-')[1]
  console.log(playlistName, albumId)
  spotifyApi
    .addAlbumToPlaylist(playlistName, albumId)
    .then(updateUi.onAddAlbumSuccess)
    .catch(updateUi.onAddAlbumFailure)
}

const onDeleteAlbumFromPlaylist = function (name, id) {
  spotifyApi
    .deleteAlbumFromPlaylist(name, id)
    .then(updateUi.onDeleteAlbumSuccess)
    .catch(updateUi.onDeleteAlbumFailure)
}

const onGetPlaylistData = function (event) {
  event.preventDefault()
  const playlistName = event.target.id
  spotifyApi
    .getPlaylistData(playlistName)
    .then(updateUi.onGetPlaylistDataSuccess)
    .catch(updateUi.onGetPlaylistDataFailure)
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
