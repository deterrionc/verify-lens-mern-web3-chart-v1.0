import { TOKEN_GECKO_INFO_GET, TOKEN_GECKO_INFO_LOADED, TOKEN_HONEYPOT_INFO_GET, TOKEN_HONEYPOT_INFO_LOADED } from "./types"
import api from '../utils/api'

export const getGeckoInfo = address => async dispatch => {
  dispatch({
    type: TOKEN_GECKO_INFO_GET,
    payload: false
  })
  
  const res = await api.get(`/token/getTokenInfo/${address}`)

  if (res.data.success) {
    dispatch({
      type: TOKEN_GECKO_INFO_LOADED,
      payload: res.data
    })
  }
}

export const getHoneyPotInfo = address => async dispatch => {
  dispatch({
    type: TOKEN_HONEYPOT_INFO_GET,
    payload: false
  })

  const res = await api.get(`/token/getHoneyPotInfo/${address}`)

  if (res.data.success) {
    dispatch({
      type: TOKEN_HONEYPOT_INFO_LOADED,
      payload: res.data.text
    })
  }
}