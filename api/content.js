const Router = require('express').Router
const fs = require('fs')

const router = Router()

/* ---------------- CRUD content on pages ---------------- */

/* ---------------- Read content ---------------- */

router.get('/page/content', function (req, res, next) {
  fs.readFile('static/common/pages.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file pages.json and fetch pages content data.')
    } else {
      let result = JSON.parse(data)
      let id = req.body.id
      let page = result.pages.filter()
      result = result.pages
      res.status(200).json(result)
    }
  })
})

/* ---------------- Post content ---------------- */

router.post('/page/content', function (req, res, next) {
  
})

/* ---------------- Update content ---------------- */

router.put('/page/content', function (req, res, next) {
  
})

/* ---------------- End CRUD ---------------- */

module.exports = router
