
let express = require('express')
let config = require('./config/config.json')
const bodyParser = require('body-parser')
const request = require('request')
const { default: axios } = require('axios')
const getAccess = require('./utils/bnplsigin')
const preApp = require('./utils/preapp')

const port = config.PORT || 5000
let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/preapp", async (req, res) => {
  try {
    let accessToken = await getAccess()
    console.log(accessToken)
    let preappResponse = await preApp(accessToken.access)
    console.log(preappResponse.data)
    res.json(req.body)
  } catch (e) {
    console.log(e.response.data)
  }
})

app.get('/callback', (req, res)=>{
  console.log("GET", req.body)
  console.log("GET", req.params)
  console.log("GET", req.query)
  res.redirect('/')
})

app.post('/callback', (req, res)=>{
  console.log("POST", req.body)
  console.log("POST", req.params)
  res.redirect('/')
})

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.listen(port, () => {
  console.log(`localhsot:${port}`)
})