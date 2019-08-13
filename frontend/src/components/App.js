import React, {Component} from 'react' ;
import {Switch, Route} from 'react-router-dom'
import AuthenticatedComponent from './AuthenticatedComponent'
import { graphql, compose } from 'react-apollo';
import Login from './Login'
import Register from './Register'
import Home from './Home'
import {getMe} from './queries/queries'
import Todo from './todo/Todo'


class App extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }



  render(){

    return(
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />

          <AuthenticatedComponent>
          <Route path="/todos" exact component={Todo} />
          </AuthenticatedComponent>

        </Switch>
    )
  }
}


export default App
