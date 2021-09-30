// Libraries used to create the server
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const compileSass = require('express-compile-sass')
const methodOverride = require('method-override')
const morgan = require('morgan')
const moment = require("moment")
const router = require('./routes')
const multer = require('multer')


const app = express() // The instance that "host" our server
const port = 3000 // The port number our server runs on

// Allow views to have access to moment library
app.locals.moment = moment

// Setting the folder for our views and setting ejs as our views engine
app.set('views', './views')
app.set('view engine', 'ejs')

// Allows us to use a layout.ejs file as our layout
app.use(expressLayouts)

// Allows us to use scss
app.use(compileSass({
  root: `${process.cwd()}/public`,
  sourceMap: true,
  sourceComments: true,
  watchFiles: true,
  logToConsole: false
}))

// Defining folder paths for browser to access files
app.use(express.static('public'))
app.use('/bootstrap',  express.static('node_modules/bootstrap/dist/js'))
app.use('/jquery',  express.static('node_modules/jquery/dist'))

// Parse url queries and json to object to be used in req.query and req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(multer().none()) // parse FormData to req.body

// axios
app.use('/axios',  express.static('node_modules/axios/dist'))


// Give forms the ability to use DELETE and PUT method
app.use(methodOverride('_method'))

// Prints out request information
app.use(morgan('tiny'))

// Defining the routes for our server
app.use('/', router)

// Starts the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
