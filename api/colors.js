const Router = require('express').Router
const fs = require('fs')

const router = Router()

router.get('/colors', function (req, res, next) {
  fs.readFile('static/css/style.json', 'utf8', (err, data) => {
    if (err) throw err
    let result = JSON.parse(data)
    res.json(result);
  });
})

router.post('/colors', function (req, res) {
  fs.writeFile('static/css/style.json', JSON.stringify(req.body), 'utf8', (err, data) => {
    if (err) throw err
    res.send({'status': 200})
  });
})

module.exports = router