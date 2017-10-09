const Router = require('express').Router
const fs = require('fs')

const router = Router()

router.get('/templates', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not open file site.json and fetch templates data.')
    } else {
      let result = JSON.parse(data)
      res.status(200).json(result.templates);
    }
  });
})

module.exports = router