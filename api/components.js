const Router = require('express').Router
const multer = require('multer')
const fs = require('fs')

const router = Router()

router.get('/page/components', (req, res, next) => {
  
  let page = req.body.page
  let component = req.body.component
  let language = req.body.language
  
  fs.readFile('static/pages/' + language + '/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get \"' + component + '\" from page \"' + page + '\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not read file \"' + language + '\/data.json\" and get \"' + component + '\" from page \"' + page + '\".'
      })
    } else {
      let result = JSON.parse(data)
      result = result[language][component]
      res.status(200).json({
        code: 200,
        data: result
      })
    }
  })
  
})

router.post('/page/components', (req, res, next) => {
  
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'static/images')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  })
  
  let upload = multer({ storage: storage }).single('image')
  
  upload(req, res, (err) => {
    
    let page = req.body.page
    let component = req.body.component
    let language = req.body.language
    
    if (err) {
      console.error(err)
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get \"' + component + '\" from page \"' + page + '\".\n' 
      fs.appendFile('static/error-log.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not read file \"' + language + '\/data.json\" and get \"' + component + '\" from page \"' + page + '\".'
      })
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
  

module.exports = router