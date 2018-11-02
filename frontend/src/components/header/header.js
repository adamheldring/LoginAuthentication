import React from "react"
import { Link } from "react-router-dom"

class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <Link to="/signup" className="header__menuItem">
          <p>Signup</p>
        </Link>
        <Link to="/" className="header__menuItem">
          <p>Login</p>
        </Link>
      </div>
    )
  }

}

export default Header
