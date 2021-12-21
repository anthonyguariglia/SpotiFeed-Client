// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const spotifyEvents = require('../server/events')
const authEvents = require('../auth/events')

$(() => {
  $('.get-data').on('click', spotifyEvents.onGetData)
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('.sign-up-button').on('click', authEvents.onSignUpButton)
  $('.sign-out-button').on('click', authEvents.onSignOut)

  $('.new-playlist').on('submit', spotifyEvents.onCreatePlaylist)
  // your JS code goes here
})
