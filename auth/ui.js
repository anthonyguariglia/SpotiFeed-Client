'use strict'
// const Modal = require('bootstrap').Modal
// const myModal = new Modal($('#exampleModal'))
const $ = require('jquery')
const store = require('../app/store')
const spotifyEvents = require('../server/events.js')
// const updateUi = require('../server/ui')

const onSignUpSuccess = function () {
  $('.signin-response-message').text('Successfully Signed Up')
  $('form').trigger('reset')
}

const onSignUpFailure = function () {
  $('.signin-response-message').text('Failed to Sign Up')
}

const onSignInSuccess = function (response) {
  $('.signin-response-message').text('Successfully Signed In')
  $('.signin-response-message').css('color', 'black')
  $('.signin-response-message').append('<button class="loginSpotify btn btn-success">Log In with Spotify!</button>')
  $('.loginSpotify').on('click', spotifyEvents.onLoginSpotify)
  $('form').trigger('reset')
  store.user.token = response.token
  spotifyEvents.onGetPlaylists()
  spotifyEvents.onGetArtists()
}

const onSignInFailure = function () {
  $('.signin-response-message').text('Incorrect Username or Password')
  $('.signin-response-message').css('color', 'red')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure
}
