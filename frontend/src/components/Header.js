import React , {Component} from 'react'
import { Link , NavLink} from 'react-router-dom'
import { getUserName } from './helpers/getUserName';
import {getMe} from './queries/queries'
import { graphql, compose } from 'react-apollo';

class Header extends Component{

  constructor(props){
    super(props)

    this.state = {

    }
  }

  render(){

    return(
      <div className="header-div">
        <div className="bundle">
          <h1 className="header-title">MAPI</h1>
          <h1 className="header-username"> ({this.state.username})</h1>
        </div>
        <div>
          <NavLink className="Header-nav-item" to="/todos" activeStyle={{fontWeight: "bold"}}>Todos</NavLink>
          <NavLink className="Header-nav-item" to="/settings" activeStyle={{fontWeight: "bold"}}>Settings</NavLink>
        </div>
      </div>
    )
  }

}


export default compose(
    graphql(getMe, {name : "getMe"}),
  )(Header)
