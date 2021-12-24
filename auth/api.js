'use strict'
const apiUrl = require('../app/config.js')
const store = require('../app/store.js')
const $ = require('jquery')

const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl.apiUrl + '/signup',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl.apiUrl + '/login',
    data
  })
}

const signOut = function (data) {
  return $.ajax({
    method: 'DELETE',
    url: apiUrl.apiUrl + '/user/logout',
    headers: {
      secret_token: store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut
}
