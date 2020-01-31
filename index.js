const express = require('express')
const bodyParser = require('body-parser')
const {
  response
} = requrie('./data.js')

const app = express()
app.use(bodyParser())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

function loggerMiddleware(req, res, next) {
  console.log(`${req.method}: ${req.path}`)
  next()
}
app.use(loggerMiddleware)

app.get('/getResponse', (req, res) => {
  setTimeout(() => res.status(200).end(JSON.stringify(response)), 10)
})
