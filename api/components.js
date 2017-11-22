const Router = require('express').Router
const multer = require('multer')
const fs = require('fs')

const router = Router()

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'static/images/slider')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})

let upload = multer({ storage: storage }).single('image')

/* ---------------- CRUD components ---------------- */

/* ---------------- Slider section ---------------- */

/* Read mainslider */

router.get('/components/slider', function (req, res, next) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch main page main slider data.')
    } else {
      let result = JSON.parse(data)
      result = result.mainPage.mainSlider
      res.status(200).json(result)
    }
  })
})

/* Post mainslider */

router.post('/components/slider', function (req, res) {
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
      res.status(503).send('Could not upload new slide to main slider.')
    } else {
      let title = req.body.title
      let text = req.body.text
      let link = req.body.link
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
          res.status(503).send('Could not read file content.json and fetch main page main slider data.')
        } else {
          let result = JSON.parse(data)
          let id = result.mainPage.mainSlider[0].id
          for (var i = 0; i < result.mainPage.mainSlider.length; i++) {
            if (result.mainPage.mainSlider[i].id > id) {
              id = result.mainPage.mainSlider[i].id
            }
          }
          let newSlide = {
            id: id + 1,
            slideImg: req.file ? req.file.originalname : '',
            slideTitle: title,
            slideText: text,
            slideLink: link,
            order: result.mainPage.mainSlider.length + 1
          }
          result.mainPage.mainSlider.push(newSlide)
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
              res.status(503).send('Could not write to file content.json main page new slide to main slider data.')
            } else {
              res.status(200).send({'status': 200})
            }
          })
        }
      })
    }
  })
})

/* Update mainslider */

router.put('/components/slider', function (req, res) {
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
      res.status(503).send('Could not update slide in main slider.')
    } else {
      let id = req.body.id
      let title = req.body.title
      let text = req.body.text
      let link = req.body.link
      let order = req.body.order
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
          res.status(503).send('Could not read file content.json and fetch main slider data.')
        } else {
          let result = JSON.parse(data)
          for (var i = 0; i < result.mainPage.mainSlider.length; i++) {
            if (result.mainPage.mainSlider[i].id === id) {
              if (req.body.originalname) {
                result.mainPage.mainSlider[i].slideImg = req.body.originalname
              }
              result.mainPage.mainSlider[i].slideTitle = title
              result.mainPage.mainSlider[i].slideText = text
              result.mainPage.mainSlider[i].slideLink = link
              result.footer.organisers[i].order = order
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
              res.status(503).send('Could not write to file content.json updated slide in main slider.')
            } else {
              res.status(200).send({'status': 200})
            }
          })
        }
      })
    }
  })
})

/* Order mainslider */

