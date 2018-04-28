import React from 'react'
import {
  loginAttempt,
  twizoVerification,
  storeJWT,
  verifyJWT
} from '../../helpers/LoginHelper'

const withLoginHelper = Component =>
  class extends React.Component {
    render() {
      return (
        <Component
          {...this.props}
          loginAttempt={loginAttempt}
          twizoVerification={twizoVerification}
          storeJWT={storeJWT}
          verifyJWT={verifyJWT}
        />
      )
    }
  }

export default withLoginHelper
