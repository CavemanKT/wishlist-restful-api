const { Router } = require('express')
const router = Router()

// wishlists Router /api/wishlists
router.use('/', require('./root'))
router.use('/wishlists', require('./wishlists'))

// Error Response
router.use(function (req, res) {
  res.render('not-found', { message: "Sorry! Page does not exist!" })
})

module.exports = router
