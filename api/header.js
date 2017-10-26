const Router = require('express').Router
const multer = require('multer')
const fs = require('fs')

const router = Router()

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'static/images')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})

let upload = multer({ storage: storage }).single('image')

/* Header API */

router.get('/content/header', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header data.')
    } else {
      let result = JSON.parse(data)
      result = result.header
      res.status(200).json(result)
    }
  })
})

router.post('/content/header', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header data.')
    } else {
      let result = JSON.parse(data)
      result.header = req.body
      fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file content.json header data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

// Get logotype

router.get('/content/header/logotype', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
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
      result = result.logotype
      res.status(200).json(result)
    }
  })
})

// Post logotype

router.post('/content/header/logotype', function (req, res) {
  upload(req, res, (err) => {
    if (err) throw err
    let filename = req.file.originalname
    fs.readFile('static/common/content.json', 'utf8', (err, data) => {
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
        result.logotype = filename
        fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf-8', (err, data) => {
          if (err) {
            console.log(err)
            let date = new Date()
            fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
              if (err) {
                console.error(err)
              }
            })
            res.status(503).send('Could not write to file content.json header logotype data.')
          } else {
            res.status(200).send({'status': 200})
          }
        })
      }
    })
  })
})

// Get title

router.get('/content/header/title', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header title data.')
    } else {
      let result = JSON.parse(data)
      result = result.header.title
      res.status(200).json(result)
    }
  })
})

// Post title

router.post('/content/header/title', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header date data.')
    } else {
      let result = JSON.parse(data)
      result.header.title = req.body
      fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file content.json header title data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

// Get date

router.get('/content/header/date', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header date data.')
    } else {
      let result = JSON.parse(data)
      result = result.header.date
      res.status(200).json(result)
    }
  })
})

// Post date

router.post('/content/header/date', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header date data.')
    } else {
      let result = JSON.parse(data)
      result.header.date = req.body
      fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file content.json header date data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

// Get venue

router.get('/content/header/venue', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header venue data.')
    } else {
      let result = JSON.parse(data)
      result = result.header.venue
      res.status(200).json(result)
    }
  })
})

// Post venue

router.post('/content/header/venue', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch header venue data.')
    } else {
      let result = JSON.parse(data)
      result.header.venue = req.body
      fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file content.json header venue data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

/* Footer API */

module.exports = router