const { default: axios } = require("axios")

let preApp = async (acceess, phone) => {
  console.log(acceess)
  let preappResponse = await axios({
    url: 'https://dev.bnpl.kz/api/bnpl/v3/preapp',
    method: "POST",
    headers: {
      "Authorization": `Bearer ${acceess}`,
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      "partnerData": {
        "partnerName": "orange-flowers.kz",
        "partnerCode": "orange-flowers.kz",
        "pointCode": "01-0010-L1"
      },
      "billNumber": `zqq-${new Date().getTime()}`,
      "billAmount": "6123",
      "itemsQuantity": 1,
      "items": [
        {
          "itemId": "42",
          "itemName": "fg",
          "itemQuantity": "1",
          "itemPrice": "0",
          "itemSum": 6123
        }
      ],
      "successRedirect": "http://3.76.224.188:5555/callback/success",
      "failRedirect": "http://3.76.224.188:5555/callback/failure",
      "postLink": "http://3.76.224.188:5555/callback",
      "phoneNumber": `${phone}`,
      // "expiresAt": `${new Date(new Date().getTime() + (1000*60*5))}`,
      // "deliveryAt": `${new Date(new Date().getTime() + (1000*60*5))}`,
      "expiresAt": "2023-06-10T14:40:15Z",
      "expiresAt": "2023-06-10T14:40:15Z",
      "deliveryPoint": {
        "region": "Notrh Kazakhstan",
        "city": "Petropavl",
        "disctrict": "",
        "street": "Pushkin",
        "house": "89",
        "flat": ""
        // "firstName": "Nikon",
        // "scondName": "Dolgushin"
      }
    })
  })

  console.log("PREAPP" ,preappResponse.data)

  return preappResponse
}


let sendPreapp = async (acceess, data) => {
  let preappResponse = await axios({
    url: "https://dev.bnpl.kz/api/bnpl/v3/preapp",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${acceess}`
    },
    data: data
  })
}

module.exports = {preApp, sendPreapp}