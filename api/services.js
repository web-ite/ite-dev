const Router = require('express').Router
const multer = require('multer')
const fs = require('fs')
const _ = require('lodash')

const router = Router()

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'static/images/news')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})

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
      let articles = result.services.articles
      let response = _.sortBy(articles, 'order')
      res.status(200).json({
        code: 200,
        data: response
      })
    }
  })
})

// need change ++
router.get('/services/article', function (req, res, netx) {
  let language = req.query.language
  let path = req.query.alias
  let alias = path.split('/').pop()
  let fileUrl = 'static/pages/' + language + '/data.json'
  fs.readFile(fileUrl, 'utf8', (err, data) => {
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get \"article\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not read file \"' + language + '\/data.json\" and get \"article\".'
      })
    } else {
      let result = JSON.parse(data)
      result = result.services.articles
      let article = _.filter(result, {'alias': alias})
      res.status(200).json({
        code: 200,
        data: article
      })
    }
  })
})

router.put('/services/article', function (req, res, next) {
  console.log(req.body)
  console.log(req.file)
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
          let id = req.body.id
          for (let i = 0; i < result.services.articles.length; i++) {
            if (result.services.articles[i].id == id) {
              if (req.body.originalname) {
                result.services.articles[i].Thumbnail = req.body.originalname
              }
              result.services.articles[i].Title = req.body.Title
              result.services.articles[i].Text = req.body.Text
              result.services.articles[i].Description = req.body.Description
              result.services.articles[i].Gallery = req.body.Gallery
              result.services.articles[i].Date = req.body.Date
              result.services.articles[i].Type = req.body.Type
              result.services.articles[i].alias = req.body.alias
              result.services.articles[i].order = req.body.order
            }
          }
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

router.delete('/services/article', function (req, res, next) {
  let language = req.body.language
  let object = req.body.object
  let fileUrl = 'static/pages/' + language + '/data.json'
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
      for(let i = 0; i < result.services.articles.length; i++) {
        if (result.services.articles[i].id === object.id) {
          result.services.articles.splice(i, 1)
        }
      }
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
});

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
            Description: req.body.Description,
            Text: req.body.Text,
            Gallery: req.body.Gallery ? req.body.Gallery : '',
            Date: req.body.Date,
            Type: req.body.Type,
            alias: req.body.alias,
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

router.post('/services/article/gallery', function (req, res, next) {
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'static/images/news/galleries')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  })
  let upload = multer({ storage: storage }).array('images')
  upload(req, res, (err) => {
    let language = req.body.language
    let fileUrl = 'static/pages/' + language + '/data.json'
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not upload gallery to \"images\/news\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not upload gallery to \"images\/news\".'
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
          let galleries = result.services.galleries
          let id = galleries[0].id
          for (let i = 0; i < galleries.length; i++) {
            if (galleries[i].id > id) {
              id = galleries[i].id
            }
          }
          let filenames = [];
          for (let i = 0; i < req.files.length; i++) {
            filenames.push(req.files[i].originalname)
          }
          let newObj = {
            id: id + 1,
            files: filenames
          }
          result.services.galleries.push(newObj)
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
                message: 'New gallery to \"news\" was pushed successfully.',
                id: newObj.id
              })
            }
          })
        }
      })
    }
  })
})

// need change
router.put('/services/article/gallery', function (req, res, next) {
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'static/images/news/galleries')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  })
  let upload = multer({ storage: storage }).array('images')
  upload(req, res, (err) => {
    let language = req.body.language
    let fileUrl = 'static/pages/' + language + '/data.json'
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not upload gallery to \"images\/news\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not upload gallery to \"images\/news\".'
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
          let galleries = result.services.galleries
          let id = galleries[0].id
          for (let i = 0; i < galleries.length; i++) {
            if (galleries[i].id > id) {
              id = galleries[i].id
            }
          }
          let filenames = [];
          for (let i = 0; i < req.files.length; i++) {
            filenames.push(req.files[i].originalname)
          }
          let newObj = {
            id: id + 1,
            files: filenames
          }
          result.services.galleries.push(newObj)
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
                message: 'New gallery to \"news\" was pushed successfully.' 
              })
            }
          })
        }
      })
    }
  })
})

router.get('/services/article/gallery', function (req, res, next) {
  let language = req.query.language
  let id = req.query.id
  let fileUrl = 'static/pages/' + language + '/data.json'
  fs.readFile(fileUrl, 'utf8', (err, data) => {
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get news gallery.\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not read file \"' + language + '\/data.json\" and get news gallery.'
      })
    } else {
      let result = JSON.parse(data)
      result = result.services.galleries
      let gallery = _.filter(result, {'id': id})
      res.status(200).json({
        code: 200,
        data: gallery
      })
    }
  })
})

router.put('/services/article/order', function (req, res, next) {
  let action = req.body.typeOfAction
  let object = req.body.object
  let language = req.body.language
  let fileUrl = 'static/pages/' + language + '/data.json'
  fs.readFile(fileUrl, 'utf8', (err, data) => {
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
        if (result.services.articles[object.id - 1].order > 1) {
          for (var i = 0; i < result.services.articles.length; i++) {
            if (result.services.articles[i].order === object.order - 1) {
              result.services.articles[i].order += 1
            }
            if (result.services.articles[i].id === object.id) {
              result.services.articles[i].order -= 1
            }
          }
        }
      } else if (action === 'decremention') {
        if (result.services.articles[object.id - 1].order < result.services.articles.length) {
          for (var i = 0; i < result.services.articles.length; i++) {
            if (result.services.articles[i].order === object.order + 1) {
              result.services.articles[i].order -= 1
            }
            if (result.services.articles[i].id === object.id) {
              result.services.articles[i].order += 1
            }
          }
        }
      }
      fs.writeFile(fileUrl, JSON.stringify(result), 'utf-8', (err, data) => {
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

module.exports = router