
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
    let preappResponse = await preApp.preApp(accessToken.access, req.body.phone)
    console.log(preappResponse.data)
    res.json(req.body)
  } catch (e) {
    console.log(e.response.data)
  }
})

app.post('/callback', async (req, res) => {
  console.log("POST C", req.body)
  console.log("POST C", req.params)
  let result = req.body
  try {

    // let accessToken = await getAccess()
    // let preappResponse = await preApp.sendPreapp(accessToken.access, req.body)
    // console.log("SEND" ,preappResponse.data)
  } catch (e) {
    console.log(e)
    // res.send(500)
  }
  if ((result.status == "preapproved") || (result.status == "completed")) {
    res.json({ response: result.status == "preapproved" ? result.status : "ok" })
  }
  else {
    res.json({ response: result.status })
  }

  res.json({ response })
})

app.get('/callback/success', (req, res) => {
  console.log("POST S", req.body)
  console.log("POST S", req.params)
  res.send('success')
})

app.get('/callback/falilure', (req, res) => {
  console.log("POST F", req.body)
  console.log("POST F", req.params)
  res.send('failure')
})

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.listen(port, () => {
  console.log(`localhsot:${port}`)
})