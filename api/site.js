import { Router } from 'express'
import * as fs from 'fs'

const router = Router()

/* GET site global values form file. */
router.get('/site', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    res.json(result);
  });
})

router.post('/site/meta', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    let meta = result.settings.seo
    meta = req.body
    result.settings.seo = meta
    fs.writeFile('static/common/site.json', JSON.stringify(result), 'utf-8', (err, data) => {
      if (err) throw err
      else res.send({'status': 200})
    })
  });
})

router.post('/site/colors', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    let meta = result.settings.colors
    meta = req.body
    result.settings.colors = meta
    fs.writeFile('static/common/site.json', JSON.stringify(result), 'utf-8', (err, data) => {
      if (err) throw err
      else res.send({'status': 200})
    })
  });
})

export default router