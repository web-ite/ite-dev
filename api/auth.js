'use strict'

/* jshint camelcase: false */

const AzureOAuth2Strategy = require('passport-azure-oauth2')
const jwt = require('jwt-simple')

function AzureOAuthStrategy () {
	this.passport = require('passport')
	
	this.passport.use("provider", new AzureOAuth2Strategy({
	  clientID: 'f8a798d8-2314-425e-80d7-5086efb1ae95',
	  clientSecret: 'wQhBbuWavj3QI2x1ZcK9efA1WEdQEsP5gEOAUeiaxXY=',
	  callbackURL: 'https://ite-dev-vtf.azurewebsites.net/.auth/login/aad/callback',
	  resource: 'http://ite-dev-vtf.azurewebsites.net',
	  tenant: '2727c6de-342b-49b9-a7fa-d7cc7afd58ec',
	  prompt: 'login',
	  state: false
	},
	function (accessToken, refreshtoken, params, profile, done) {
	  var user = jwt.decode(params.id_token, '', true)
	  done(null, user)
	}))

	this.passport.serializeUser(function (user, done) {
		// console.log('profile : ', user)
		done(null, user)
	})

	this.passport.deserializeUser(function (user, done) {
		// console.log('profile : ', user)
		done(null, user)
	})
}

module.exports = new AzureOAuthStrategy()