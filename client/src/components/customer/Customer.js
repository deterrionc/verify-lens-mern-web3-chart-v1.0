import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import CustomerSidebar from './CustomerSidebar'
import CustomerDashboard from './CustomerDashboard'

const Customer = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <CustomerSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={CustomerDashboard} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Customer)