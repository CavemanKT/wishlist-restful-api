const { Router } = require('express')
const router = Router()

// ROOT GET /
router.get('/', function(req, res) {
  res.render('home')
})

module.exports = router