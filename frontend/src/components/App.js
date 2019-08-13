import React, {Component} from 'react' ;
import {Switch, Route} from 'react-router-dom'
import AuthenticatedComponent from './AuthenticatedComponent'
import { graphql, compose } from 'react-apollo';
import Login from './Login'
import Settings from './Settings'
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

  componentDidMount(){

      let mytheme = localStorage.getItem('theme');
      console.log("heyyyy blueeeee")
      if(mytheme==="blue"){
        //blue
      document.documentElement.style.setProperty('--extra-dark', "rgb(40,55,71)");
      document.documentElement.style.setProperty('--dark', "rgb(52,73,71)");
      document.documentElement.style.setProperty('--light', "rgb(174,182,191)");
      document.documentElement.style.setProperty('--extra-light', "rgb(235,237,239)");
    } else if (mytheme==="green"){
      //greeen
      document.documentElement.style.setProperty('--extra-dark', "rgb(25,111,61)");
      document.documentElement.style.setProperty('--dark', "rgb(34,153,84)");
      document.documentElement.style.setProperty('--light', "rgb(169,223,191)");
      document.documentElement.style.setProperty('--extra-light', "rgb(233, 247, 239)");
    } else if (mytheme==="red"){
      //greeen
      document.documentElement.style.setProperty('--extra-dark', "rgb(146, 43, 33)");
      document.documentElement.style.setProperty('--dark', "rgb(192, 57, 43)");
      document.documentElement.style.setProperty('--light', "rgb(230, 176, 170)");
      document.documentElement.style.setProperty('--extra-light', "rgb(249, 235, 234)");
    } else if (mytheme==="yellow"){
      //greeen
      document.documentElement.style.setProperty('--extra-dark', "rgb(154, 125, 10)");
      document.documentElement.style.setProperty('--dark', "rgb(212, 172, 13)");
      document.documentElement.style.setProperty('--light', "rgb(249, 231, 159)");
      document.documentElement.style.setProperty('--extra-light', "rgb(254, 249, 231)");
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
          <Route path="/settings" exact component={Settings} />
          </AuthenticatedComponent>

        </Switch>
    )
  }
}


export default App
