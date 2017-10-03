import { Router } from 'express'
import * as fs from 'fs'

const router = Router()

/* GET pages values form file. */
router.get('/pages', function (req, res, next) {
  fs.readFile('static/common/structure.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    res.json(result);
  });
})

router.put('/pages', function (req, res, next) {
  let structure = req.body.structure
  let page = req.body.page
   fs.readFile('static/common/structure.json', 'utf8', (err, data) => {
    if (err) throw err
    else {
      let pages = JSON.parse(data)
      let oldPage = pages.find(page)
      let oldPath = 'pages/site/' + oldPage.path
      let newPath = 'pages/site/' + page.path
      if (oldPage.alias != page.alias) {
        fs.rename(oldPath, newPath, (err) => {
          if (err) throw err
        })
      }
    }
  });
  fs.writeFile('static/common/structure.json', JSON.stringify(structure), 'utf8', (err, data) => {
    if (err) throw err
    else res.send({'status': 200})
  })
})

router.post('/pages', function (req, res, next) {
  let newPage = req.body.page
  let structure = req.body.structure
  fs.writeFile('static/common/structure.json', JSON.stringify(structure), 'utf8', (err, data) => {
    if (err) throw err
    else {
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
      /* fs.openSync(filePath, "w")
      let stream = fs.createWriteStream(filePath)
      stream.once('open', (fd) => {
        stream.write(pageContent);
        stream.end();
      }); */ 
      fs.writeFile(filePath, pageContent, 'utf8', (err, data) => {
        if (err) throw err
      })
      res.send({'status': 200})
    }
  })
})

export default router