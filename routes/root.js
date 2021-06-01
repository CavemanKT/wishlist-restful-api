const { Router } = require('express')
const router = Router()

// /
router.get('/', function(req, res) {
  res.render('home')
})

module.exports = router