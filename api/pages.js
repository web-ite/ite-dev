const Router = require('express').Router
const fs = require('fs')

const router = Router()

router.get('/pages', function (req, res, next) {
  fs.readFile('static/common/structure.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
      res.status(503).send('Could not read file structure.json and fetch pages data.')
    } else {
      let result = JSON.parse(data)
      res.status(200).json(result);
    }
  });
})

router.put('/pages', function (req, res, next) {
  let structure = req.body.structure
  let page = req.body.page
   fs.readFile('static/common/structure.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
    }
    else {
      let pages = JSON.parse(data)
      let oldPage = pages.find(page)
      let oldPath = 'pages/site/' + oldPage.path
      let newPath = 'pages/site/' + page.path
      if (oldPage.alias != page.alias) {
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(err)
            let date = new Date()
            fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
              if (err) {
                console.error(err)
              }
            })
          }
        })
      }
    }
  })
  fs.writeFile('static/common/structure.json', JSON.stringify(structure), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
    } else res.send({'status': 200})
  })
})

router.post('/pages', function (req, res, next) {
  let newPage = req.body.page
  let structure = req.body.structure
  fs.writeFile('static/common/structure.json', JSON.stringify(structure), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      let date = new Date()
      fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
        if (err) {
          console.error(err)
        }
      })
    } else {
      let filePath = 'pages/' + newPage.filePath
      let pageContent = '<template>\n' +
                        ' <main class="mainSection">\n' +
                        ' </main>\n' +
                        '</template>\n' +
                        '<script>\n' +
                        ' export default {\n' +
                        '   layout: \'' + newPage.template + '\',\n' +
                        '   head () {\n' +
                        '     return {\n' +
                        '       title: \'' + newPage.name + '\'\n' +
                        '     }\n' +
                        '   }\n' +
                        ' }\n' +
                        '</script>'
      fs.writeFile(filePath, pageContent, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          let date = new Date()
          fs.appendFile('static/error-log.txt', '[ ' + date + ' ] Error: ' + err + '\n', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
          })
        } else {
          res.send({'status': 200})
        }
      })
    }
  })
})

module.exports = router