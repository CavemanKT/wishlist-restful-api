const { Faker } = require('fakergem')
const { Wishlist, WishlistItem } = require('../models')

module.exports = {
  up: async () => {
    await Wishlist.destroy({ truncate: true })
    await WishlistItem.destroy({ truncate: true })

    for (let i = 0; i < 10; i++) {
      await Wishlist.create({
        title: Faker.Lorem.sentence(2),
        description: Faker.Lorem.sentence(4),
        WishlistItems: [
          {
            name: Faker.Beer.name(),
            importance: Faker.Number.between(0, 5),
            received: Faker.Boolean.boolean(0.1)
          }, {
            name: Faker.Beer.name(),
            importance: Faker.Number.between(0, 5),
            received: Faker.Boolean.boolean(0.1)
          }
        ]
      }, {
        include: Wishlist.WishlistItems
      })
    }
  },
}
