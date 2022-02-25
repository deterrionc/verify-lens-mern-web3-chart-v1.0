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

// WALLET CONNECT
import WalletConnectProvider from "@walletconnect/web3-provider"
import Web3 from "web3"
import Web3Modal from "web3modal"

const Landing = ({ isAuthenticated }) => {
  // const [web3, setWeb3] = React.useState(null)
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
      // setWeb3(_web3)
      let accounts = await _web3.eth.getAccounts()
      setWalletAddress(accounts[0].toLowerCase())
      localStorage.setItem('walletAddress', accounts[0].toLowerCase())
    } else if (type === 'wallet connect' || type === 'trust wallet') {
      let provider = new WalletConnectProvider({
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
      })
      await provider.enable()
      let _web3 = new Web3(provider)
      let accounts = await _web3.eth.getAccounts()
      setWalletAddress(accounts[0].toLowerCase())
      localStorage.setItem('walletAddress', accounts[0].toLowerCase())
    }
  }

  const disconnectWallet = async () => {
    setWalletAddress(null)
    localStorage.setItem('walletAddress', 'null')
  }

  React.useEffect(() => {
    let _walletAddress = localStorage.getItem('walletAddress')
    if (_walletAddress === 'null') {
      connectWallet()
    } else {
      setWalletAddress(_walletAddress)
    }
  }, [])

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
                >
                  Connect Wallet
                </button>
              }
            </div>
          </div>
        </div>
      </div>
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
                  Buy VRF
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
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
