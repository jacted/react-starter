import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as AuthActions from 'actions/Auth'

class LoginScene extends Component {

  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login (e) {
    e.preventDefault()
    this.props.actions.login().then(() => {
      console.log('Login OK')
    })
    .catch(() => {
      console.log('Buuuh')
    })
  }

  render () {
    return (
      <div>
        Login
        <button onClick={this.login}>Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);