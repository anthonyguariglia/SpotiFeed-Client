/* eslint-disable indent */
/* eslint-disable no-tabs */
'use strict'
const getFormFields = require('../lib/get-form-fields.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')
const $ = require('jquery')
const spotifyEvents = require('../server/events')

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const authData = getFormFields(form)

  authApi
    .signUp(authData)
    .then(authUi.onSignUpSuccess)
    .catch(authUi.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()

  const form = event.target
  const authData = getFormFields(form)

  authApi
    .signIn(authData)
    .then(authUi.onSignInSuccess)
    .catch(authUi.onSignInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  authApi.signOut()
    .then(authUi.onSignOutSuccess)
    .catch(authUi.onSignOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()

	const form = event.target
	const authData = getFormFields(form)

	authApi
		.changePassword(authData)
		.then(authUi.onChangePasswordSuccess)
    .then(onSignInButton)
		.catch(authUi.onChangePasswordFailure)
}

const onSignUpButton = function (event) {
  event.preventDefault()
  $('.modal-title').html('Sign Up')
  $('#sign-up-form').html('')
  $('.modal-body')
    .html(`<p class="signin-response-message d-flex justify-content-center"></p>
    <form id="sign-up-form" class="d-flex justify-content-center align-items-center flex-wrap">
                <input type="email" name="email" placeholder="john@appleseed.com" class="input-group-lg input-sign-in m-1 p-1">
                <input type="password" name="password" placeholder="password" class="input-group-lg input-sign-in m-1 p-1">
                <input type="password" name="confirm_password" placeholder="confirm password" class="input-group-lg input-sign-in m-1 p-1">
                <button type="submit" class="sign-in-button btn btn-success btn-sm m-1 p-1">Submit</button>
              </form>
              <br>
              <div class="d-grid gap-2 col-8 mx-auto">
                <button class="sign-in-button-return btn btn-dark col p-1">Back to Sign In</button>
              </div>`)
  $('#sign-up-form').on('submit', onSignUp)
  $('.sign-in-button-return').on('click', onSignInButton)
}

const onSignInButton = function (event) {
  event.preventDefault()
  $('.modal-title').html('Sign In')
  $('.modal-body').html('')
  $('.modal-body')
    .html(`<p class="signin-response-message d-flex justify-content-center"></p>
    <div class="d-grid gap-2 col-8 mx-auto">
                <div id="loginSpotify"><button class="loginSpotify">Log In with Spotify!</button></div>
              </div>
    <form id="sign-in-form" class="d-flex justify-content-center align-items-center">
                <input type="email" name="email" placeholder="john@appleseed.com" class="input-group-lg input-sign-in mx-1 p-1">
                <input type="password" name="password" placeholder="password" class="input-group-lg input-sign-in mx-1 p-1">
                <button type="submit" class="sign-in-button btn btn-success btn-sm mx-1 p-1">Submit</button>
              </form>
              <form id="sign-out-form">
                <div class="d-grid gap-2 col-8 mx-auto">
                  <button type="submit" class="sign-out-button btn btn-success btn-sm col p-1">Sign Out</button>
                </div>
              </form>
              <br>
              <div class="d-grid gap-2 col-8 mx-auto">
                  <button class="sign-up-button btn btn-dark col p-1">Don't have an account? Sign up here!</button>
                  
                  <div class="col"></div>
              </div>`)
  $('.loginSpotify').css('display', 'none')
  $('#sign-in-form').on('submit', onSignIn)
  $('#change-pw-form').on('submit', onChangePassword)
  $('.sign-up-button').on('click', onSignUpButton)
  $('.sign-out-button').on('click', onSignOut)
  $('.loginSpotify').on('click', spotifyEvents.onLoginSpotify)
  $('.forgot-pw').on('click', onChangePasswordButton)
}

const onChangePasswordButton = function (event) {
  $('.modal-title').html('Change Password')
  $('.modal-body').html('')
  $('#loginSpotify').hide()
  $('.modal-body')
		.html(`<p class="signin-response-message d-flex justify-content-center"></p>
    <form id="change-pw-form" class="d-block justify-content-center align-items-center">
                <input type="email" name="email" placeholder="john@appleseed.com" class="input-group-lg input-sign-in mx-1 my-3 p-1">
                <input type="password" name="password" placeholder="old password" class="input-group-lg input-sign-in mx-1 p-1">
                <input type="password" name="new_password" placeholder="new password" class="input-group-lg input-sign-in mx-1 p-1">
                <input type="password" name="confirm_new_password" placeholder="confirm password" class="input-group-lg input-sign-in mx-1 p-1">
                <button type="submit" class="sign-in-button btn btn-success btn-sm mx-1 p-1">Submit</button>
              </form>
              <br>
              <div class="d-grid gap-2 col-8 mx-auto">
                <button class="go-back-button btn btn-dark col p-1">Back</button>
              </div>`)
  $('#change-pw-form').on('submit', onChangePassword)
  $('.go-back-button').on('click', onGoBackButton)
}

const onGoBackButton = function () {
  $('.modal-title').html('Log Out')

  $('.modal-body').html(`
    <p class="signin-response-message d-flex justify-content-center"></p>
      <div class="d-grid gap-2 col-8 mx-auto">
        <div id="loginSpotify"><button class="loginSpotify">Log In with Spotify!</button></div>
      </div>
      <form id="sign-in-form" class="d-flex justify-content-center align-items-center">
        <input type="email" name="email" placeholder="john@appleseed.com"
          class="input-group-lg input-sign-in mx-1 p-1">
        <input type="password" name="password" placeholder="password"
          class="input-group-lg input-sign-in mx-1 p-1">
        <button type="submit" class="sign-in-button btn btn-success btn-sm mx-1 p-1">Submit</button>
      </form>
    <form id="sign-out-form">
      <div class="d-grid gap-2 col-8 mx-auto">
        <button type="submit" class="sign-out-button btn btn-success col p-1">Sign Out</button>
      </div>
    </form>
    <br>
    <div class="d-grid gap-2 col-8 mx-auto">
      <button class="sign-up-button btn btn-dark col p-1">Don't have an account? Sign up here!</button>
      <a href="#" class="forgot-pw mx-auto">Change Password</a>
      <div class="col"></div>
    </div>`)
	$('.signin-response-message').css('color', 'black')
  $('.input-sign-in').css('display', 'none')
	$('.sign-in-button').css('display', 'none')
	$('.sign-up-button').css('display', 'none')
  $('#sign-out-form').css('display', 'unset')
  $('#sign-in-form').on('submit', onSignIn)
	$('#change-pw-form').on('submit', onChangePassword)
	$('.sign-up-button').on('click', onSignUpButton)
	$('.sign-out-button').on('click', onSignOut)
	$('.loginSpotify').on('click', spotifyEvents.onLoginSpotify)
  $('.sign-out-button').on('click', onSignOut)
  $('.forgot-pw').on('click', onChangePasswordButton)
	$('form').trigger('reset')
}

module.exports = {
	onSignUp,
	onSignIn,
	onSignOut,
	onChangePassword,
	onSignInButton,
	onSignUpButton,
	onChangePasswordButton,
	onGoBackButton
}
