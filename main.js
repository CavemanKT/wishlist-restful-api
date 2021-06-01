const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const compileSass = require('express-compile-sass')
const methodOverride = require('method-override')
const morgan = require('morgan')
const moment = require("moment")
const app = express()
const port = 3000

const router = require('./routes')

app.locals.moment = moment

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(compileSass({
  root: `${process.cwd()}/public`,
  sourceMap: true,
  sourceComments: true,
  watchFiles: true,
  logToConsole: false
}))
app.use(express.static('public'))
app.use('/bootstrap',  express.static('node_modules/bootstrap/dist/js'))
app.use('/jquery',  express.static('node_modules/jquery/dist'))
app.use(expressLayouts)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(morgan('tiny'))

app.use('/', router)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})