const Router = require('express').Router

let colors = require('./colors')
let pages = require('./pages')
let languages = require('./languages')
let templates = require('./templates')
let site = require('./site')
let header = require('./header')
let footer = require('./footer')
let components = require('./_components')
let content = require('./content')
let services = require('./services')

const router = Router()

router.use(colors)
router.use(pages)
router.use(languages)
router.use(templates)
router.use(site)
router.use(header)
router.use(footer)
router.use(components)
router.use(content)
router.use(services)

module.exports = router