router.put('/components/slider/order', function (req, res, next) {
  let action = req.body.typeOfAction
  let section = req.body.section
  let subSection = req.body.typeOfObject
  let object = req.body.object
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
      if (action ===  'incremention') {
        if (result[section][subSection][object.id - 1].order > 1) {
          for (var i = 0; i < result[section][subSection].length; i++) {
            if (result[section][subSection][i].order === object.order - 1) {
              result[section][subSection][i].order += 1
            }
            if (result[section][subSection][i].id === object.id) {
              result[section][subSection][i].order -= 1
            }
          }
        }
      } else if (action === 'decremention') {
        if (result[section][subSection][object.id - 1].order < result[section][subSection].length) {
          for (var i = 0; i < result[section][subSection].length; i++) {
            if (result[section][subSection][i].order === object.order + 1) {
              result[section][subSection][i].order -= 1
            }
            if (result[section][subSection][i].id === object.id) {
              result[section][subSection][i].order += 1
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

/* ---------------- Mainbanner section ---------------- */

/* Read mainbanner */

router.get('/components/mainbanner', function (req, res, next) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch main banner data.')
    } else {
      let result = JSON.parse(data)
      result = result.mainPage.mainBanner
      res.status(200).json(result)
    }
  })
})

/* Update mainbanner */

router.put('/components/mainbanner', function (req, res, next) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch main banner data.')
    } else {
      let result = JSON.parse(data)
      let mainBanner = req.body 
      result.mainPage.mainBanner = mainBanner
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
          res.status(503).send('Could not write to file content.json updated main banner in main page.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

/* ---------------- Hotlink section ---------------- */

/* Order hotlink */

router.put('/components/hotlink/order', function (req, res, next) {
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
        if (result.mainPage.hotLinks[object.id - 1].order > 1) {
          for (var i = 0; i < result.mainPage.hotLinks.length; i++) {
            if (result.mainPage.hotLinks[i].order === object.order - 1) {
              result.mainPage.hotLinks[i].order += 1
            }
            if (result.mainPage.hotLinks[i].id === object.id) {
              result.mainPage.hotLinks[i].order -= 1
            }
          }
        }
      } else if (action === 'decremention') {
        if (result.mainPage.hotLinks[object.id - 1].order < result.mainPage.hotLinks.length) {
          for (var i = 0; i < result.mainPage.hotLinks.length; i++) {
            if (result.mainPage.hotLinks[i].order === object.order + 1) {
              result.mainPage.hotLinks[i].order -= 1
            }
            if (result.mainPage.hotLinks[i].id === object.id) {
              result.mainPage.hotLinks[i].order += 1
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

/* Read hotlink */

router.get('/components/hotlink', function (req, res, next) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch hot links data.')
    } else {
      let result = JSON.parse(data)
      result = result.mainPage.hotLinks
      res.status(200).json(result)
    }
  })
})

/* Update hotlink */

router.put('/components/hotlink', function (req, res, next) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch hot links data.')
    } else {
      let result = JSON.parse(data)
      let hotLinks = req.body 
      result.mainPage.hotLinks = hotLinks
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
          res.status(503).send('Could not write to file content.json updated hot links in main page.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

/* ---------------- Freebox section ---------------- */

/* Read freebox */

router.get('/components/freebox', function (req, res, next) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch freeboxes data.')
    } else {
      let result = JSON.parse(data)
      result = result.mainPage.freeboxes
      res.status(200).json(result)
    }
  })
})

/* Post freebox */ 

router.post('/components/freebox', function (req, res, next) {
  
})

/* Update freebox */

router.put('/components/freebox', function (req, res, next) {
  
})

/* Order freebox */

router.post('/components/freebox/order', function (req, res, next) {
  fs.readFile('static/common/content.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let error = '[ ' + new Date() + ' ] Error: ' + err + '\n'
      fs.appendFile('static/common/error-log.txt', error, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file content.json and fetch freebox data.')
    } else {
      let result = JSON.parse(data)
      let action = req.body.typeOfAction
      let object = req.body.object
      if (action ===  'incremention') {
        if (result.mainPage.freeboxes[object.id - 1].order > 1) {
          for (var i = 0; i < result.mainPage.freeboxes.length; i++) {
            if (result.mainPage.freeboxes[i].order === object.order - 1) {
              result.mainPage.freeboxes[i].order += 1
            }
            if (result.mainPage.freeboxes[i].id === object.id) {
              result.mainPage.freeboxes[i].order -= 1
            }
          }
        }
      } else if (action === 'decremention') {
        if (result.mainPage.freeboxes[object.id - 1].order < result.mainPage.freeboxes.length) {
          for (var i = 0; i < result.mainPage.freeboxes.length; i++) {
            if (result.mainPage.freeboxes[i].order === object.order + 1) {
              result.mainPage.freeboxes[i].order -= 1
            }
            if (result.mainPage.freeboxes[i].id === object.id) {
              result.mainPage.freeboxes[i].order += 1
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
          res.status(503).send('Could not write to file content.json freebox data.')
        } else {
          res.status(200).send({'status': 200})
        }
      })
    }
  })
})

/* ---------------- Banner section ---------------- */

/* Read banner */

router.get('/components/banner', function (req, res, next) {
  
})

/* Post banner */

router.post('/components/banner', function (req, res, next) {
  
})

/* Update banner */

router.put('/components/banner', function (req, res, next) {
  
})

/* Order banner */

router.put('/components/banner/order', function (req, res, next) {
  
})

/* ---------------- Support section ---------------- */

/* Read support */

router.get('/components/support', function (req, res, next) {
  
})

/* Post support */

router.post('/components/support', function (req, res, next) {
  
})

/* Update support */

router.put('/components/support', function (req, res, next) {
  
})

/* Order support */

router.put('/components/support/order', function (req, res, next) {
  
})

/* ---------------- End CRUD ---------------- */

module.exports = router
