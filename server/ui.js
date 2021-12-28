/* eslint-disable indent */
/* eslint-disable no-tabs */
// const store = require('../app/store')
const $ = require('jquery')
const store = require('../app/store')
// const { onGetPlaylists } = require('./events')
// const spotifyApi = require('./api')
// const { apiUrl } = require('../app/config')

// const onLoginSpotifySuccess = function () {
//   spotifyEvents.onGetData()
// }

const onLoginSpotifySuccess = function (response) {
  const loginData = window.open(response.redirectUrl)
  console.log(loginData.Window.closed)
  $('#loginSpotify').html('')
}

const onLoginSpotifyFailure = function () {
  console.log('failed to redirect to spotify login')
}

const onGetDataSuccess = function (response) {
  console.log(store.user.playlists)
  store.user.refreshData = response
  const refreshData = response
  // console.log(refreshData[0].images[1].url)
  $('.playlist-name').text('Most Recent Tracks')
  $('.back-button').css('display', 'none')
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
    // console.log(store.user.playlists)
    playlists[0].forEach((playlist) => {
      // console.log(playlist)
      playlistHTML.push(
				`<li><a class="dropdown-item" id="${playlist.name}-${album.id}">${playlist.name}</a></li>`
      )
    })
    // console.log(playlistHTML)
    if (playlistHTML.length > 1) {
      playlistHTMLFixed = playlistHTML.join('')
    } else {
      playlistHTMLFixed = playlistHTML
    }
    // console.log(playlistHTMLFixed)
    const albumName = album.name
    const name =
			albumName.length >= 50 ? albumName.slice(0, 50) + ' ...' : albumName

    $('.recent-uploads').append(
      $('.recent-uploads'),
			`<section class="album-upload">
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
  }
}

const onGetDataFailure = function () {
  // const errorMessage = ('Failed to get recent data')
}

const onCreatePlaylistSuccess = function (response) {
  // populate playlist on sidebar
  console.log(response)
  if (response) {
    store.user.playlists.push({
      albums: [],
      name: response
    })
    const playlistName = trackify(response)
    $('.playlist-list').append(
			`<li class="playlists"><p class="playlist-text" >${response}</p><i class="far fa-trash-alt trash" id="${playlistName}"></i></li>`
		)
  }
}

const onCreatePlaylistFailure = function () {
  // add error handling
}

const onDeletePlaylistSuccess = function (response) {
  // remove playlist from sidebar
  console.log('deleted playlist: ', response)
  const playlistName = trackify(response)
  $(`#${playlistName}`).parent().remove()
}

const onDeletePlaylistFailure = function () {
  // add error handling
  console.log('failed to delete playlist')
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
  console.log('deleted album response: ', response)
  const playlistAlbum = response
  console.log('playlist album: ', playlistAlbum)
  const playlistName = trackify(playlistAlbum.split('-')[0])
  let trackName
  if (playlistAlbum.split('-').length === 3) {
    trackName = trackify(playlistAlbum.split('-')[1] + '\u002D' +
playlistAlbum.split('-')[2])
  } else {
   trackName = trackify(playlistAlbum.split('-')[1])
  }
  console.log(`.${playlistName}-${trackName}`)
  $(`.${playlistName}-${trackName}`).fadeOut(500)
  // spotifyApi
  //   .getPlaylistData(playlistName)
  //   .then(onGetPlaylistDataSuccess)
  //   .catch(onGetPlaylistDataFailure)
}

const onDeleteAlbumFailure = function () {
  // add error handling
}

const trackify = function (track) {
  return track
		.split(' ')
		.join('_')
		.replace('(', '')
		.replace(')', '')
		.replace('[', '')
		.replace(']', '')
		.replace('.', '')
		.replace(',', '')
    .replace("'", '')
		.replace('$', '')
		.replace('+', '')
    .replace('&', '')
}

const onGetPlaylistDataSuccess = function (response) {
  // update playlistHTML
  console.log('playlist data', response)
  window.scrollTo(0, 0)
  if (response) {
    const albums = response.albums

    console.log(albums)

    $('.recent-uploads').html('')
    albums.forEach(async (album) => {
      const data = await generateDateArtistsPlaylists(album)
      const differenceInDays = data[0]
      const artists = data[1]
      // const playlistHTMLFixed = data[2]
      const playlistName = trackify(response.name)
      const trackName = trackify(album.name)
      const albumName = album.name
      const name = albumName.length >= 50 ? albumName.slice(0, 50) + ' ...' : albumName
      $('.playlist-name').html(`${response.name}`)
      $('.back-button').html('<i class="fas fa-arrow-left left-arrow"></i>')
      $('.back-button').css('display', 'unset')
      $('.back-button').on('click', onBackButton)
      $('.recent-uploads').append(
        $('.recent-uploads'),
				`<section class="album-upload ${playlistName}-${trackName}">
              <img src="${album.images[1].url}" alt="" class="album-art">
              <section class="album-title">${name}</section>
              <div class="remove-from-playlist">
                <section type="button" id="${response.name}-${albumName}">Remove from Playlist
                </section>
              </div>
              <section class="album-artists">
                <span>${artists}</span>
              </section>
              <section class="release-date">${differenceInDays} days ago</section>
            </section>`
      )
    })
  }
}

const onBackButton = function () {
  const refreshData = store.user.refreshData
  // console.log(refreshData[0].images[1].url)
  window.scrollTo(0, store.user.scrollY)
  $('.playlist-name').text('Most Recent Tracks')
  $('.back-button').css('display', 'none')
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
    // console.log(store.user.playlists)
    playlists[0].forEach((playlist) => {
      playlistHTML.push(
				`<li><a class="dropdown-item" id="${playlist.name}-${album.id}">${playlist.name}</a></li>`
      )
    })
    // console.log(playlistHTML)
    if (playlistHTML.length > 1) {
      playlistHTMLFixed = playlistHTML.join('')
    } else {
      playlistHTMLFixed = playlistHTML
    }
    // console.log(playlistHTMLFixed)
    const albumName = album.name
    const name =
			albumName.length >= 50 ? albumName.slice(0, 50) + ' ...' : albumName

    $('.recent-uploads').append(
      $('.recent-uploads'),
			`<section class="album-upload">
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
  }
}

const onGetPlaylistDataFailure = function () {
  // add error handling
}

const onGetPlaylistsSuccess = function (response) {
  const playlists = response
  // console.log(playlists)
  $('.playlist-list').html('')
  playlists.forEach(playlist => {
    // console.log(playlist)
    store.user.playlists.push(playlist)
    // store.user.playlists.id = playlist._id
    $('.playlist-list').append(`<li class="playlists"><p class="playlist-text" type="button">${playlist.name}</p><i id="${playlist.name}" class="far fa-trash-alt trash"></i></li>`
    )
    // $('.trash').on('click', () => {
    //   return $.ajax({
    //     method: 'DELETE',
    //     url: apiUrl + '/user/playlists/' + response,
    //     headers: {
    //       secret_token: store.user.token
    //     }
    //   }).then((response) => onDeletePlaylistSuccess(response))
    // })
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
	onLoginSpotifySuccess,
	onLoginSpotifyFailure,
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
