const express = require('express')
const Nuxt = require('nuxt').Nuxt
const Builder = require('nuxt').Builder
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const helmet = require('helmet')

const app = express()

const api = require('./api')
const auth = require('./api/auth')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

app.disable('x-powered-by')
app.set('port', port)
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(cookieParser())
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}))
app.use(auth.passport.initialize())
app.use(auth.passport.session())

app.get('/admin', auth.passport.authenticate('provider', { successRedirect: '/admin/dashboard' }))
app.get('/admin/callback', auth.passport.authenticate('provider', {failureRedirect: '/admin' }), function (req, res) { res.redirect('/'); })
app.get('/', (req, res) => {res.redirect('/ru')})    
    
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