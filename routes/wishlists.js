const { body, validationResult } = require('express-validator')
const { Wishlist, WishlistItem } = require('../models')
const { encodeArray, decodeArrayToObject } = require('../services/validation-query')

const { Router } = require('express')
const router = Router()

// Validations
const permittedChangeParams = {
  Wishlist: ['title', 'description', 'WishlistItem.name', 'WishlistItem.importance', 'WishlistItem.received'],
  WishlistItems: ['name', 'importance', 'received']
}
const changeValidation = [
  body('title').isString().withMessage('Title must be a String').notEmpty().withMessage('Title is Required'),
  body('description').isString().withMessage('Description must be a String').notEmpty().withMessage('Description is Required'),
  body('WishlistItems').isArray({ min: 1}).withMessage('Wishlist must have at least 1 Item'),
  body('WishlistItems.*.name').isString().withMessage('Item Name must be a String').notEmpty().withMessage('Item Name is Required'),
  body('WishlistItems.*.importance').toInt().isInt({ min: 0, max: 5 }).withMessage('Item Important must be Between 0 and 5'),
  body('WishlistItems.*.received').default(false).toBoolean().isBoolean().withMessage('Item Received must be a Checked or Un-Checked')
]

// INDEX GET /wishlists
router.get('/', async function(req, res) {
  const wishlists = await Wishlist.findAll({
    order: [['createdAt', 'DESC']]
  })
  res.render('wishlists/index', { wishlists })
})

// CREATE POST /wishlists
router.post('/', changeValidation, async function(req, res) {
  const { body: wishlistParams } = req
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.redirect(encodeArray('/wishlists/new', errors))

  const newWishlist = await Wishlist.create(wishlistParams, {
    fields: permittedChangeParams.Wishlist,
    include: {
      association: Wishlist.WishlistItems
    }
  })

  res.redirect(`/wishlists/${newWishlist.id}`)
})

// NEW GET /wishlists/new
router.get('/new', async function(req, res) {
  const { query: { errors } } = req
  const wishlist = await Wishlist.build({
    WishlistItems: []
  }, {
    include: Wishlist.WishlistItems
  })
  wishlist.WishlistItems.push(await WishlistItem.build())

  res.render('wishlists/new', { wishlist, formErrors: decodeArrayToObject(errors) })
})

// SHOW GET /wishlists/:id
router.get('/:id', async function(req, res) {
  const { params: { id } } = req
  const wishlist = await Wishlist.findOne({
    where: { id: Number(id) || 0 },
    include: {
      association: Wishlist.WishlistItems
    },
    order: [['WishlistItems', 'createdAt', 'DESC']]
  })

  if (!wishlist) return res.render('not-found', { message: `Wishlist of ID ${id} not found!` })

  res.render('wishlists/show', { wishlist })
})

// DESTROY DELETE /wishlists/:id
router.delete('/:id', async function(req, res) {
  const { params: { id } } = req
  const wishlist = await Wishlist.findOne({
    where: { id: Number(id) || 0 },
    include: {
      association: Wishlist.WishlistItems
    }
  })

  if (!wishlist) return res.render('not-found', { message: `Wishlist of ID ${id} not found!` })

  await wishlist.setWishlistItems([])
  await wishlist.destroy()
  await WishlistItem.destroy({ where: { WishlistId: null } })

  res.redirect('/wishlists')
})

// UPDATE PUT /wishlists/:id
router.put('/:id', changeValidation, async function(req, res) {
  const {
    params: { id: WishlistId },
    body: { WishlistItems: itemsParams, ...wishlistParams }
  } = req
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.redirect(encodeArray(`/wishlists/${WishlistId}/edit`, errors))

  const wishlist = await Wishlist.findOne({
    where: { id: WishlistId },
    include: Wishlist.WishlistItems
  })

  await wishlist.update(wishlistParams, { fields: permittedChangeParams.Wishlist })

  await wishlist.setWishlistItems([])
  itemsParams.forEach(async function({ id: ItemId, ...itemParams }) {
    let wishlistItem = await WishlistItem.findOne({ where: { id: Number(ItemId) || 0 } })

    if (wishlistItem) {
      await wishlistItem.update(itemParams, { fields: permittedChangeParams.WishlistItems })
    } else {
      wishlistItem = await WishlistItem.create(itemParams, { fields: permittedChangeParams.WishlistItems })
    }

    await wishlist.addWishlistItem(wishlistItem)
  })
  await WishlistItem.destroy({ where: { WishlistId: null } })

  res.redirect(`/wishlists/${wishlist.id}`)
})

// EDIT GET /wishlists/:id/edit
router.get('/:id/edit', async function(req, res) {
  const { params: { id }, query: { errors } } = req
  const wishlist = await Wishlist.findOne({
    where: { id: Number(id) || 0 },
    include: Wishlist.WishlistItems
  })

  if (!wishlist) return res.render('not-found', { message: `Wishlist of ID ${id} not found!` })

  res.render('wishlists/edit', { wishlist, formErrors: decodeArrayToObject(errors) })
})

module.exports = router