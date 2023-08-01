const { default: axios } = require("axios")
const config = require('../config/config.json')

let getAccess = async () => {
  let signinRespons = await axios({
    url: "https://bnpl.kz/api/users/api/v1/sign-in",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: {
      "password": config.BNPLPASSWORD,
      "username": config.BNPLUSERNAME
    }
  })
  return signinRespons.data
}

module.exports = getAccess