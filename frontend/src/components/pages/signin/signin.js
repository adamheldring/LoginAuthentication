import React from "react"

class Signin extends React.Component {

state = {
  username: "",
  password: "",
  loggedin: false
}

handleChange = (e) => {
  console.log(e.target.name)
  this.setState({
    [e.target.name]: e.target.value
  }, () => {
    console.log(this.state)
  })
}

loginUser = (e) => {
  e.preventDefault()
  console.log("Login in...")
  const user = {
    username: this.state.username,
    password: this.state.password
  }
  console.log(user)
  console.log(JSON.stringify(user))

  fetch("http://localhost:8080/sessions/", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    method: "post",
    body: JSON.stringify(user)
  }).then(response => response.json())
    .then(userData => {
      console.log(userData)
      sessionStorage.setItem("usertoken", userData.accesstoken)
      sessionStorage.setItem("userId", userData.userId)
      sessionStorage.setItem("username", userData.username)
      sessionStorage.setItem("favorite", userData.favorite)
      this.getUserData()
    })
    .catch((err) => {
      console.log("Reqeust failure: ", err)
    })
}

getUserData = () => {
  console.log(sessionStorage.getItem("usertoken"))
  fetch(`http://localhost:8080/users/${sessionStorage.getItem("userId")}/movies/`, {
    headers: {  accesstoken: sessionStorage.getItem("usertoken") }
  }).then(response => response.json())
    .then(userData => {
      this.setState({ loggedin: true })
      console.log("Yippie, this is where all your movies will be in the future!", userData)
    })
    .catch((err) => {
      console.log("Reqeust failure: ", err)
    })
}

logout = () => {
  console.log("Logging out...")
  sessionStorage.removeItem("usertoken")
  sessionStorage.removeItem("userId")
  sessionStorage.removeItem("username")
  sessionStorage.removeItem("favorite")
  this.setState({ loggedin: false })
}

componentDidMount() {
  this.getUserData()
}

  render() {
    return (
      <section>
        {this.state.loggedin ?
          <div className="myPageView">
            <h1>WELCOME {sessionStorage.getItem("username").toUpperCase()}</h1>
            <p>Your favorite movie is:</p>
            <h4>{sessionStorage.getItem("favorite")}</h4>
            <button onClick={this.logout}>Log out</button>
          </div>
          :
          <div className="formContainer formContainer--signin">
            <h1 className="mainHeading">USER SIGN IN</h1>
            <form name="signinForm" className="userForm" onSubmit={this.loginUser}>
              <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} required></input>
              <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} required></input>
              <button type="submit">Login</button>
            </form>
          </div>}
      </section>
    )
  }

}

export default Signin
