const Router = require('express').Router

let colors = require('./colors')
let pages = require('./pages')
let languages = require('./languages')
let templates = require('./templates')
let site = require('./site')
let header = require('./header')
let footer = require('./footer')

const router = Router()

router.use(colors)
router.use(pages)
router.use(languages)
router.use(templates)
router.use(site)
router.use(header)
router.use(footer)

module.exports = router