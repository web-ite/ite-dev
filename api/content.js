const Router = require('express').Router
const fs = require('fs')
const _ = require('lodash')

const router = Router()

/* ---------------- Read and Update content on pages API routes ---------------- */

/* ---------------- Read content ---------------- */

router.get('/page/content', function (req, res, next) {
  
  let language = req.query.language
  let pageId = req.query.pageId
  let fileUrl = 'static/pages/' + language + '/data.json'
  
  fs.readFile(fileUrl, 'utf8', (err, data) => {
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get page with id - \"' + pageId + '\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not read file \"' + language + '\/data.json\" and get page with id - \"' + pageId + '\".\n'
      })
    } else {
      let result = JSON.parse(data)
      let pagesContent = result.content
      let pageContent = _.filter(pagesContent, {'pageId': parseInt(req.query.pageId)})
      res.status(200).json({
        code: 200,
        data: pageContent[0].data
      })
    }
  })
})

/* ---------------- Update content ---------------- */

router.put('/page/content', function (req, res, next) {
  let language = req.body.language
  let pageId = req.body.pageId
  let content = req.body.data
  console.log(content)
  let fileUrl = 'static/pages/' + language + '/data.json'
  fs.readFile(fileUrl, 'utf8', (err, data) => {
    if (err) {
      let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get page with id - \"' + pageId + '\".\n' 
      fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).json({
        code: 503,
        message: 'Could not read file \"' + language + '\/data.json\" and get page with id - \"' + pageId + '\".\n'
      })
    } else {
      let result = JSON.parse(data)
      let pagesContent = result.content
      console.log(pagesContent)
      for (let i = 0; i < pagesContent.length; i++) {
        if (pagesContent[i].pageId === parseInt(pageId)) {
          pagesContent[i].data = content
        }
      }
      console.log(pagesContent)
      result.content = pagesContent
      fs.writeFile(fileUrl, JSON.stringify(result), 'utf8', (err, data) => {
        if (err) {
          let errText = '[' + new Date() + '] Error: ' + err + '\n' + 
                     'Could not read file \"' + language + '\/data.json\" and get page with id - \"' + pageId + '\".\n' 
          fs.appendFile('static/error.txt', errText, 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(503).json({
            code: 503,
            message: 'Could not read file \"' + language + '\/data.json\" and post page with id - \"' + pageId + '\".\n'
          })
        } else {
          res.status(200).json({
            code: 200,
            message: 'Success'
          })
        }
      })
    }
  })
})

/* ---------------- End of API routes ---------------- */

module.exports = router
