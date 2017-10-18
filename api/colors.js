const Router = require('express').Router
const fs = require('fs')

const router = Router()

router.get('/colors', function (req, res, next) {
  fs.readFile('static/css/style.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header logotype data.')
    } else {
      let result = JSON.parse(data)
      res.json(result);
      res.status(200).json(result)
    }
  });
})

router.post('/colors', function (req, res) {
  fs.writeFile('static/css/style.json', JSON.stringify(req.body), 'utf8', (err, data) => {
    if (err) throw err
    res.send({'status': 200})
  });
})

module.exports = router