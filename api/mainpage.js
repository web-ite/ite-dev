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

/* Read slides in Main Slider */

router.get('/content/components/mainslider', function (req, res) {
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

/* Create slide in Main Slider */

router.post('/content/components/mainslider', function (req, res) {
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
          res.status(503).send('Could not read file content.json and fetch main page main slider data.')
        } else {
          let result = JSON.parse(data)
          let newOrganiser = {
            id: result.mainPage.mainSlider.length + 1,
            slideImg: req.file ? req.file.originalname : '',
            slideTitle: title,
            slideText: text,
            order: order
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

/* Update slide in Main Slider */

router.put('/content/components/mainslider', function (req, res) {
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
          if (req.body.originalname) {
            result.mainPage.mainSlider[id].slideImg = req.body.originalname
          }
          result.mainPage.mainSlider[id].slideTitle = title
          result.mainPage.mainSlider[id].slideText = text
          result.footer.organisers[id].order = order
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

/* Delete slide in Main Slider */

module.exports = router