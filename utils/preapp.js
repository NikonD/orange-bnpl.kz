const { default: axios } = require("axios")

let toYMDHM = (date) => {
  let _d = new Date(date)
  return `${_d.getFullYear()}-${(_d.getMonth()+1).toString().padStart(2,0)}-${(_d.getDate()).toString().padStart(2,0)}T${(_d.getHours()).toString().padStart(2,0)}:${(_d.getMinutes()).toString().padStart(2,0)}:00Z`
}

let preApp = async (acceess, items) => {
  let itemsQuantity = items.length
  let billAmount = items.reduce((acc, obj) => {
    return acc + parseInt(obj.itemSum)
  },0)

  console.log("itemsQuantity", itemsQuantity)
  console.log("billAmount", billAmount)
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
      "billAmount": billAmount,
      "itemsQuantity": itemsQuantity,
      "items": items,
      "successRedirect": "https://orange-flowers.kz/successful_payment?status=ok",
      "failRedirect": "https://orange-flowers.kz/unsuccessful_payment",
      "postLink": "http://3.76.224.188:33333/callback",
      "expiresAt": `${toYMDHM(new Date(new Date().getTime() + (1000*60*5)))}`,
      "deliveryAt": `${toYMDHM(new Date(new Date().getTime() + (1000*60*5)))}`,
      "deliveryPoint": {
        "region": "",
        "city": "",
        "disctrict": "",
        "street": "",
        "house": "",
        "flat": ""
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
      "Authorization": `Bearer ${acceess}`,
      "Accept": "application/json"
    },
    data: JSON.stringify(data)
  })

  console.log(preappResponse)
  return preappResponse
}

module.exports = {preApp, sendPreapp}