import React , {Component} from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import { Link , NavLink} from 'react-router-dom'
import Logout from './Logout'
import Theme from './Theme'
import Header from './Header'


class Settings extends Component {

  constructor(props){
    super(props)

  }





  render(){

    return(
      <div className="settings-container">
        <Header />
        <Theme />
        <Logout />
      </div>
    )

  }
}



export default Settings
