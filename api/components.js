const Router = require('express').Router
const multer = require('multer')
const fs = require('fs')
const _ = require('lodash')

const router = Router()

/* ---------------- CRUD API routes of components on pages ---------------- */

router.get('/page/components', (req, res, next) => {
  
  let page = req.body.page
  let component = req.body.component
  let language = req.body.language
  
  fs.readFile('static/pages/' + language + '/data.json', 'utf8', (err, data) => {
    if (err) {
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
      result = _.filter(result, 'order')
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
      callback(null, 'static/images/' + req.body.componentType)
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  })
  
  let upload = multer({ storage: storage }).single('image')
  
  upload(req, res, (err) => {
    
    let pageId = req.body.pageId
    let component = req.body.component
    let componentType = req.body.componentType
    let language = req.body.language
    let fileUrl = 'static/pages/' + language + '/data.json'
    
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not upload file - \"' + req.file.originalname + '\" to \"images\/' + componentType + '\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not upload file - \"' + req.file.originalname + '\" to \"images\/' + componentType + '\".\n'
      })
    } else {
      
      fs.readFile(fileUrl, 'utf8', (err, data) => {
        if (err) {
          let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get component \"' + componentType + '\" from page - \"' + pageId + '\".\n' 
          fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).json({
            code: 503,
            message: 'Could not read file \"' + language + '\/data.json\" and get component \"' + componentType + '\" from page - \"' + pageId + '\".\n' 
          })
        } else {
          
          let result = JSON.parse(data)
          let components = result.components[componentType]
          
          let id = components[0].id
          for (let i = 0; i < components.length; i++) {
            if (components[i].id > id) {
              id = components[i].id
            }
          }
          /* end */
          let newComponentElement = {
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
  
/* ---------------- End of CRUD API routes ---------------- */

module.exports = router