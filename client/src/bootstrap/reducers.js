import { combineReducers } from 'redux'
import { intlReducer } from 'react-intl-redux'
import home from '../modules/home/reducers'
import settings from '../modules/settings/reducers'

export default combineReducers({
  home,
  settings,
  intl: intlReducer,
})
