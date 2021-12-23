// const store = require('../app/store')
const $ = require('jquery')
const store = require('../app/store')
// const { onGetPlaylists } = require('./events')
// const spotifyEvents = require('./events')

// const onLoginSpotifySuccess = function () {
//   spotifyEvents.onGetData()
// }

const onGetDataSuccess = function (response) {
  console.log(response)
  const refreshData = response
  // console.log(refreshData[0].images[1].url)

  $('.recent-uploads').html('')
  for (const album of refreshData) {
    const today = new Date()
    const albumRelease = new Date(album.release_date)

    // console.log(today, albumRelease)
    const differenceInTime = today.getTime() - albumRelease.getTime()
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))
    // console.log(album.release_date)

    const artists = []
    for (let i = 0; i < album.artists.length; i++) {
      if (i === 0) {
        artists.push(album.artists[i].name)
      } else {
        artists.push(' ' + album.artists[i].name)
      }
    }

    // artists.join(', ')
    const playlistHTML = []
    const playlists = []
    let playlistHTMLFixed = []
    playlists.push(store.user.playlists)
    // console.log(playlists)
    playlists[0].forEach(playlist => {
      playlistHTML.push(`<li><a class="dropdown-item" id="${playlist.name}-${album.id}">${playlist.name}</a></li>`)
    })
    // console.log(playlistHTML)
    if (playlistHTML.length > 1) {
      playlistHTMLFixed = playlistHTML.join('')
    } else {
      playlistHTMLFixed = playlistHTML
    }
    // console.log(playlistHTMLFixed)
    const albumName = album.name
    const name = albumName.length >= 50 ? albumName.slice(0, 50) + ' ...' : albumName

    $('.recent-uploads').append($('.recent-uploads'), `<section class="album-upload">
          <img src="${album.images[1].url}" alt="" class="album-art">
          <section class="album-title">${name}</section>
          <div class="dropstart">
              <section class="dropdown-toggle add-to-playlist" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown"
                aria-expanded="false">
                Add to Playlist
            </section>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                ${playlistHTMLFixed.toString()}
              </ul>
            </div>
          <section class="album-artists">
            <span>${artists}</span>
          </section>
          <section class="release-date">${differenceInDays} days ago</section>
        </section>`)
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
  const albums = response.albums

  console.log(albums)

  $('.recent-uploads').html('')
  albums.forEach(async (album) => {
    const data = await generateDateArtistsPlaylists(album)
    const differenceInDays = data[0]
    const artists = data[1]
    const playlistHTMLFixed = data[2]

    const albumName = album.name
    const name = albumName.length >= 50 ? albumName.slice(0, 50) + ' ...' : albumName
    $('.playlist-name').html(`${response.name}`)
    $('.back-button').html('<i class="fas fa-angle-left"></i>')
    $('.recent-uploads').append($('.recent-uploads'), `<section class="album-upload">
          <img src="${album.images[1].url}" alt="" class="album-art">
          <section class="album-title">${name}</section>
          <div class="dropstart">
              <section class="dropdown-toggle add-to-playlist" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown"
                aria-expanded="false">
                Add to Playlist
            </section>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                ${playlistHTMLFixed.toString()}
              </ul>
            </div>
          <section class="album-artists">
            <span>${artists}</span>
          </section>
          <section class="release-date">${differenceInDays} days ago</section>
        </section>`
    )
  })
}

const onGetPlaylistDataFailure = function () {
  // add error handling
}

const onGetPlaylistsSuccess = function (response) {
  const playlists = response
  // console.log(playlists)
  playlists.forEach(playlist => {
    // console.log(playlist)
    store.user.playlists.push(playlist)
    // store.user.playlists.id = playlist._id
    $('.playlist-list').html('')
    $('.playlist-list').append(`<li id="${playlist.name}" class="playlists">${playlist.name}</li>`)
  })
}

const onGetPlaylistsFailure = function () {

}

const onGetArtistsSuccess = function (response) {
  const artists = response
  // console.log(artists)
  artists.forEach((artist) => {
    $('.artist-list').append(`<li class="playlists">${artist}</li>`)
  })
}

const onGetArtistsFailure = function () {

}

const generateDateArtistsPlaylists = (album) => {
  const today = new Date()
  const albumRelease = new Date(album.release_date)

  // console.log(today, albumRelease)
  const differenceInTime = today.getTime() - albumRelease.getTime()
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))
  // console.log(album.release_date)

  const artists = []
  for (let i = 0; i < album.artists.length; i++) {
    if (i === 0) {
      artists.push(album.artists[i].name)
    } else {
      artists.push(' ' + album.artists[i].name)
    }
  }

  // artists.join(', ')
  const playlistHTML = []
  const playlists = []
  const playlistHTMLFixed = []
  playlists.push(store.user.playlists)
  // console.log(playlists)
  playlists[0].forEach(playlist => {
    playlistHTML.push(`<li><a class="dropdown-item" id="${playlist.name}-${album.id}">${playlist.name}</a></li>`)
  })

  return [differenceInDays, artists, playlistHTMLFixed]
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
