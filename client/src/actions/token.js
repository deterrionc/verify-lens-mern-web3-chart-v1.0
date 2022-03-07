import { TOKEN_GECKO_INFO_LOADED } from "./types"
import api from '../utils/api'

export const getGeckoInfo = address => async dispatch => {
  const res = await api.get(`/token/getTokenInfo/${address}`)

  if (res.data.success) {
    dispatch({
      type: TOKEN_GECKO_INFO_LOADED,
      payload: res.data
    })
  }
}