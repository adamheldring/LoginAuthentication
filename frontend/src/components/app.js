import React from "react"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Header from "./header/header.js"
import Signup from "./pages/signup/signup.js"
import Signin from "./pages/signin/signin.js"


class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="mainWrapper">
          <Header />
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/Signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App
