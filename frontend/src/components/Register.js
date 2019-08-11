import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {createUserMutation} from './queries/queries'
import { Link , NavLink} from 'react-router-dom'


class Register extends Component {
  constructor(props){
    super(props)

    this.state = {
      username : '',
      password : '',
      confirm_password : '',
      error : '',
      success : false,
      errorClassName : 'error-hide',
      timer : null
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
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
    if(this.state.username !== '' && this.state.password !== '' && this.state.confirm_password !== ''){

      if(this.state.password === this.state.confirm_password) {
        this.props.createUserMutation({
            variables: {
                username: this.state.username,
                password: this.state.password,
            }
        }).then(res => {
          // console.log(res)
          this.setState({
            success : true
          })
        }).catch(err => {
          this.handleErrorShow('Sorry username is already in use')
        });
      } else {
        this.handleErrorShow('Passwords Mismatch')
      }
    } else {
      this.handleErrorShow('Some Fields are empty')
    }
  }


  render(){

    const registration_success_content = <div className="login-form-div">
                                         <div className="registration-success-container">
                                           <p>👏Registration Successful👏</p>
                                           <Link className="register-link" to="/login">Login Here</Link>
                                         </div>
                                       </div>
    let formContent = <div className="login-form-div">
                        <div className={this.state.errorClassName}>{this.state.error}</div>
                        <div className="login-form">
                          <label htmlFor="username" className="login-form-label">Username</label>
                          <input className="login-input" type="text" id='username' name="username" onChange={this.handleChange} value={this.state.username} />
                          <label  htmlFor="password" className="login-form-label">Password</label>
                          <input className="login-input" type="password" id='password' name="loginPassword" onChange={this.handleChange} value={this.state.password} />
                          <label  htmlFor="confirm_password" className="login-form-label">Confirm Password</label>
                          <input className="login-input" type="password" id='confirm_password' name="loginPassword" onChange={this.handleChange} value={this.state.confirm_password} />
                          <button onClick={this.handleSubmit} className="login-button">Register</button>
                        </div>
                      </div>

    let content
    if(this.state.success){
      content = registration_success_content
    } else {
      content = formContent
    }

    return(
      <div className="login-container">
        <div className="login-info">
          <div  className="login-header-title">TODOS</div>
          <div className="login-title">Register</div>
        </div>
        {content}
      </div>
    )
  }
}

export default compose(
    graphql(createUserMutation, { name: "createUserMutation" })
)(Register);
