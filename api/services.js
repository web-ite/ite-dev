const Router = require('express').Router
const multer = require('multer')
const fs = require('fs')
const _ = require('lodash')

const router = Router()

router.get('/services/articles', function (req, res, next) {
  let language = req.query.language
  let fileUrl = 'static/pages/' + language + '/data.json'
  fs.readFile(fileUrl, 'utf8', (err, data) => {
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get \"news\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not read file \"' + language + '\/data.json\" and get \"news\".'
      })
    } else {
      let result = JSON.parse(data)
      result = result.services.articles
      //result = _.filter(result, 'Date', 'ASC')
      res.status(200).json({
        code: 200,
        data: result
      })
    }
  })
})

router.get('/services/article', function (req, res, netx) {
  
})

router.put('/services/article', function (req, res, next) {
  
})

router.post('/services/articles', function (req, res, next) {
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'static/images/news')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  })
  let upload = multer({ storage: storage }).single('image')
  upload(req, res, (err) => {
    let language = req.body.language
    let fileUrl = 'static/pages/' + language + '/data.json'
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not upload file - \"' + req.file.originalname + '\" to \"images\/news\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not upload file - \"' + req.file.originalname + '\" to \"images\/news\".'
      })
    } else {
      fs.readFile(fileUrl, 'utf8', (err, data) => {
        if (err) {
          let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get component \"news\".\n' 
          fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).json({
            code: 503,
            message: 'Could not read file \"' + language + '\/data.json\" and get component \"news\".' 
          })
        } else {
          let result = JSON.parse(data)
          let articles = result.services.articles
          
          let id = articles[0].id
          for (let i = 0; i < articles.length; i++) {
            if (articles[i].id > id) {
              id = articles[i].id
            }
          }
          let newObj = {
            id: id + 1,
            Thumbnail: req.file ? req.file.originalname : '',
            Title: req.body.Title,
            Text: req.body.Text,
            Gallery: req.body.Gallery,
            Date: req.body.Date,
            Type: req.body.Type,
            order: articles.length + 1
          }
          result.services.articles.push(newObj)
          fs.writeFile(fileUrl, JSON.stringify(result), 'utf8', (err, data) => {
            if (err) {
              let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                            'Could not write to file \"' + language + '\/data.json\" and push new record to \"news\".\n' 
              fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
                if (err) {
                  console.error(err)
                }
              })
              res.status(503).json({
                code: 503,
                message: 'Could not write to file \"' + language + '\/data.json\" and push new record to \"news\".' 
              })
            } else {
              res.status(200).json({
                code: 200,
                message: 'New record to \"news\" was pushed successfully.' 
              })
            }
          })
        }
      })
    }
  })
})

module.exports = router