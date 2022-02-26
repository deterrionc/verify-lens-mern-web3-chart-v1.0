import React from 'react'
import tweetpostImage from '../../img/tweetpost.JPG'
import vetterTokenImage from '../../img/vettertoken.svg'

const Customer = () => {

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
                  <div className='col-6 customer-page-box-text text-break'>:4,000,000,000</div>
                  <div className='col-6 customer-page-box-subtitle pl-4'>Circulating Supply</div>
                  <div className='col-6 customer-page-box-text text-break'>:$7,952,220,224</div>
                  <div className='col-6 customer-page-box-subtitle pl-4'>No.of.holders</div>
                  <div className='col-6 customer-page-box-text text-break'>:9814</div>
                  <div className='col-6 customer-page-box-subtitle pl-4'>Liquidity</div>
                  <div className='col-6 customer-page-box-text text-break'>:$7,952,220,224</div>
                </div>
              </div>
            </div>
            <div className='col-lg-9 my-2'>
              <div className='customer-page-box'>
                <div className='row align-items-center m-2'>
                  <div className='text-center'>
                    <img alt='SETIMAGE' src={vetterTokenImage} className='img-fluid' />
                  </div>
                  <div className=''>
                    <div className='customer-page-box-title'>
                      Vetter Token
                    </div>
                    <div>
                      <span className='customer-page-box-subtitle'>Symbol:</span>
                      <span className='customer-page-box-text'>Vetter</span>
                    </div>
                    <div>
                      <span className='customer-page-box-subtitle'>Contract Address:</span>
                      <span className='customer-page-box-text text-break'>0x6169b3b23e57de79a6146a2170980ceb1f83b9e0</span>
                    </div>
                  </div>
                </div>
                <div className='m-2 text-justify customer-page-box-text'>
                  Vetter Token, where crowdsourcing meets a.i. and gamification to empower the crypto investor. Reinventing the Crypto Research Game.Vetter Token, helping crypto insiders become a better Vetter. Crypto Calendar helps identify the projects most likely to 2x to 1000x based on poster history.Vetter Token (VETTER) makes crypto research fun! With a proven use case, the App highlights projects worth researching by ranking the poster's performance.
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
                  Top 5% Holders
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
                      {[1, 2, 3].map((item, index) =>
                        <tr key={index}>
                          <td>0x6169b3b23e57de79a6146a</td>
                          <td>18,136,545,548,775.30	</td>
                          <td>$25,395.92</td>
                          <td>1.81%</td>
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
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5].map((item, index) =>
                        <tr key={index}>
                          <td>0x6169b3b23e57de79a6146a2170980ceb1f83b9e0</td>
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
                  Transaction
                </div>
                <div className='table-responsive'>
                  <table className='table table-borderless customer-page-box-text text-center'>
                    <thead>
                      <tr>
                        <th>TOKENS</th>
                        <th>VALUE</th>
                        <th>PRICE</th>
                        <th>TIME</th>
                        <th>TRANSACTION HASH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2].map((item, index) =>
                        <tr key={index}>
                          <td>579,049,285,460.528 WTW</td>
                          <td>$837.757</td>
                          <td>$0.000000001447</td>
                          <td>12:44:12</td>
                          <td>0xa0e...44fe3</td>
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