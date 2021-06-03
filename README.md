# Lab - RESTful API <!-- omit in toc -->
- [Additional Resources](#additional-resources)
- [Starter code](#starter-code)
- [Reminder](#reminder)
  - [Models](#models)
  - [Associations](#associations)
- [Requirements](#requirements)
  - [Routes](#routes)
  - [Views](#views)
  - [The Wishlist Index Features](#the-wishlist-index-features)
- [Bonus](#bonus)
- [Deliverables](#deliverables)
  - [Home Page](#home-page)
  - [Wishlists Index Page](#wishlists-index-page)
  - [Wishlists Show Modal](#wishlists-show-modal)
  - [Wishlists New Modal & Edit Modal Before Submit](#wishlists-new-modal--edit-modal-before-submit)
  - [Wishlists New Modal & Edit Modal After Submit](#wishlists-new-modal--edit-modal-after-submit)
  - [Modal When Wishlist Is Not Found](#modal-when-wishlist-is-not-found)
  - [Not Found Page When No Route Found](#not-found-page-when-no-route-found)
- [Bonus Deliverables](#bonus-deliverables)
  - [Wishlists Index Page](#wishlists-index-page-1)
  - [Wishlists Show Modal](#wishlists-show-modal-1)

# Additional Resources
- [Sequelize Associations](https://sequelize.org/master/manual/assocs.html)
- [Sequelize DataTypes](https://sequelize.org/master/variable/index.html#static-variable-DataTypes)
- [Express Validators](https://express-validator.github.io/docs/)
- [Validators & Sanitizers](https://github.com/validatorjs/validator.js#validators)
- [method-override](https://github.com/expressjs/method-override#override-using-a-query-value)
- [moment.js](https://momentjs.com/)
- [lodash](https://lodash.com/)

# Starter code
- Change to branch `ajax-master`
- Create a new branch `[your-initials]-ajax-solution`
- Run `$ npm install`
- Run `$ npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && sequelize-cli db:seed:all`

# Reminder
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

# Requirements
**You are tasked to change the majority of routes and views of the app to use AJAX.**

> HINT: You can move unwanted files to a folder call `views/old` or `routes/old` then delete them after you implement them!

> HINT: You can comment out codes! Make sure the structure is correct then change the code!

## Routes
You should refactor your routes to look like the following:
```txt
routes
  index.js
    PAGES       | ANY    '/'     // refers to routes/pages/index.js
    API         | ANY    '/api'  // refers to routes/api/index.js
  pages // Everything in here is for browser
    index.js
      HOME      | GET   '/'
      WISHLISTS | ANY   '/wishlists' // refers to routes/pages/wishlists.js
      NOT FOUND | GET   '*'
    wishlists.js
      INDEX     | GET     '/wishlists'
  api // Everything in here is for AJAX
    index.js
      WISHLISTS | ANY   '/wishlists' // refers to routes/api/wishlists.js
      NOT FOUND | GET   '*'
    wishlists.js
      CREATE    | POST   '/wishlists'
      NEW       | GET    '/wishlists/new'
      SHOW      | GET    '/wishlists/:id'
      DELETE    | DELETE '/wishlists/:id'
      UPDATE    | PUT    '/wishlists/:id'
      EDIT      | GET    '/wishlists/:id/edit'
```

## Views
You should refactor your views to look like the following:
```txt
views
  _partials
    navbar.ejs
    modal.ejs
  api
    wishlists
      _partials
        form-wishlist-item-inputs.ejs
        form.ejs
      edit.ejs
      new.ejs
      not-found.ejs
      show.ejs
  pages
    static
      home.ejs
    wishlists
      index.ejs
  layouts.ejs
  not-found.ejs
```

## The Wishlist Index Features
> The following is the **user stories** and **general logic** for Wishlist Index Page.

> NOTE: The **general logic includes the general steps**, but **does not include the variables need to complete the task**. Please refer to [lesson-restful-api#filtering](https://github.com/dented-academy/lesson-restful-api/tree/filtering) to get an idea what variables is need.

- Users can **see** a list of wishlists
- Users can **see** a single wishlist in a modal by clicking the `Wishlist Title`
  - Show the modal with a `loading spinner`
  - `GET` the wishlist item through ajax
    - Upon **successful** get, show the wishlist contents in the modal
    - Upon **failing** get, display error messages in the model
- Users can **see** a wishlist-form in a modal by clicking a `New Button`
  - Show the modal with a `loading spinner`
  - `GET` the wishlist form template through ajax
    - Upon **successful** get, show the wishlist-form in the modal
- Users can **see** a wishlist-form in a model by clicking a `Edit Button`
  - Show the modal with a `loading spinner`
  - `GET` the wishlist form template through ajax
    - Upon **successful** get, show the wishlist-form in the modal
- Users can **create** wishlist by clicking a `Submit` in the wishlist-form
  - Create a `FormData` with form values
  - `POST` the wishlist through ajax
    - Upon **successful** create, show the wishlist contents in the modal
    - Upon **failing** create, display error messages in the form
- Users can **update** wishlist by clicking a `Submit` in the wishlist-form
  - Create a `FormData` with form values
  - `PUT` the wishlist through ajax
    - Upon **successful** update, show the wishlist contents in the modal
    - Upon **failing** update, display error messages in the form
- Users can **delete** a wishlist by clicking a `Delete Button`
  - **Disable** all `Delete Buttons` to prevent users from deleting other wishlist
  - `DELETE` the wishlist item through ajax
    - Upon **successful** delete, remove the corresponding HTML from DOM
    - Upon **failing** delete, prompt an alert the error message
    - Upon **complete** **enable** all `Delete Buttons`

# Bonus
- Add a `search input` in `views/wishlists/index.ejs` to filter `Wishlist.title`
- Add a `pagination` in `views/wishlists/index.ejs`
- Add `Edit Button` to `Wishlist Show Modal`
- Add `Delete Button` to `Wishlist Show Modal`
- After creating a new wishlist, prepend item to the top of the list

# Deliverables
## Home Page
![Screen](https://i.imgur.com/a1TUGef.png)

## Wishlists Index Page
![Screen](https://i.imgur.com/Mkrhskq.png)

## Wishlists Show Modal
![Screen](https://i.imgur.com/OneZ5MG.png)

## Wishlists New Modal & Edit Modal Before Submit
![Screen](https://i.imgur.com/2qqG2kp.png)

## Wishlists New Modal & Edit Modal After Submit
![Screen](https://i.imgur.com/84vRAPV.png)

## Modal When Wishlist Is Not Found
![Screen](https://i.imgur.com/QpoAFcn.png)

## Not Found Page When No Route Found
![Screen](https://i.imgur.com/AhwuIxU.png)

# Bonus Deliverables
## Wishlists Index Page
![Screen](https://i.imgur.com/TCv7598.png)

## Wishlists Show Modal
![Screen](https://i.imgur.com/3d6hDgT.png)