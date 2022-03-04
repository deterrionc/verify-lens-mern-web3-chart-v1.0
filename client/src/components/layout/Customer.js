import React from 'react'
import tweetpostImage from '../../img/tweetpost.JPG'
import vetterTokenImage from '../../img/vettertoken.svg'
import api from '../../utils/api'
import pancakeFactoryV2Abi from '../../abi/pancake-factory-v2-abi.json'
import pancakeLiquidityPoolAbi from '../../abi/pancake-liquidity-pool-abi.json'
import ellipseAddress from '../../utils/ellipseAddress'
import { formatDateTime } from '../../utils/formatDate'

const pancakeFactoryV2ContractAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
const bnbContractAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
const bnbDivisor = 18
const apiKey = 'FNQ5D1XG3IMZ55SU8NR1W9KE8AMC8IYPAC'

const Customer = ({ walletAddress, web3 }) => {
  const searchKey = '0x6169b3b23e57de79a6146a2170980ceb1f83b9e0'

  // Liquidity Pool Information
  const [totalSupply, setTotalSupply] = React.useState('')
  const [circulatingSupply, setCirculatingSupply] = React.useState('')
  const [noOfHolders, setNoOfHolders] = React.useState('')
  const [liquidity, setLiquidity] = React.useState('')

  // Token Info
  const [tokenName, setTokenName] = React.useState('')
  const [symbol, setSymbol] = React.useState('')
  const [contractAddress, setContractAddress] = React.useState('')
  const [tokenDescription, setTokenDescription] = React.useState('')

  // Top Holders
  const [topHolders, setTopHolders] = React.useState([])

  // Top 20 Wallet Address
  const [top20Holders, setTop20Holders] = React.useState([])

  // Transactions
  const [transactions, setTransactions] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      let res = await api.get(`https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${searchKey}&apikey=${apiKey}`)

      if (res.data.status === '1') {
        let tokenInfo = res.data.result[0]

        // Token Info
        setTokenName(tokenInfo.tokenName)
        setSymbol(tokenInfo.symbol)
        setContractAddress(tokenInfo.contractAddress)
        setTokenDescription(tokenInfo.description)

        // Liquidity Pool Information
        setTotalSupply(Math.round(Number(tokenInfo.totalSupply)))

        let res1 = await api.get(`https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=${searchKey}&apikey=${apiKey}`)
        setCirculatingSupply(Math.round(res1.data.result / 10 ** tokenInfo.divisor))

        let res2 = await api.get(`https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${searchKey}&apikey=${apiKey}`)
        let holders = res2.data.result
        if (holders.length === 10000) {
          setNoOfHolders('over 10000')
        } else {
          setNoOfHolders(holders.length)
        }

        // Transactions
        let res3 = await api.get(`https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${searchKey}&page=1&offset=20&sort=desc&apikey=${apiKey}`)
        let _transactions = res3.data.result
        _transactions.forEach(transaction => {
          transaction.token1 = (transaction.value / 10 ** transaction.tokenDecimal).toFixed(3) + ' ' + transaction.tokenSymbol
          transaction.time1 = formatDateTime(Number(transaction.timeStamp) * 1000)
          transaction.hash1 = ellipseAddress(transaction.hash)
          transaction.value1 = (transaction.value / 10 ** transaction.tokenDecimal * tokenInfo.tokenPriceUSD).toFixed(3)
          transaction.gas1 = transaction.gasUsed * transaction.gasPrice / 10 ** bnbDivisor
        })
        setTransactions(_transactions)

        // Top Holders
        holders = holders.filter(holder => holder.TokenHolderAddress !== '0x000000000000000000000000000000000000dead')
        holders = holders.sort((a, b) => Number(b.TokenHolderQuantity) - Number(a.TokenHolderQuantity))
        let _top3Holders = holders.slice(0, 3)
        _top3Holders.forEach(holder => {
          holder.TokenHolderQuantity = (holder.TokenHolderQuantity / 10 ** tokenInfo.divisor).toFixed(3)
          holder.TokenHolderUSD = (tokenInfo.tokenPriceUSD * holder.TokenHolderQuantity).toFixed(3)
          holder.TokenHolderPercent = ((holder.TokenHolderQuantity / tokenInfo.totalSupply) * 100).toFixed(2)
        })
        let _top20Holders = holders.slice(0, 20)
        setTopHolders(_top3Holders)
        setTop20Holders(_top20Holders)



        if (web3) {
          let contract = new web3.eth.Contract(pancakeFactoryV2Abi, pancakeFactoryV2ContractAddress)
          let LP_contract_address = await contract.methods.getPair(searchKey, bnbContractAddress).call()
          let LP_contract = new web3.eth.Contract(pancakeLiquidityPoolAbi, LP_contract_address)
          let token0 = await LP_contract.methods.token0().call()
          let _liquidity = await LP_contract.methods.getReserves().call()
          if (String(token0) === String(bnbContractAddress)) {
            setLiquidity((_liquidity[0] / 10 ** bnbDivisor).toFixed(3))
          } else {
            setLiquidity((_liquidity[1] / 10 ** bnbDivisor).toFixed(3))
          }
        }
      } else {
        alert('Invalid Token Address')
      }
    }
    fetchData()
  }, [web3])

  return (
    <div className='customer-landing'>
      <div className='row welcome'>
        <div className='col-lg-3'></div>
        <div className='col-lg-6'>
          <div className='text-center'>
            <div className='search'>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white">
                    <i className='fa fa-search'></i>
                  </span>
                </div>
                <input type="text" className="form-control" placeholder="Search Contract Address" />
                <div className="input-group-append">
                  <button className="btn btn-light">
                    <span className='badge badge-dark rounded-pill px-3 py-2'>
                      Search
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-3'></div>
      </div>
      <div className='row'>
        <div className='col-lg-10'>

          <div className='row'>
            <div className='col-lg-3 my-2'>
              <div className='customer-page-box p-1'>
                <div className='text-center customer-page-box-title p-2'>
                  Liquidity Pool Information
                </div>
                <div className='row align-items-center'>
                  <div className='col-6 customer-page-box-subtitle pl-4'>Total Supply</div>
                  <div className='col-6 customer-page-box-text text-break'>: {totalSupply}</div>
                  <div className='col-6 customer-page-box-subtitle pl-4 pt-1'>Circulating Supply</div>
                  <div className='col-6 customer-page-box-text text-break pt-1'>: {circulatingSupply}</div>
                  <div className='col-6 customer-page-box-subtitle pl-4 pt-1'>No.of.holders</div>
                  <div className='col-6 customer-page-box-text text-break pt-1'>: {noOfHolders}</div>
                  <div className='col-6 customer-page-box-subtitle pl-4 pt-1'>Liquidity</div>
                  <div className='col-6 customer-page-box-text text-break pt-1'>: {liquidity} BNB</div>
                </div>
              </div>
            </div>
            <div className='col-lg-9 my-2'>
              <div className='customer-page-box'>
                <div className='row align-items-center m-2'>
                  <div className='text-center'>
                    <img alt='SETIMAGE' src={vetterTokenImage} className='img-fluid' />
                  </div>
                  <div className='ml-2'>
                    <div className='customer-page-box-title'>
                      {tokenName}
                    </div>
                    <div>
                      <span className='customer-page-box-subtitle'>Symbol:</span>
                      <span className='customer-page-box-text'>{symbol}</span>
                    </div>
                    <div>
                      <span className='customer-page-box-subtitle'>Contract Address:</span>
                      <span className='customer-page-box-text text-break'>{contractAddress}</span>
                    </div>
                  </div>
                </div>
                <div className='m-2 text-justify customer-page-box-text'>
                  {tokenDescription}
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-3 my-2'>
              <div className='customer-page-box p-3'>
                <div className='customer-page-box-title font-14 mt-3'>
                  MINT FUNCTION DETECTED <i className='fa fa-question-circle-o text-white'></i>
                </div>
                <div className='customer-page-box-title text-danger'>
                  No
                </div>
                <div className='customer-page-box-title font-14 mt-3'>
                  RENOUNCED OWNERSHIP <i className='fa fa-question-circle-o text-white'></i>
                </div>
                <div className='customer-page-box-title text-success'>
                  Yes
                </div>
              </div>
            </div>
            <div className='col-lg-9 my-2'>
              <div className='customer-page-box p-2'>
                <div className='customer-page-box-title text-center p-2'>
                  Owner analycis
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='table-responsive'>
                      <table className='table table-borderless customer-page-box-text text-center'>
                        <thead>
                          <tr>
                            <th>Wallet address</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>0x6169b3b23e57de79a6146a2170980ceb1f83b9e0</td>
                          </tr>
                          <tr>
                            <td>0x6169b3b23e57de79a6146a2170980ceb1f83b9e0</td>
                          </tr>
                          <tr>
                            <td>0x6169b3b23e57de79a6146a2170980ceb1f83b9e0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='table-responsive'>
                      <table className='table table-borderless customer-page-box-text text-center'>
                        <thead>
                          <tr>
                            <th>Locked Wallet address</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>0x6169b3b23e57de79a6146a2170980ceb1f83b9e0</td>
                          </tr>
                          <tr>
                            <td>0x6169b3b23e57de79a6146a2170980ceb1f83b9e0</td>
                          </tr>
                          <tr>
                            <td>0x6169b3b23e57de79a6146a2170980ceb1f83b9e0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-3 my-2'>
              <div className='customer-page-box'>
                <div className='customer-page-box-title text-center p-2'>
                  Burn Information
                </div>
                <div className='p-2'>
                  <div className='customer-page-box-subtitle'>
                    LP address (WTW / WBNB) :
                  </div>
                  <div className='customer-page-box-text text-break'>
                    0xaf30b1b3f3...7bdaa8152731
                    WTW: 63,662,465,902,400 (10.90% LP Holding of Market Cap)
                  </div>
                </div>
                <div className='row p-2'>
                  <div className='col-6 customer-page-box-subtitle'>Burned:</div>
                  <div className='col-6 customer-page-box-text'>93.57%</div>
                </div>
              </div>
            </div>
            <div className='col-lg-9'>
              <div className='customer-page-box p-2'>
                <div className='customer-page-box-title text-center p-2'>
                  Top Holders
                </div>
                <div className='table-responsive'>
                  <table className='table table-borderless customer-page-box-text text-center'>
                    <thead>
                      <tr>
                        <th>Wallet address</th>
                        <th>Tokens</th>
                        <th>Value($)</th>
                        <th>Value(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topHolders.map((item, index) =>
                        <tr key={index}>
                          <td>{item.TokenHolderAddress}</td>
                          <td>{item.TokenHolderQuantity}</td>
                          <td>$ {item.TokenHolderUSD}</td>
                          <td>{item.TokenHolderPercent} %</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-7 my-2'>
              <div className='customer-page-box'>
                <div className='customer-page-box-title text-center pt-3 pb-2'>
                  VerifyLens Score:   9/10
                </div>
                <div className='text-center'>
                  <button className='btn btn-sm customer-page-box-btn px-4'>Low risk</button>
                </div>
                <div className='customer-page-box-text p-2 text-justify'>
                  <div>Reason:</div>
                  This Token is identified as low risk due to a number of factors which can include,
                  lower price impact of top holders, locked Liquidty pool, safe contract code
                  and renounced contract.
                </div>
              </div>
            </div>
            <div className='col-lg-5 my-2'>
              <div className='customer-page-box'>
                <div className='customer-page-box-title text-center pt-3 pb-1'>
                  Honey pot Test
                </div>
                <div className='p-3 text-justify'>
                  <div className='customer-page-box-text'>
                    ⚠️ A trading fee of over 10% but less then 20% was detected when selling or buying this token. Our system was however able to sell the token again.
                  </div>
                  <div className='text-right'>
                    <span className='customer-page-box-subtitle'>Test By: </span>
                    <span className='customer-page-box-text'>RugDoc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4 my-2'>
              <div className='customer-page-box'>
                <div className='customer-page-box-title text-center p-2'>
                  Top 20 Wallet Address
                </div>
                <div className='table-responsive px-2'>
                  <table className='table table-borderless customer-page-box-text text-center'>
                    <thead>
                      <tr>
                        <th>Wallet address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {top20Holders.map((item, index) =>
                        <tr key={index}>
                          <td>{item.TokenHolderAddress}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='col-lg-8 my-2'>
              <div className='customer-page-box'>
                <div className='customer-page-box-title text-center py-3'>
                  Recent 20 Transaction
                </div>
                <div className='table-responsive'>
                  <table className='table table-borderless customer-page-box-text text-center'>
                    <thead>
                      <tr>
                        <th>TOKENS</th>
                        <th>VALUE</th>
                        <th>GAS PRICE</th>
                        <th>TIME</th>
                        <th>TRANSACTION HASH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((item, index) =>
                        <tr key={index}>
                          <td>{item.token1}</td>
                          <td>$ {item.value1}</td>
                          <td>{item.gas1}</td>
                          <td>{item.time1}</td>
                          <td>{item.hash1}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-2'>
          <img alt='SETIMAGE' src={tweetpostImage} className='img-fluid rounded-lg my-2' />
        </div>
      </div>
    </div>
  )
}

export default Customer