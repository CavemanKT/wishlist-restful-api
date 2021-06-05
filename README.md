# Lab - RESTful API <!-- omit in toc -->
- [Additional Resources](#additional-resources)
- [Starter code](#starter-code)
- [Requirements](#requirements)
  - [Models](#models)
  - [Associations](#associations)
  - [Routes & Controller & Data & Views](#routes--controller--data--views)
- [Bonus](#bonus)
- [Deliverables](#deliverables)
  - [Home Page](#home-page)
  - [Wishlists Index Page](#wishlists-index-page)
  - [Wishlists Show Page](#wishlists-show-page)
  - [Wishlists New Page & Edit Page Before Submit](#wishlists-new-page--edit-page-before-submit)
  - [Wishlists New Page & Edit Page After Submit](#wishlists-new-page--edit-page-after-submit)
  - [Not Found Page When Wishlist Is Not Found](#not-found-page-when-wishlist-is-not-found)
  - [Not Found Page When No Route Found](#not-found-page-when-no-route-found)

# Additional Resources
- [Sequelize Associations](https://sequelize.org/master/manual/assocs.html)
- [Sequelize DataTypes](https://sequelize.org/master/variable/index.html#static-variable-DataTypes)
- [Express Validators](https://express-validator.github.io/docs/)
- [Validators & Sanitizers](https://github.com/validatorjs/validator.js#validators)
- [method-override](https://github.com/expressjs/method-override#override-using-a-query-value)
- [moment.js](https://momentjs.com/)
- [lodash](https://lodash.com/)

# Starter code
- On the upper right, click `Fork` (Select your own account if prompted)
- Click `Code` and copy the `ssh link`
- In your terminal navigate to your `unit-2` folder
- Use the command `$ git clone [ssh link]`
- Create a new branch `[your-initials]-solution`

# Requirements
**You are tasked to create a RESTful API from scratch.**

## Models
- Model `Wishlist`
  - **title**: String & Cannot be null
  - **description**: String & Cannot be null
- Model `WishlistItem`
  - **name**: String & Cannot be null
  - **importance**: Integer & Cannot be null
  - **received**: Boolean & Cannot be null

## Associations
- `Wishlist` has many `WishlistItems`
- `WishlistItem` belongs to `Wishlist`

## Routes & Controller & Data & Views
> `Validation & Sanitization` and `Error Handing` is not listed in **Controller Logic**. Please add the appropriate code where ever you see fit.

- Home Page: `GET /`
- Wishlist
  - Index: `GET /wishlists`
    - **Controller Logic**
      - Find all `Wishlists`
      - Render `index` view
  - Create: `POST /wishlists`
    - **Form Data Structure**
      - **title** - `input`
      - **description** - `input`
      - **WishlistItems\[index\]\[name\]** - `input`
      - **WishlistItems\[index\]\[importance\]** - `select`
      - **WishlistItems\[index\]\[received\]** - `checkbox`
    - **Controller Logic**
      - Create a `Wishlist` and `WishlistItem` in **1 statement**. Use `Model.create()` and `include`!
      - Redirect to `/wishlists/:id`
  - New: `GET /wishlists/new`
    - **Controller Logic**
      - Build an empty `Wishlist`
      - Build an empty `WishlistItem`
      - Push the empty `WishlistItem` to `WishlistItems Property` inside the empty `Wishlist`
      - Render `new` view
  - Show: `GET /wishlists/:id`
    - **Controller Logic**
      - Find the target `Wishlist`
      - Render `show` view
  - Destroy: `DELETE /wishlists/:id`
    - **Controller Logic**
      - Find the target Wishlist
      - Un-associate all WishlistItems
      - Destroy all WishlistItems that does not have an association
      - Destroy the Wishlist
      - Redirect to `/wishlists`
  - Update: `PUT /wishlist/:id`
    - **Form Data Structure**
      - **title** - `input`
      - **description** - `input`
      - **WishlistItems\[index\]\[name\]** - `input`
      - **WishlistItems\[index\]\[importance\]** - `select`
      - **WishlistItems\[index\]\[received\]** - `checkbox`
    - **Controller Logic**
      - Find the target `Wishlist`
      - Update the target `Wishlist` with **title** & **description**
      - Un-associate all WishlistItems
      - For all the `WishlistItems` data
        - Find the target `WishlistItem`
        - If found
          - Create a new `WishlistItem`
        - If not found
          - Update the found `WishlistItem`
        - Associate the `WishlistItem` to `Wishlist` (You can use `.addWishlistItem()` or add `WishlistId` when creating/updating item)
      - Destroy all WishlistItems that does not have an association
      - Redirect to `/wishlists/:id`
  - Edit: `GET /wishlists/:id/edit`
    - **Controller Logic**
      - Find the target `Wishlist`
      - Render `edit` view
- Not Found: `Any Other Pages Not Defined`

# Bonus
- Add a ordering for `createdAt` field in `DESC` order for `Wishlist` in **Wishlist Index** controller
- Add a ordering for `createdAt` field in `DESC` order for `WishlistItems` in **Wishlist Show** controller
- Use [Bootstrap Form Validation](https://getbootstrap.com/docs/4.6/components/forms/#custom-styles) to add UI validations in conjunction with [Express Validator Redirection Error Messages](https://github.com/dented-academy/fswdi-curriculum/blob/master/unit2/2.1/restful-api/README.md#controller-level-validation-setup)

# Deliverables
## Home Page
![Screen](https://i.imgur.com/a1TUGef.png)

## Wishlists Index Page
![Screen](https://i.imgur.com/LvZv9i7.png)

## Wishlists Show Page
![Screen](https://i.imgur.com/r8Ae1QJ.png)

## Wishlists New Page & Edit Page Before Submit
![Screen](https://i.imgur.com/1jQuFbc.png)

## Wishlists New Page & Edit Page After Submit
![Screen](https://i.imgur.com/lhqmT0W.png)

## Not Found Page When Wishlist Is Not Found
![Screen](https://i.imgur.com/doynxqF.png)

## Not Found Page When No Route Found
![Screen](https://i.imgur.com/AhwuIxU.png)
