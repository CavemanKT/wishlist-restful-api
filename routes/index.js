const { Router } = require('express')
const router = Router()

router.use('/', require('./root'))
router.use('/wishlists', require('./wishlists'))
router.use(function (req, res) {
  res.render('not-found', { message: "Sorry! Page does not exist!" })
})

module.exports = router