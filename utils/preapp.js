const { default: axios } = require("axios")

let preApp = async (acceess) => {
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
      "successRedirect": "http://localhost:5555/callback",
      "failRedirect": "http://localhost:5555/callback",
      "postLink": "http://localhost:5555/callback",
      "phoneNumber": "77773295237",
      // "expiresAt": `${new Date(new Date().getTime() + (1000*60*5))}`,
      // "deliveryAt": `${new Date(new Date().getTime() + (1000*60*5))}`,
      "expiresAt": "2023-06-09T14:40:15Z",
      "expiresAt": "2023-06-09T14:40:15Z",
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

module.exports = preApp