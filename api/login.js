const Router = require('express').Router
const auth = require('./auth')

const router = Router()

module.exports = function () {
  let $users = {}
  let passport = auth.init(router, $users, process.env)
  
  router.use('/login', passport.authorize)
  router.get('https://ite-dev-vtf.azurewebsites.net/.auth/login/aad/callback', passport.login(), function(req, res) {
    login(req, res)
  })
  
  router.get('/login', login)
  
  function login (req, res) {
    res.redirect('/')
  }
}