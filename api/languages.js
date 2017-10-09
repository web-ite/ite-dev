const Router = require('express').Router
const fs = require('fs')

const router = Router()

router.get('/languages', function (req, res, next) {
  fs.readFile('static/common/languages.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file languages.json and fetch data.')
    } else {
      let result = JSON.parse(data)
      res.status(200).json(result);
    }
  });
})

router.post('/languages', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not open file site.json and fetch languages data.')
    } else {
      let result = JSON.parse(data)
      let languages = result.languages
      let newLanguage = req.body
      languages.push(newLanguage)
      result.languages = languages
      fs.writeFile('static/common/site.json', JSON.stringify(result), 'utf-8', (err, data) => {
        if (err) {
          console.error(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write languages data to file site.json.')
        } else res.status(200).send({'status': 200})
      })
    }
  })
})

module.exports = router