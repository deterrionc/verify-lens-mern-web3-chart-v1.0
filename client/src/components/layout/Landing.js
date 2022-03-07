import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../img/logo.svg'
import verifylens from '../../img/verifylens.svg'
import welcome from '../../img/welcome.svg'
import telegram from '../../img/telegram.svg'
import instagram from '../../img/instagram.svg'
import linkedin from '../../img/linkedin.svg'
import skype from '../../img/skype.svg'
import facebook from '../../img/facebook.svg'
import youtube from '../../img/youtube.svg'
import metamaskImage from '../../img/metamask.png'
import trustwalletImage from '../../img/trustwallet.png'
import walletconnectImage from '../../img/walletconnect.png'
import ellipseAddress from '../../utils/ellipseAddress'
// import Customer from './Customer'

import tweetpostImage from '../../img/tweetpost.JPG'
import api from '../../utils/api'
import pancakeFactoryV2Abi from '../../abi/pancake-factory-v2-abi.json'
import pancakeLiquidityPoolAbi from '../../abi/pancake-liquidity-pool-abi.json'
import { formatDateTime } from '../../utils/formatDate'
import Spinner from '../layout/Spinner'
import { getGeckoInfo } from '../../actions/token'

// WALLET CONNECT
import WalletConnectProvider from "@walletconnect/web3-provider"
import Web3 from "web3"
import Web3Modal from "web3modal"

const pancakeFactoryV2ContractAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
const bnbContractAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
const bnbDivisor = 18
const apiKey = 'FNQ5D1XG3IMZ55SU8NR1W9KE8AMC8IYPAC'

