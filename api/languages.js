import { Router } from 'express'
import * as fs from 'fs'

const router = Router()

/* GET languages values form file. */
router.get('/languages', function (req, res, next) {
  fs.readFile('static/common/languages.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    res.json(result);
  });
})

router.post('/languages', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    let languages = result.languages
    let newLanguage = req.body
    languages.push(newLanguage)
    result.languages = languages
    fs.writeFile('static/common/site.json', JSON.stringify(result), 'utf-8', (err, data) => {
      if (err) throw err
      else res.send({'status': 200})
    })
  })
})

export default router