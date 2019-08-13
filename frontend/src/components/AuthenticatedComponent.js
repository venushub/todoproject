import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {verifyTokenMutation} from './queries/queries'
import { getToken } from './helpers/getToken';
import { withRouter } from 'react-router-dom';


class AuthenticatedComponent extends Component {
  constructor(props){
    super(props)

    this.state = {
      user : undefined
    };
}



componentDidMount(){
  const token = getToken();
  this.props.verifyTokenMutation({
    variables : {
      token : token
    }
  }).then(res => {
    console.log("auth isssssss", res)
    this.setState({
      user: res.data
    })
  }).catch(err => {
    localStorage.removeItem('my-jwt')
     this.props.history.push('/login');
  })
}

render() {
  if (this.state.user === undefined) {
    return (
      <div><h1>Loading...</h1></div>
    );
  }

  return (
    <div>
      {this.props.children}
    </div>
  );
}

}



export default compose(
    graphql(verifyTokenMutation, { name: "verifyTokenMutation" })
)(withRouter(AuthenticatedComponent));
