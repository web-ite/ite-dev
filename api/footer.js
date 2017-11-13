const Router = require('express').Router
const multer = require('multer')
const fs = require('fs')

const router = Router()

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'static/images/footer')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})

let upload = multer({ storage: storage }).single('image')

/* Footer API */

// Get footer

router.get('/content/footer', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch footer data.')
    } else {
      let result = JSON.parse(data)
      result = result.footer
      res.status(200).json(result)
    }
  })
})

// Post footer

router.post('/content/footer', function (req, res) {
  let organisers = req.body.organisers
  let supports = req.body.supports
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      let errText = '[' + date + '] Error: ' + err + '\n'
      fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json to fetch footer data.')
    } else {
      let result = JSON.parse(data)
      result.footer.organisers = organisers
      result.footer.supports = supports
      fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          let date = new Date()
          let errText = '[' + date + '] Error: ' + err + '\n'
          fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          }) 
        } else {
          res.status(200).json({'status': 200})
        }
      })
    }
  })
})

// Get organizers

router.get('/content/footer/organisers', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      let errText = '[' + date + '] Error: ' + err + '\n'
      fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch footer organisers data.')
    } else {
      let result = JSON.parse(data)
      result = result.footer.organisers
      res.status(200).json(result)
    }
  })
})

/* Post organizers */

router.post('/content/footer/organisers', function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      console.error(err)
      let date = new Date()
      let errText = '[' + date + '] Error: ' + err + '\n'
      fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not upload new organiser logotype data.')
    } else {
      fs.readFile('static/common/content.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          let date = new Date()
          let errText = '[' + date + '] Error: ' + err + '\n'
          fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not read file content.json and fetch footer organisers data.')
        } else {
          let result = JSON.parse(data)
          let id = result.footer.organisers[0].id
          for (var i = 0; i< result.footer.organisers.length; i++) {
            if (result.footer.organisers[i].id > id) {
              id = result.footer.organisers[id].id
            }
          }
          let name = req.body.name
          let title = req.body.title
          let phone = req.body.phone
          let email = req.body.email
          let site = req.body.site
          let newOrganiser = {
            id: id + 1,
            companyLogotype: req.file ? req.file.originalname : '',
            companyName: name,
            companyPhone: phone,
            companyEmail: email,
            companySite: site,
            order: result.footer.organisers.length + 1
          }
          result.footer.organisers.push(newOrganiser)
          fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf-8', (err, data) => {
            if (err) {
              console.log(err)
              let date = new Date()
              let errText = '[' + date + '] Error: ' + err + '\n'
              fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
                if (err) {
                  console.error(err)
                }
              })
              res.status(503).send('Could not write to file content.json footer new organiser data.')
            } else {
              res.status(200).send({'status': 200})
            }
          })
        }
      })
    }
  })
})

// Update organisers

router.put('/content/footer/organisers', function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      console.error(err)
      let date = new Date()
      let errText = '[' + date + '] Error: ' + err + '\n'
      fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not upload new organiser logotype data.')
    } else {
      fs.readFile('static/common/content.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          let date = new Date()
          let errText = '[' + date + '] Error: ' + err + '\n'
          fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not read file content.json and fetch footer organisers data.')
        } else {
          let result = JSON.parse(data)
          let id = req.body.id
          let title = req.body.title
          let name = req.body.name
          let phone = req.body.phone
          let email = req.body.email
          let site = req.body.site
          let order = req.body.order
          for (var i = 0; i < result.footer.organisers.length; i++) {
            if (result.footer.organisers[i].id === id) {
              if (req.body.originalname) {
                result.footer.organisers[i].companyLogotype = req.body.originalname
              }
              result.footer.organisers[i].companyName = name
              result.footer.organisers[i].companyPhone = phone
              result.footer.organisers[i].companyEmail = email
              result.footer.organisers[i].companySite = site
              result.footer.organisers[i].order = order
              result.footer.organisers[i].organiserTitle = title
            }
          }
          fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf8', (err, data) => {
            if (err) {
              console.log(err)
              let date = new Date()
              let errText = '[' + date + '] Error: ' + err + '\n'
              fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
                if (err) {
                  console.error(err)
                }
              })
              res.status(503).send('Could not write to file content.json footer new organiser data.')
            } else {
              res.status(200).send({'status': 200})
            }
          })
        }
      })
    }
  })
})

/* Update order in organisers */

router.put('/content/footer/organisers/order', function (req, res, next) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let error = '[ ' + new Date() + ' ] Error: ' + err + '\n'
      fs.appendFile('static/common/error-log.txt', error, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch data.')
    } else {
      let result = JSON.parse(data)
      let action = req.body.typeOfAction
      let object = req.body.object
      if (action ===  'incremention') {
        if (result.footer.organisers[object.id - 1].order > 1) {
          for (var i = 0; i < result.footer.organisers.length; i++) {
            if (result.footer.organisers[i].order === object.order - 1) {
              result.footer.organisers[i].order += 1
            }
            if (result.footer.organisers[i].id === object.id) {
              result.footer.organisers[i].order -= 1
            }
          }
        }
      } else if (action === 'decremention') {
        if (result.footer.organisers[object.id - 1].order < result.footer.organisers.length) {
          for (var i = 0; i < result.footer.organisers.length; i++) {
            if (result.footer.organisers[i].order === object.order + 1) {
              result.footer.organisers[i].order -= 1
            }
            if (result.footer.organisers[i].id === object.id) {
              result.footer.organisers[i].order += 1
            }
          }
        }
      }
      fs.writeFile('static/common/content.json', JSON.stringify(result), 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          let error = '[' + new Date() + '] Error: ' + err + '\n'
          fs.appendFile('static/error-log.txt', error, 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).send('Could not write to file content.json data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

// Get supports

router.get('/content/footer/supports', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch footer supports data.')
    } else {
      let result = JSON.parse(data)
      result = result.footer.supports
      res.status(200).json(result)
    }
  })
})

// Post supports

/* router.post('/content/footer/organizers', function (req, res) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch footer organizers data.')
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

router.post('/content/footer/organizers', function (req, res) {
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
}) */

/* Footer API */

module.exports = router