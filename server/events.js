const getFormFields = require('../lib/get-form-fields.js')
const spotifyApi = require('./api')
const updateUi = require('./ui')

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

const onDeletePlaylist = function (name) {
  spotifyApi
    .deletePlaylist(name)
    .then(updateUi.onDeletePlaylistSuccess)
    .catch(updateUi.onDeletePlaylistFailure)
}

const onAddAlbumToPlaylist = function (name, id) {
  spotifyApi
    .addAlbumToPlaylist(name, id)
    .then(updateUi.onAddAlbumSuccess)
    .catch(updateUi.onAddAlbumFailure)
}

const onDeleteAlbumFromPlaylist = function (name, id) {
  spotifyApi
    .deleteAlbumFromPlaylist(name, id)
    .then(updateUi.onDeleteAlbumSuccess)
    .catch(updateUi.onDeleteAlbumFailure)
}

const onGetPlaylistData = function (name) {
  spotifyApi
    .getPlaylistData(name)
    .then(updateUi.onGetPlaylistSuccess)
    .catch(updateUi.onGetPlaylistFailure)
}

module.exports = {
  onGetData,
  onCreatePlaylist,
  onDeletePlaylist,
  onAddAlbumToPlaylist,
  onDeleteAlbumFromPlaylist,
  onGetPlaylistData
}