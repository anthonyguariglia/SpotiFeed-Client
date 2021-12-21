// const store = require('../app/store')
const $ = require('jquery')

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
    $('.recent-uploads').append(
      $('.recent-uploads'), `<section class="album-upload">
          <img src="${album.images[1].url}" alt="" class="album-art">
          <section class="album-title">${album.name}</section>
          <section class="album-artists">
            <span>${album.artists[0].name}</span>
          </section>
          <section class="release-date">${differenceInDays} days ago</section>
        </section>`
    )
    // album.artists.forEach(artist => {
    //   $('.album-artists').append($('.album-artists'), `<span>${artist.name}</span>
    //     <span>, </span>`
    //   )
    // })

    // $('.release-date').innerText(`${differenceInDays} days ago`)
  }
}

const onGetDataFailure = function () {
  // const errorMessage = ('Failed to get recent data')
}

const onCreatePlaylistSuccess = function (response) {
  // populate playlist on sidebar
  console.log(response)
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

const onGetPlaylistSuccess = function (response) {
  // update playlistHTML
  console.log(response)
}

const onGetPlaylistFailure = function () {
  // add error handling
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
  onGetPlaylistSuccess,
  onGetPlaylistFailure
}