const Landing = ({ isAuthenticated, getGeckoInfo, tokenImage, geckoInfoLoaded }) => {
  const userType1 = true
  const [userType2, setUserType2] = React.useState(false)
  const [userType3, setUserType3] = React.useState(false)

  const [web3, setWeb3] = React.useState(null)
  const [walletAddress, setWalletAddress] = React.useState(null)

  const providerOptions = {}

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  })

  const connectWallet = async (type) => {
    if (type === 'metamask') {
      let provider = await web3Modal.connect()
      let _web3 = new Web3(provider)
      setWeb3(_web3)
      let accounts = await _web3.eth.getAccounts()
      setWalletAddress(accounts[0].toLowerCase())
      localStorage.setItem('walletAddress', accounts[0].toLowerCase())
      setUserType2(true)
    } else if (type === 'wallet connect') {
      let provider = new WalletConnectProvider({
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
      })
      await provider.enable()
      let _web3 = new Web3(provider)
      setWeb3(_web3)
      let accounts = await _web3.eth.getAccounts()
      setWalletAddress(accounts[0].toLowerCase())
      localStorage.setItem('walletAddress', accounts[0].toLowerCase())
      setUserType2(true)
    } else if (type === 'trust wallet') {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              56: 'https://bsc-dataseed1.binance.org'
            },
            chainId: 56
          }
        }
      }

      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      })

      const provider = await web3Modal.connect();
      await web3Modal.toggleModal();

      // regular web3 provider methods
      const newWeb3 = new Web3(provider);
      setWeb3(newWeb3)
      const accounts = await newWeb3.eth.getAccounts();
      setWalletAddress(accounts[0].toLowerCase())
      setUserType2(true)
    }
  }

  const disconnectWallet = async () => {
    setWalletAddress(null)
    localStorage.setItem('walletAddress', 'null')
    setUserType2(false)
  }

  React.useEffect(() => {
    let _walletAddress = localStorage.getItem('walletAddress')
    if (web3) {
      setWalletAddress(_walletAddress)
    }
  }, [web3])

  const [searchKey, setSearchKey] = React.useState('')

  // Liquidity Pool Information
  const [totalSupply, setTotalSupply] = React.useState('')
  const [circulatingSupply, setCirculatingSupply] = React.useState('')
  const [noOfHolders, setNoOfHolders] = React.useState('')
  const [liquidity, setLiquidity] = React.useState('')
  const [liquidityInfoLoaded, setLiquidityInfoLoaded] = React.useState(false)

  // Token Info
  const [tokenName, setTokenName] = React.useState('')
  const [symbol, setSymbol] = React.useState('')
  const [contractAddress, setContractAddress] = React.useState('')
  const [tokenDescription, setTokenDescription] = React.useState('')
  const [tokenPriceUSD, setTokenPriceUSD] = React.useState('')
  const [tokenInfoLoaded, setTokenInfoLoaded] = React.useState(false)

  // Top Holders & Top 20 Wallet Address
  const [topHolders, setTopHolders] = React.useState([])
  const [top20Holders, setTop20Holders] = React.useState([])
  const [topHoldersLoaded, setTopHoldersLoaded] = React.useState(false)

  // Transactions
  const [transactions, setTransactions] = React.useState([])
  const [transactionsLoaded, setTransactionsLoaded] = React.useState(false)

  // Function Detected
  const [functionDetectedLoaded, setFunctionDetectedLoaded] = React.useState(false)

  // Owner Analysis
  const [ownerAnalysisLoaded, setOwnerAnalysisLoaded] = React.useState(false)

  // Burn Information
  const [lpAddress, setLpAddress] = React.useState(false)
  const [lpTokenAmount, setLpTokenAmount] = React.useState(false)
  const [burned, setBurned] = React.useState(false)
  const [burnInfoLoaded, setBurnInfoLoaded] = React.useState(false)

  // Verify Lens Score
  const [verifyLensScore, setVerifyLensScore] = React.useState(0)

  // Lens Score
  const [lensScoreLoaded, setLensScoreLoaded] = React.useState(false)

  // Honey Pot Test
  const [honeyPotTestLoaded, setHoneyPotTestLoaded] = React.useState(false)

  const getPageData = async () => {
    setLiquidityInfoLoaded(false)
    setTokenInfoLoaded(false)
    setTopHoldersLoaded(false)
    setTransactionsLoaded(false)

    setFunctionDetectedLoaded(false)
    setOwnerAnalysisLoaded(false)
    setBurnInfoLoaded(false)
    setLensScoreLoaded(false)
    setHoneyPotTestLoaded(false)

    getGeckoInfo(searchKey)
    let res = await api.get(`https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${searchKey}&apikey=${apiKey}`)

    let _verifyLensScore = 0

    if (res.data.status === '1') {
      let tokenInfo = res.data.result[0]

      // Token Info
      setTokenName(tokenInfo.tokenName)
      setSymbol(tokenInfo.symbol)
      setContractAddress(tokenInfo.contractAddress)
      setTokenDescription(tokenInfo.description)
      setTokenPriceUSD(tokenInfo.tokenPriceUSD)
      setTokenInfoLoaded(true)

      // Liquidity Pool Information
      setTotalSupply(Math.round(Number(tokenInfo.totalSupply)))

      let res1 = await api.get(`https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=${searchKey}&apikey=${apiKey}`)
      setCirculatingSupply(Math.round(res1.data.result / 10 ** tokenInfo.divisor))

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
      setTransactionsLoaded(true)

      // Top Holders
      let res2 = await api.get(`https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${searchKey}&apikey=${apiKey}`)
      let holders = res2.data.result
      if (holders.length === 10000) {
        setNoOfHolders('over 10000')
      } else {
        setNoOfHolders(holders.length)
      }

      if (holders.length > 20) {
        _verifyLensScore++
      }

      // Burn Information
      let _burned = 0
      let _burnedHolders = holders.filter(holder => holder.TokenHolderAddress === '0x000000000000000000000000000000000000dead')
      _burnedHolders.forEach(holder => {
        _burned += (Number(holder.TokenHolderQuantity) / 10 ** tokenInfo.divisor)
      })
      setBurned((_burned / tokenInfo.totalSupply * 100).toFixed(2))

      holders = holders.filter(holder => holder.TokenHolderAddress !== '0x000000000000000000000000000000000000dead')
      holders = holders.sort((a, b) => Number(b.TokenHolderQuantity) - Number(a.TokenHolderQuantity))
      let _top3Holders = holders.slice(0, 3)
      _top3Holders.forEach(holder => {
        holder.TokenHolderQuantity = (holder.TokenHolderQuantity / 10 ** tokenInfo.divisor).toFixed(3)
        holder.TokenHolderUSD = (tokenInfo.tokenPriceUSD * holder.TokenHolderQuantity).toFixed(3)
        holder.TokenHolderPercent = ((holder.TokenHolderQuantity / tokenInfo.totalSupply) * 100).toFixed(2)
        holder.TokenHolderQuantity = holder.TokenHolderQuantity + ' ' + tokenInfo.symbol
      })
      let _top20Holders = holders.slice(0, 20)
      setTopHolders(_top3Holders)
      setTop20Holders(_top20Holders)
      setTopHoldersLoaded(true)


      if (web3) {
        let tokenAbi = JSON.parse((await api.get(`https://api.bscscan.com/api?module=contract&action=getabi&address=${searchKey}&apikey=${apiKey}`)).data.result)
        _verifyLensScore++
        let tokenContract = new web3.eth.Contract(tokenAbi, searchKey)
        let tokenBalance = await tokenContract.methods.balanceOf(walletAddress).call()
        let owner = await tokenContract.methods.owner().call()
        if (owner) {
          _verifyLensScore++
        }
        if (Number(tokenBalance) > 0) {
          setUserType3(true)
        } else {
          setUserType3(false)
        }

        let contract = new web3.eth.Contract(pancakeFactoryV2Abi, pancakeFactoryV2ContractAddress)
        let LP_contract_address = await contract.methods.getPair(searchKey, bnbContractAddress).call()
        _verifyLensScore++
        setLpAddress(LP_contract_address)  // Burn Information
        let LP_contract = new web3.eth.Contract(pancakeLiquidityPoolAbi, LP_contract_address)
        let token0 = await LP_contract.methods.token0().call()
        let _liquidity = await LP_contract.methods.getReserves().call()
        if (String(token0) === String(bnbContractAddress)) {
          setLiquidity((_liquidity[0] / 10 ** bnbDivisor).toFixed(3))
          setLpTokenAmount((_liquidity[1] / 10 ** tokenInfo.divisor).toFixed(3)) // Burn Information
          setLiquidityInfoLoaded(true)
        } else {
          setLiquidity((_liquidity[1] / 10 ** bnbDivisor).toFixed(3))
          setLpTokenAmount((_liquidity[0] / 10 ** tokenInfo.divisor).toFixed(3)) // Burn Information
          setLiquidityInfoLoaded(true)
        }
        setBurnInfoLoaded(true)
      }
      setVerifyLensScore(_verifyLensScore)
      setLensScoreLoaded(true)
    } else {
      alert('Invalid Token Address')
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div className='bg-landing container-fluid'>
      <div className='top-header p-4'>
        <div className='row align-items-center'>
          <div className='col-md-6'>
            <div className='logo'>
              <img alt='SETIMAGE' src={logo} className='img-fluid' />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='wallet text-right'>
              {walletAddress
                ?
                <>
                  <span className='mr-3 text-white'>{ellipseAddress(walletAddress)}</span>
                  <button
                    className='wallet-button rounded-pill btn'
                    onClick={() => disconnectWallet()}
                  >
                    Disconnect
                  </button>
                </>
                :
                <button
                  className='wallet-button rounded-pill btn'
                  data-toggle="modal" data-target="#myModal"
                  id='connect-button'
                >
                  Connect Wallet
                </button>
              }
            </div>
          </div>
        </div>
      </div>
      {(tokenInfoLoaded) ?
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Contract Address"
                      value={searchKey}
                      onChange={e => setSearchKey(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-light" onClick={() => getPageData()}>
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
                    {(liquidityInfoLoaded || totalSupply)
                      ?
                      <div className='row align-items-center'>
                        <div className='col-6 customer-page-box-subtitle pl-4'>Total Supply</div>
                        <div className='col-6 customer-page-box-text text-break'>: {totalSupply}</div>
                        {liquidityInfoLoaded ?
                          <>
                            <div className='col-6 customer-page-box-subtitle pl-4 pt-1'>Circulating Supply</div>
                            <div className='col-6 customer-page-box-text text-break pt-1'>: {circulatingSupply}</div>
                            <div className='col-6 customer-page-box-subtitle pl-4 pt-1'>No.of.holders</div>
                            <div className='col-6 customer-page-box-text text-break pt-1'>: {noOfHolders}</div>
                            <div className='col-6 customer-page-box-subtitle pl-4 pt-1'>Liquidity</div>
                            <div className='col-6 customer-page-box-text text-break pt-1'>: {liquidity} BNB</div>
                          </>
                          :
                          null
                        }
                      </div>
                      :
                      <Spinner />
                    }
                  </div>
                </div>
                <div className='col-lg-9 my-2'>
                  <div className='customer-page-box'>
                    <div className='text-center customer-page-box-title pt-2'>
                      Token Info
                    </div>
                    {tokenInfoLoaded
                      ?
                      <>
                        <div className='row align-items-center m-2'>
                          <div className='text-center'>
                            {geckoInfoLoaded
                              ?
                              <img alt='SETIMAGE' src={tokenImage} className='img-fluid' width='70px' height='70px' />
                              :
                              null
                            }
                          </div>
                          <div className='ml-2'>
                            <div className='customer-page-box-title'>
                              {tokenName}
                            </div>
                            <div>
                              <span className='customer-page-box-subtitle'>Symbol: </span>
                              <span className='customer-page-box-text'>{symbol}</span>
                              <span className='customer-page-box-subtitle ml-3'>USD Price: </span>
                              <span className='customer-page-box-text'>{tokenPriceUSD}</span>
                            </div>
                            <div>
                              <span className='customer-page-box-subtitle'>Contract Address: </span>
                              <span className='customer-page-box-text text-break'>{contractAddress}</span>
                            </div>
                          </div>
                        </div>
                        <div className='m-2 text-justify customer-page-box-text'>
                          {tokenDescription}
                        </div>
                      </>
                      :
                      <Spinner />
                    }
                  </div>
                </div>
              </div>
              {userType1 && userType2 && userType3
              // {userType1 && userType2
                ?
                <div className='row'>
                  <div className='col-lg-3 my-2'>
                    <div className='customer-page-box p-3'>
                      {functionDetectedLoaded
                        ?
                        <>
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
                        </>
                        :
                        <Spinner />
                      }
                    </div>
                  </div>
                  <div className='col-lg-9 my-2'>
                    <div className='customer-page-box p-2'>
                      <div className='customer-page-box-title text-center p-2'>
                        Owner Analysis
                      </div>
                      {ownerAnalysisLoaded
                        ?
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
                        :
                        <Spinner />
                      }
                    </div>
                  </div>
                </div>
                :
                null
              }
              {userType1 && userType2 && userType3
              // {userType1 && userType2
                ?
                <div className='row'>
                  <div className='col-lg-3 my-2'>
                    <div className='customer-page-box'>
                      <div className='customer-page-box-title text-center p-2'>
                        Burn Information
                      </div>
                      {burnInfoLoaded
                        ?
                        <>
                          <div className='p-2'>
                            <div className='customer-page-box-subtitle'>
                              LP address (WTW / WBNB) :
                            </div>
                            <div className='customer-page-box-text text-break'>
                              {ellipseAddress(lpAddress)}
                            </div>
                            <div className='customer-page-box-text text-break'>
                              {symbol}: {lpTokenAmount} ({(lpTokenAmount / totalSupply * 100).toFixed(2)} % LP Holding of Market Cap)
                            </div>
                          </div>
                          <div className='row p-2'>
                            <div className='col-6 customer-page-box-subtitle'>Burned:</div>
                            <div className='col-6 customer-page-box-text'>{burned} %</div>
                          </div>
                        </>
                        :
                        <Spinner />
                      }
                    </div>
                  </div>
                  <div className='col-lg-9 my-2'>
                    <div className='customer-page-box p-2'>
                      <div className='customer-page-box-title text-center p-2'>
                        Top Holders
                      </div>
                      {topHoldersLoaded
                        ?
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
                        :
                        <Spinner />
                      }
                    </div>
                  </div>
                </div>
                :
                null
              }
              {userType1 && userType2
                ?
                <div className='row'>
                  <div className='col-lg-7 my-2'>
                    <div className='customer-page-box'>
                      <div className='customer-page-box-title text-center pt-3 pb-2'>
                        VerifyLens Score:   {verifyLensScore} / 4
                      </div>
                      {lensScoreLoaded
                        ?
                        <>
                          <div className='text-center'>
                            <button className='btn btn-sm customer-page-box-btn px-4'>Low risk</button>
                          </div>
                          <div className='customer-page-box-text p-2 text-justify'>
                            <div>Reason:</div>
                            This Token is identified as low risk due to a number of factors which can include,
                            lower price impact of top holders, locked Liquidty pool, safe contract code
                            and renounced contract.
                          </div>
                        </>
                        :
                        <Spinner />
                      }
                    </div>
                  </div>
                  <div className='col-lg-5 my-2'>
                    <div className='customer-page-box'>
                      <div className='customer-page-box-title text-center pt-3 pb-1'>
                        Honey pot Test
                      </div>
                      {honeyPotTestLoaded
                        ?
                        <div className='p-3 text-justify'>
                          <div className='customer-page-box-text'>
                            ⚠️ A trading fee of over 10% but less then 20% was detected when selling or buying this token. Our system was however able to sell the token again.
                          </div>
                          <div className='text-right'>
                            <span className='customer-page-box-subtitle'>Test By: </span>
                            <span className='customer-page-box-text'>RugDoc</span>
                          </div>
                        </div>
                        :
                        <Spinner />
                      }
                    </div>
                  </div>
                </div>
                :
                null
              }

              <div className='row'>
                {userType1 && userType2 && userType3
                // {userType1 && userType2
                  ?
                  <div className='col-lg-4 my-2'>
                    <div className='customer-page-box'>
                      <div className='customer-page-box-title text-center p-2'>
                        Top 20 Wallet Address
                      </div>
                      {topHoldersLoaded
                        ?
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
                        :
                        <Spinner />
                      }
                    </div>
                  </div>
                  :
                  tokenInfoLoaded
                    ?
                    <div className='col-lg-4 my-2'>
                      <div className='customer-page-box'>
                        <div className='customer-page-box-title text-center p-2'>
                          Contract Analysis
                        </div>
                        <div className='d-flex align-items-center customer-page-box-text py-1 '>
                          <i className='fa fa-check ml-3 mr-2'></i>
                          <div className='customer-page-box-texttext-justify'>Verified contract source </div>
                        </div>
                        <div className='d-flex align-items-center customer-page-box-text py-1 '>
                          <i className='fa fa-check ml-3 mr-2'></i>
                          <div className='customer-page-box-texttext-justify'>No prior similar token contracts</div>
                        </div>
                        <div className='d-flex align-items-center customer-page-box-text py-1 '>
                          <i className='fa fa-remove text-danger ml-3 mr-2'></i>
                          <div className='customer-page-box-texttext-justify'>Ownership renounced or source does not contain an owner contract</div>
                        </div>
                      </div>
                    </div>
                    :
                    null
                }
                {userType1 && userType2
                  ?
                  <div className='col-lg-8 my-2'>
                    <div className='customer-page-box'>
                      <div className='customer-page-box-title text-center py-3'>
                        Recent 20 Transaction
                      </div>
                      {transactionsLoaded
                        ?
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
                        :
                        <Spinner />
                      }
                    </div>
                  </div>
                  :
                  null
                }
              </div>
            </div>
            <div className='col-lg-2'>
              <img alt='SETIMAGE' src={tweetpostImage} className='img-fluid rounded-lg my-2' />
            </div>
          </div>
        </div>
        :
        <>
          <div className='row welcome'>
            <div className='col-lg-3'></div>
            <div className='col-lg-6'>
              <div className='text-center'>
                <div className='py-2 px-3'>
                  <img alt='SETIMAGE' src={welcome} className='img-fluid' />
                </div>
                <div className='pt-4'>
                  <img alt='SETIMAGE' src={verifylens} className='img-fluid' />
                </div>
                <hr />
                <div className='bringing-transparency pt-3'>
                  <div className='mx-3'>
                    Bringing Transparency And Accountability To The Crypto Space
                  </div>
                </div>
                <div className='search pt-5 mt-2'>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white">
                        <i className='fa fa-search'></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Contract Address"
                      value={searchKey}
                      onChange={e => setSearchKey(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-light" onClick={() => getPageData()}>
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
          <div className='func-buttons my-5'>
            <div className='row'>
              <div className='col-lg-1'></div>
              <div className='col-lg-10'>
                <div className='row'>
                  <div className='col-lg-1'></div>
                  <div className='col-lg-2 text-center'>
                    <button
                      className='btn rounded-pill my-2'
                    >
                      Buy VRFY
                    </button>
                  </div>
                  <div className='col-lg-2 text-center'>
                    <button
                      className='btn rounded-pill my-2'
                    >
                      Live Chart
                    </button>
                  </div>
                  <div className='col-lg-2 text-center'>
                    <button
                      className='btn rounded-pill my-2'
                    >
                      Telegram
                    </button>
                  </div>
                  <div className='col-lg-2 text-center'>
                    <button
                      className='btn rounded-pill my-2'
                    >
                      Facebook
                    </button>
                  </div>
                  <div className='col-lg-2 text-center'>
                    <button
                      className='btn rounded-pill my-2'
                    >
                      Twitter
                    </button>
                  </div>
                  <div className='col-lg-1'></div>
                </div>
              </div>
              <div className='col-lg-1'></div>
            </div>
          </div>
        </>
      }

      <div className='mt-5 pt-4 text-white text-center'>
        © 2022 Verifylens.com. All rights reserved.
      </div>
      <div className='py-3 text-center'>
        <img alt='SETIMAGE' src={telegram} width='40' height='40' className='img-fluid mx-1' />
        <img alt='SETIMAGE' src={instagram} width='37' height='37' className='img-fluid mx-1' />
        <img alt='SETIMAGE' src={linkedin} width='37' height='37' className='img-fluid mx-1' />
        <img alt='SETIMAGE' src={skype} width='37' height='37' className='img-fluid mx-1' />
        <img alt='SETIMAGE' src={facebook} width='37' height='37' className='img-fluid mx-1' />
        <img alt='SETIMAGE' src={youtube} width='37' height='37' className='img-fluid mx-1' />
      </div>

      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-sm">
          <div className="modal-content bg-dark text-white">

            <div className="modal-header border-0">
              <h6 className="modal-title">Connect Wallet</h6>
              <button type="button" className="close text-white" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              <div
                className='p-2 border border-info rounded-xl border-width-3 cursor-pointer mb-2'
                onClick={() => connectWallet('metamask')}
                data-dismiss="modal"
              >
                <img alt='SETIMAGE' src={metamaskImage} width='40' height='40' className='img-fluid ml-3' />
                <span className='ml-3'>Metamask</span>
              </div>
              <div
                className='p-2 border border-info rounded-xl border-width-3 cursor-pointer mb-2'
                onClick={() => connectWallet('trust wallet')}
                data-dismiss="modal"
              >
                <img alt='SETIMAGE' src={trustwalletImage} width='40' height='40' className='img-fluid ml-3' />
                <span className='ml-3'>Trust Wallet</span>
              </div>
              <div
                className='p-2 border border-info rounded-xl border-width-3 cursor-pointer mb-2'
                onClick={() => connectWallet('wallet connect')}
                data-dismiss="modal"
              >
                <img alt='SETIMAGE' src={walletconnectImage} width='40' height='40' className='img-fluid ml-3' />
                <span className='ml-3'>WalletConnect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  geckoInfoLoaded: state.token.loaded,
  tokenImage: state.token.image
})

export default connect(mapStateToProps, { getGeckoInfo })(Landing)
