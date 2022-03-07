import { TOKEN_GECKO_INFO_LOADED } from "../actions/types"

const initialState = {
  loaded: false,
  image: ''
}

const tokenReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case TOKEN_GECKO_INFO_LOADED:
      return {
        ...state,
        loaded: true,
        image: payload.image
      }
    default:
      return state
  }
}

export default tokenReducer