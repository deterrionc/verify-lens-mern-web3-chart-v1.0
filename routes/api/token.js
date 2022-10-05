const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('config')

const Axios = axios.create({
  header: {
    'Content-Type': 'application/json'
  }
})

// Selenium Webdriver
const webdriver = require('selenium-webdriver')
const chromeDriver = require('selenium-webdriver/chrome')
const path = require('chromedriver').path
const service = new chromeDriver.ServiceBuilder(path).build()
chromeDriver.setDefaultService(service)
const { By, until } = webdriver
webdriver.promise.USE_PROMISE_MANAGER = false
const options = new chromeDriver.Options()
options.setChromeBinaryPath(config.get('selenium.chromeBinaryPath'))
options.addArguments(
  config.get('selenium.arguments')
)

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

router.get('/getHoneyPotInfo/:address', async (req, res) => {
  const address = req.params.address
  let text = ''
  const driver = await new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()

  try {
    await driver.get(`https://www.bscheck.eu/bsc/${address}`)
    text = await driver.findElement(By.id('report_honeypot'))
    text = await text.getAttribute('innerHTML')

    await driver.close()
    await driver.quit()

    res.json({
      success: true,
      text
    })
  } catch (err) {
    await driver.close()
    await driver.quit()

    res.json({
      success: false
    })
  }
})

module.exports = router