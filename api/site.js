const Router = require('express').Router
const fs = require('fs')

const router = Router()

router.get('/site/languages', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file site.json and fetch languages data.')
    } else {
      let result = JSON.parse(data)
      result = result.languages
      res.status(200).json(result)
    }
  })
})

router.post('/site/languages', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file site.json and fetch languages data.')
    } else {
      let result = JSON.parse(data)
      result.languages.push(req.body)
      fs.writeFile('static/common/site.json', JSON.stringify(result), 'utf8', (err, data) => {
        if (err) {
          console.log(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file site.json languages data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

router.get('/site/meta', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file site.json and fetch meta data.')
    } else {
      let result = JSON.parse(data)
      result = result.settings.seo
      res.status(200).json(result)
    }
  })
})

router.post('/site/meta', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file site.json and fetch meta data.')
    } else {
      let result = JSON.parse(data)
      result.settings.seo = req.body
      fs.writeFile('static/common/site.json', JSON.stringify(result), 'utf8', (err, data) => {
        if (err) {
          console.log(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file site.json meta data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

router.get('/site/colors', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file site.json and fetch colors data.')
    } else {
      let result = JSON.parse(data)
      result = result.settings.colors
      res.status(200).json(result)
    }
  })
})

router.post('/site/colors', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file site.json and fetch colors data.')
    } else {
      let result = JSON.parse(data)
      result.settings.colors = req.body
      fs.writeFile('static/common/site.json', JSON.stringify(result), 'utf8', (err, data) => {
        if (err) {
          console.log(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file site.json colors data.')
        } else {
          let content = '.primary-text{color:' + req.body.main + ';}.secondary-text{color:' + req.body.secondary + ';}'
          fs.writeFile('assets/css/colors.css', content, 'utf8', (err, data) => {
            if (err) {
              console.log(err)
              let date = new Date()
              fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
                if (err) {
                  console.error(err)
                }
              })
              res.status(503).send('Could not write to file colors.css colors data.')
            } else {
              res.status(200).send({'status': 200})
            }
          })
        }
      })
    }
  })
})

router.get('/site/counters', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file site.json and fetch counters data.')
    } else {
      let result = JSON.parse(data)
      result = result.counters
      res.status(200).json(result)
    }
  })
})

router.post('/site/counters', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file site.json and fetch colors data.')
    } else {
      let result = JSON.parse(data)
      result.counters = req.body
      fs.writeFile('static/common/site.json', JSON.stringify(result), 'utf8', (err, data) => {
        if (err) {
          console.log(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file site.json colors data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

module.exports = router