const passport = require('passport');                                 // npm install passport --save
const oauthStrategy = require('passport-azure-ad-oauth2').Strategy;   // npm install passport-azure-ad-oauth2 --save

module.exports.init = function (app, $users, config) {
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
  
  return passport
}