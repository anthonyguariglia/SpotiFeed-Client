// const store = require('../app/store')
const $ = require('jquery')
// const { onGetPlaylists } = require('./events')
// const spotifyEvents = require('./events')

// const onLoginSpotifySuccess = function () {
//   spotifyEvents.onGetData()
// }

const onGetDataSuccess = function (response) {
  console.log(response)
  const refreshData = response
  console.log(refreshData[0].images[1].url)

  for (const album of refreshData) {
    const today = new Date()
    const albumRelease = new Date(album.release_date)

    console.log(today, albumRelease)
    const differenceInTime = today.getTime() - albumRelease.getTime()
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))
    console.log(album.release_date)

    const artists = []
    for (let i = 0; i < album.artists.length; i++) {
      if (i === 0) {
        artists.push(album.artists[i].name)
      } else {
        artists.push(' ' + album.artists[i].name)
      }
    }

    // artists.join(', ')

    const albumName = album.name
    const name = albumName.length >= 50 ? albumName.slice(0, 50) + ' ...' : albumName

    $('.recent-uploads').append(
      $('.recent-uploads'), `<section class="album-upload">
          <img src="${album.images[1].url}" alt="" class="album-art">
          <section class="album-title">${name}</section>
          <section class="add-to-playlist">add to playlist</section>
          <section class="album-artists">
            <span>${artists}</span>
          </section>
          <section class="release-date">${differenceInDays} days ago</section>
        </section>`
    )
  }
}

const onGetDataFailure = function () {
  // const errorMessage = ('Failed to get recent data')
}

const onCreatePlaylistSuccess = function (response) {
  // populate playlist on sidebar
  console.log(response)
  $('.playlist-list').append(`<li class="playlists">${response}</li>`)
}

const onCreatePlaylistFailure = function () {
  // add error handling
}

const onDeletePlaylistSuccess = function (response) {
  // remove playlist from sidebar
  console.log(response)
}

const onDeletePlaylistFailure = function () {
  // add error handling
}

const onAddAlbumSuccess = function (response) {
  // populate playlist html with album - run a getPlaylistData?
  console.log(response)
}

const onAddAlbumFailure = function () {
  // add error handling
}

const onDeleteAlbumSuccess = function (response) {
  // remove playlist html - run a getPlaylistData?
  console.log(response)
}

const onDeleteAlbumFailure = function () {
  // add error handling
}

const onGetPlaylistDataSuccess = function (response) {
  // update playlistHTML
  console.log(response)
  const playlists = response[0].name
  console.log(playlists)
  playlists.forEach((playlist) => {
    $('.playlist-list').append(`<li class="playlists">${playlist}</li>`)
  })
}

const onGetPlaylistDataFailure = function () {
  // add error handling
}

const onGetPlaylistsSuccess = function (response) {
  const playlists = response
  console.log(playlists)
  playlists.forEach(playlist => {
    $('.playlist-list').append(`<li class="playlists">${playlist.name}</li>`)
  })
}

const onGetPlaylistsFailure = function () {

}

const onGetArtistsSuccess = function (response) {
  const artists = response
  console.log(artists)
  artists.forEach((artist) => {
    $('.artist-list').append(`<li class="playlists">${artist}</li>`)
  })
}

const onGetArtistsFailure = function () {

}

module.exports = {
  onGetDataSuccess,
  onGetDataFailure,
  onCreatePlaylistSuccess,
  onCreatePlaylistFailure,
  onDeletePlaylistSuccess,
  onDeletePlaylistFailure,
  onAddAlbumSuccess,
  onAddAlbumFailure,
  onDeleteAlbumSuccess,
  onDeleteAlbumFailure,
  onGetPlaylistDataSuccess,
  onGetPlaylistDataFailure,
  onGetPlaylistsSuccess,
  onGetPlaylistsFailure,
  onGetArtistsSuccess,
  onGetArtistsFailure
}
