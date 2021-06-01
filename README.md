# Lab - RESTful API <!-- omit in toc -->
- [Additional Resources](#additional-resources)
- [Starter code](#starter-code)
- [Requirements](#requirements)
  - [Models](#models)
  - [Associations](#associations)
  - [Routes & Controller & Data & Views](#routes--controller--data--views)
- [Bonus](#bonus)
- [Deliverables](#deliverables)

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
        - Find the target `WishlistItem`. Use `Model.findOrCreate()`
        - Update the found `WishlistItem`
      - Destroy all WishlistItems that does not have an association
      - Redirect to `/wishlists/:id`
  - Edit: `GET /wishlists/:id/edit`
    - **Controller Logic**
      - Find the target `Wishlist`
      - Render `edit` view
- Not Found: `Any Other Pages Not Defined`

# Bonus

# Deliverables

