import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Admin from '../admin/Admin'
import Customer from '../customer/Customer'
import { logout } from '../../actions/auth'

const Dashboard = ({ isAuthenticated, user, logout }) => {
  if (isAuthenticated && user && user.type === "admin") {
    return (
      <Admin />
    )
  } else if (isAuthenticated && user && user.type === "customer") {
    return (
      <Customer />
    )
  } else if (isAuthenticated !== true) {
    return <Redirect to={'/'} />
  } else {
    return (
      <div>
        <h5>It will be redirected soon.</h5>
        <button className='btn btn-danger' onClick={() => logout()}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, { logout })(Dashboard)