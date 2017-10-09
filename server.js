const express = require('express')
const passport = require('passport')
const BearerStrategy = require('passport-azure-ad').BearerStrategy
const Nuxt = require('nuxt').Nuxt
const Builder = require('nuxt').Builder
const bodyParser = require('body-parser')

const api = require('./api')

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

const options = {
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
})


app.set('port', port)

app.use(passport.initialize());
app.use(passport.session());
passport.use(bearerStrategy);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api', api)

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

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port)