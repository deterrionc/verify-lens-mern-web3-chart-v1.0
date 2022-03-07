const express = require('express')
const router = express.Router()
const axios = require('axios')

const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

router.get('/getTokenInfo/:address', async (req, res) => {
  const address = req.params.address
  let response = ''

  try {
    response = await Axios.get(`https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${address}`)

    res.json({
      success: true,
      image: response.data.image.large
    })
  } catch (err) {
    // console.log(err.response.statusText)

    res.json({
      success: false
    })
  }
})

module.exports = router