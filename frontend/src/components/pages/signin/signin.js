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

componentDidMount() {
  this.getUserData()
}

  render() {
    return (
      <section>
        {this.state.loggedin ?
          <div className="myPageView">
            <h1>WELCOME {sessionStorage.getItem("username").toUpperCase()}</h1>
            <h3>Your favorite movies:</h3>
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
