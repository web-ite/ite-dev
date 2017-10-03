import { Router } from 'express'
import * as fs from 'fs'

const router = Router()

/* GET color values form file. */
router.get('/colors', function (req, res, next) {
  fs.readFile('static/css/style.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    res.json(result);
  });
})

/* Set color values to file. */
router.post('/colors', function (req, res) {
  fs.writeFile('static/css/style.json', JSON.stringify(req.body), 'utf8', (err, data) => {
    if (err) throw err
    res.send({'status': 200})
  });
})

export default router