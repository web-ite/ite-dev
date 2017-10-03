import { Router } from 'express'
import * as fs from 'fs'

const router = Router()

/* GET site templates form file. */
router.get('/templates', function (req, res, next) {
  fs.readFile('static/common/site.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    res.json(result.templates);
  });
})

export default router