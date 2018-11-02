import React from "react"

class Signup extends React.Component {

state = {
  username: "",
  email: "",
  password: "",
  registeredName: ""
}

handleChange = (e) => {
  console.log(e.target.name)
  this.setState({
    [e.target.name]: e.target.value
  }, () => {
    console.log(this.state)
  })
}

clearFields = () => {
  this.setState({
    username: "",
    email: "",
    password: ""
  })
}

welcomeNewUser = () => {
  console.log("Welcome ", this.state.username, "!")
}

regNewUser = (e) => {
  e.preventDefault()
  console.log("Posting new user")
  const newUser = {
    username: this.state.username,
    email: this.state.email,
    password: this.state.password
  }
  console.log(newUser)
  console.log(JSON.stringify(newUser))

  fetch("http://localhost:8080/users/", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    method: "post",
    body: JSON.stringify(newUser)
  }).then((data) => {
      console.log("Request success: ", data)
    })
    .catch((err) => {
      console.log("Reqeust failure: ", err)
    })
  this.welcomeNewUser()
  this.clearFields()
}


  render() {
    return (
      <section className="formContainer formContainer--signup">
        <h1 className="mainHeading">NEW USER SIGNUP!</h1>
        <form name="signupForm" className="userForm" onSubmit={this.regNewUser}>
          <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} required></input>
          <input type="email" name="email" value={this.state.email} placeholder="E-mail" onChange={this.handleChange} required></input>
          <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} required></input>
          <button type="submit">Register</button>
        </form>
      </section>
    )
  }

}

export default Signup
