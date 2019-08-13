import React, {Component} from 'react'
import {getMe} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import Header from '../Header.js'
import Todos from './Todos'


class Todo extends Component {

  constructor(props){
    super(props)
  }


  render(){

    const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false

    return(
      <div>
        <Header username={me.username}/>
        <Todos />
      </div>
    )

  }
}

export default compose(
    graphql(getMe, {name : "getMe"}),
)(Todo)
