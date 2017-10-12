const Router = require('express').Router

let colors = require('./colors')
let pages = require('./pages')
let languages = require('./languages')
let templates = require('./templates')
let site = require('./site')
// let login = require('./login')

const router = Router()

// router.use(login)
router.use(colors)
router.use(pages)
router.use(languages)
router.use(templates)
router.use(site)

module.exports = router