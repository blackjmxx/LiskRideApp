import { connect } from 'react-redux'
import { receiveUserLogIn, logIn, displayError, loadUserBalance } from '../../modules/settings/actions'
import SettingsPage from '../../pages/SettingsPage'

const mapStateTopProps = (state) => {
  return {
    user: state.settings.user,
    error:state.settings.error,
    isLoadingUser:state.settings.isLoadingUser,
  }
}

const mapActionCreators = {
  receiveUserLogIn,
  logIn,
  displayError,
  loadUserBalance
}
export default connect(mapStateTopProps, mapActionCreators)(SettingsPage)