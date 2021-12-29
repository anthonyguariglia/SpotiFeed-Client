'use strict'
// const Modal = require('bootstrap').Modal
// const myModal = new Modal($('#exampleModal'))
const $ = require('jquery')
const store = require('../app/store')
const spotifyEvents = require('../server/events.js')
const Modal = require('bootstrap').Modal
const myModal = new Modal($('#exampleModal'))
// const updateUi = require('../server/ui')

const onSignUpSuccess = function () {
  $('.signin-response-message').text('Successfully Signed Up')
  $('form').trigger('reset')
}

const onSignUpFailure = function () {
  $('.signin-response-message').text('Failed to Sign Up')
}

const onSignInSuccess = function (response) {
  $('#exampleModal' > '.signin-response-message').text('Successfully Signed In')
  $('.signin-response-message').css('color', 'black')
  $('#loginSpotify').append('<button class="loginSpotify">Log In with Spotify!</button>')
  $('.loginSpotify').on('click', spotifyEvents.onLoginSpotify)
  $('form').trigger('reset')

  $('.input-sign-in').css('display', 'none')
  $('.sign-in-button').css('display', 'none')
  $('#sign-out-form').css('display', 'unset')
  $('.sign-out-button').css('display', 'block')
  $('.sign-up-button').css('display', 'none')
  $('.forgot-pw').hide()
  $('.login').text('Log Out')
  console.log(response.redirectUrl)
  // $('.modal-body').html(response.html)
  store.user.token = response.token
  console.log(response.token)
  spotifyEvents.onGetPlaylists()
  spotifyEvents.onGetArtists()
}

const onSignInFailure = function () {
  $('.signin-response-message').text('Incorrect Username or Password')
  $('.signin-response-message').css('color', 'red')
}

const onSignOutSuccess = function () {
  $('.signin-response-message').text('Successfully Signed Out')
  $('.signin-response-message').css('color', 'black')
  store.user = {
    token: '',
    playlists: [],
    refreshData: [],
    scrollY: 0
  }
  $('.playlist-list').html('')
  $('.recent-uploads').html('')
  $('.input-sign-in').css('display', 'unset')
  $('.sign-in-button').css('display', 'unset')
  $('.sign-up-button').css('display', 'unset')
  $('.sign-out-button').css('display', 'none')
  $('.loginSpotify').css('display', 'none')
  $('.forgot-pw').show()
  $('.login').text('Log In')

  myModal.toggle()
  $('.signin-response-message').text('')
}

const onChangePasswordSuccess = function () {
  $('.signin-response-message').text('Password Changed Successfully')
  $('.signin-response-message').css('color', 'black')
}

const onChangePasswordFailure = function () {

}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
