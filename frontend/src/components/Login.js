import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'
import { Link , NavLink} from 'react-router-dom'


class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      loginUsername : '',
      loginPassword : '',
      error : '',
      errorClassName : 'error-hide',
      timer : null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleErrorShow = (error) => {
    this.setState({
      error : error,
      errorClassName : 'error-show',
      timer : setTimeout(() => this.handleErrorHide(), 2000)
    })
  }

  handleErrorHide = () => {
    clearTimeout(this.state.timer)
    this.setState({
      errorClassName : 'error-hide',
      timer : null
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.loginUsername !== '' && this.state.loginPassword !== ''){
      this.props.getTokenMutation({
          variables: {
              username: this.state.loginUsername,
              password: this.state.loginPassword,
          }
      }).then(res => {
        localStorage.setItem('my-jwt', res.data.tokenAuth.token)
        this.props.history.push('/todos');
      }).catch(err => {
        this.handleErrorShow('Invalid Credentials')
      });
    } else {
      this.handleErrorShow('Fill in the blanks')
    }
  }

  render(){
    return(
      <div className="login-container">
        <div className="login-info">
        <div  className="login-header-title">TODOS</div>
        <div className="login-title">Login</div>
        </div>
        <div className="login-form-div">
          <div className={this.state.errorClassName}>{this.state.error}</div>
          <div className="login-form">
            <label htmlFor="loginUsername" className="login-form-label">Username</label>
            <input className="login-input" type="text" id='loginUsername' name="loginUsername" onChange={this.handleChange} value={this.state.loginUsername} />
            <label  htmlFor="loginPassword" className="login-form-label">Password</label>
            <input className="login-input" type="password" id='loginPassword' name="loginPassword" onChange={this.handleChange} value={this.state.loginPassword} />
            <button onClick={this.handleSubmit} className="login-button">Login</button>
          </div>
          <div className="register-here-text-div"><Link className="my-link" to="/register">New Users Register Here</Link></div>
        </div>
      </div>
    )
  }

}

export default compose(
    graphql(getTokenMutation, { name: "getTokenMutation" })
)(Login);
