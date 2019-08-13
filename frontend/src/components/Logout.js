import React, {Component} from 'react'
import { Link , NavLink, withRouter} from 'react-router-dom'
import client from '../index.js'
import Header from './Header'


class Logout extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('my-jwt')
    client.clearStore()
    this.props.history.push('/login');
  }


  render(){
    return(
      <div className="logout-container">

            <h2>Are you sure you want to...</h2>
            <button onClick={this.handleSubmit} className="btn2">Logout ♥</button >
      </div>
    )
  }

}

export default withRouter(Logout)
