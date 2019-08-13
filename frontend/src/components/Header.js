import React , {Component} from 'react'
import { Link , NavLink} from 'react-router-dom'
import {getMe} from './queries/queries'
import { graphql, compose } from 'react-apollo';

class Header extends Component{

  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="Header-div">
        <div className="bundle">
          <h1 className="header-title">TODOS</h1>
          <h1 className="header-username"> ({this.props.username})</h1>
        </div>
        <div className="Nav-div">
          <NavLink className="Header-nav-item" to="/todos" activeClassName="Header-nav-item-active">Todos</NavLink>
          <NavLink className="Header-nav-item" to="/settings" activeClassName="Header-nav-item-active">Settings</NavLink>
        </div>
      </div>
    )
  }


}


export default Header
