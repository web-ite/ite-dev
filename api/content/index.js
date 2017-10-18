const Router = require('express').Router

let header = require('./header')

const router = Router()

router.use(header)

module.exports = router