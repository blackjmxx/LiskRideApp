import { connect } from 'react-redux'
import { updateTravels } from '../../modules/home/actions'
import HomePage from '../../components/HomePage/HomePage'
import { receiveUserLogIn } from '../../modules/settings/actions'

const mapStateTopProps = (state) => {
  return {
    error: state.home.error,
  }
}

const mapActionCreators = {
  receiveUserLogIn,
  updateTravels
}

export default connect(mapStateTopProps, mapActionCreators)(HomePage)
