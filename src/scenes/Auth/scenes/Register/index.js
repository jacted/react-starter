import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as AuthActions from 'actions/Auth'

// Styles
import './index.scss'

class RegisterScene extends Component {

  render () {
    return (
      <div className='register__scene'>
        Register
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    user: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScene);