const express = require('express')
// const BearerStrategy = require('passport-azure-ad').BearerStrategy
const Nuxt = require('nuxt').Nuxt
const Builder = require('nuxt').Builder
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const passport = require('passport');                                 // npm install passport --save
const oauthStrategy = require('passport-azure-ad-oauth2').Strategy;   // npm install passport-azure-ad-oauth2 --save
const Router = require('express').Router
const router = Router()
// const util = require ('util')
// const bunyan = require('bunyan')

// const OIDCStrategy = require('passport-azure-ad').OIDCStrategy

// const azureConfig = require('./config')
const api = require('./api')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

/* let log = bunyan.createLogger({
  name: 'ITE VTF CMS Web Application'
}) */

/* passport.serializeUser(function (user, done) {
  done(null, user.email)
})

passport.deserializeUser(function (id, done) {
  findByEmail(id, function (err, user) {
    done(err, user)
  })
}) */

/* let findByEmail = function (email, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    let user = users[i]
    log.info('User: ', user)
    if (user.email === email) {
      return fn(null, user)
    }
  }
  return fn(null, null)
} */

/* passport.use(new OAuth2Strategy({
  clientID: 'f8a798d8-2314-425e-80d7-5086efb1ae95',
  clientSecret: 'wK/gWhw1krUaEOdcXpfaUUfjwwmixGxB8Cdjlhy3ISY=',
  callbackURL: 'https://ite-dev-vtf.azurewebsites.net/.auth/login/aad/callback'
}, function (accessToken, refresh_token, params, profile, done) {
    let context = profile
    done(null, context)
  }
)) */

/* passport.use(new OIDCStrategy({
  callbackUrl: config.creds.returnUrl,
  realm: config.creds.realm,
  clientID: config.creds.clientID,
  clientSecret: config.creds.clientSecret,
  oidcIssuer: config.creds.issuer,
  identityMetadata: config.creds.identityMetadata,
  skipUserProfile: config.cred.skipUserProfile,
  responseType: config.cred.responseType,
  responseMode: config.cred.responseMode
}, function (iis, sub, profile, accessToken, refreshToken, done) {
  if (!profile.email) {
    return done(new Error('No email found!', null))
  }
  process.nextTick(function () {
    findByEmail(profile.email, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        users.push(profile)
        return done(null, profile)
      }
      return done(null, user)
    })
  })
})) */

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

const app = express()

let $users = {}

let azureOAuth = 'azure_ad_oauth2'    
config.clientID = "f8a798d8-2314-425e-80d7-5086efb1ae95"
config.clientSecret = "wK/gWhw1krUaEOdcXpfaUUfjwwmixGxB8Cdjlhy3ISY="
config.callbackURL = "https://ite-dev-vtf.azurewebsites.net/.auth/login/aad/callback"

let strategy = new oauthStrategy({
  clientID: config.clientID,              // app id
  clientSecret: config.clientSecret,      // your app key                     
  callbackURL: config.callbackURL,        // add the return url with a route to handle                                         
}, function (accessToken, refresh_token, params, profile, done) {
  // decodes the token and sends the information to the user profile handler                        
  let context = profile                                             
  done(null, context)
})

// Azure resource you're requesting access
// prevents the Resource identifier is not provided error
strategy.tokenParams = function (options) {
  return { resource: 'https://graph.windows.net' }
}

// user profile handler to parse the data and create the user profile
strategy.userProfile = function(accessToken, done) {       
  let profile = {};
  try {
    let tokenBase64 = accessToken.split('.')[1]
    let tokenBinary = new Buffer(tokenBase64, 'base64')
    let tokenAscii = tokenBinary.toString('ascii')
    let tokenObj = JSON.parse(tokenAscii)

    // custom user profile
    profile.id = tokenObj.upn
    profile.email = tokenObj.upn  // upn is the email on AD
    profile.displayname = tokenObj.given_name + ' ' + tokenObj.family_name
    console.log('user profile', profile)
    done(null, profile)
  } catch (ex) {
    console.log("Unable to parse oauth2 token from AAD.")
    done(ex, null)
  }
}

// writes to local session
passport.serializeUser(function (user, done) {  
  $users[user.id] = user
  done(null, user.id)
})

// gets from local session
passport.deserializeUser(function (id, done) {   
  let user = $users[id]
  done(null, user)
})

// passport authorization filter
passport.authorize = function authorize (req, res, next) {
  let auth = req.isAuthenticated()
  
  if (req.isAuthenticated() || req.user) {
    return next()
  }

  // authenticate the user
  passport.login()(req, res, next)
}

// login extension method to validate the login state
passport.login = function () {
  return passport.authenticate(azureOAuth, { failureRedirect:'/', failureFlash:true })
}

// initialize passport with session support
app.use(passport.initialize())
app.use(passport.session())

// set the passport strategy to use
passport.use(strategy)

app.set('port', port)
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}))
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/api', api)


app.use('/login', passport.authorize)
app.get('https://ite-dev-vtf.azurewebsites.net/.auth/login/aad/callback', passport.login(), function(req, res) {
  login(req, res)
})

app.get('/login', login)

function login (req, res) {
  res.redirect('/')
}

// Give nuxt middleware to express
app.use(nuxt.render)

/* const options = {
  identityMetadata: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration/",
  clientID: "f8a798d8-2314-425e-80d7-5086efb1ae95",
  validateIssuer: false,
  loggingLevel: 'warn',
  passReqToCallback: false
};

if (options.clientID === 'f8a798d8-2314-425e-80d7-5086efb1ae95') {
  console.error("Please update 'options' with the client id (application id) of your application")
  console.log(host)
  console.log(port)
}

let bearerStrategy = new BearerStrategy(options, function (token, done) {
  done(null, {}, token)
}) */

// passport.use(bearerStrategy);

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port)