import { TOKEN_GECKO_INFO_GET, TOKEN_GECKO_INFO_LOADED, TOKEN_HONEYPOT_INFO_GET, TOKEN_HONEYPOT_INFO_LOADED } from "../actions/types"

const initialState = {
  loaded: false,
  image: '',
  honeyPotLoaded: false,
  honeyPotText: ''
}

const tokenReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case TOKEN_GECKO_INFO_GET:
      return {
        ...state,
        loaded: payload
      }
    case TOKEN_GECKO_INFO_LOADED:
      return {
        ...state,
        loaded: true,
        image: payload.image
      }
    case TOKEN_HONEYPOT_INFO_GET:
      return {
        ...state,
        honeyPotLoaded: payload
      }
    case TOKEN_HONEYPOT_INFO_LOADED:
      return {
        ...state,
        honeyPotLoaded: true,
        honeyPotText: payload
      }
    default:
      return state
  }
}

export default tokenReducer