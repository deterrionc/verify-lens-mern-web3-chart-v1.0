import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import token from './token'

export default combineReducers({
  alert,
  auth,
  token,
})
