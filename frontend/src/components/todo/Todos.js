import React, {Component} from 'react'
import {getTodosQuery,createTodoMutation, deleteTodoMutation} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import TodoItem from './TodoItem'
let moment = require('moment');


class Todos extends Component {

  constructor(props){
    super(props)

    this.state = {
      todoName : '',
      displayCreateTodo : false
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleAddTodo = () => {
    this.props.createTodoMutation({
        variables: {
          todoName : this.state.todoName,
          todoDate : moment().format('YYYY-MM-DD hh:mm:ss')
        }
    }).then(res => {
      this.setState({
        displayCreateTodo : false,
        todoName : ''
      })
      this.props.getTodosQuery.refetch()
    }).catch(err => {
      alert('cannot create your todo right now')
    });
  }

  handleDeleteTodo = (todo) => {
    this.props.deleteTodoMutation({
        variables: {
          todoId : todo.id,
        }
    }).then(res => {
      this.props.getTodosQuery.refetch()
    }).catch(err => {
      alert('cannot delete your task right now')
    });
  }

  handleDisplayAddTodo = () => {
    let new_displayCreateTodo = !this.state.displayCreateTodo
    this.setState({
      displayCreateTodo : new_displayCreateTodo
    })

  }




  render(){

    const todos = this.props.getTodosQuery.allTodos  && this.props.getTodosQuery.allTodos != undefined ? this.props.getTodosQuery.allTodos : []
    console.log("props", this.props)

    let todos_render = todos.map((todo) => {
      return(
        <div className="todos-con">
          <button className="delete-todo-btn" onClick={() => this.handleDeleteTodo(todo)}>Delete Todo</button>
          <TodoItem todo={todo} />
        </div>
      )
    })



    return(
      <div className="todo-container">
        <div className="con2">
          <div className="con1">
            <div className="dark-bold">Your Todo List</div>
            <button className={(this.state.displayCreateTodo)? "none" : "btn1"} onClick={this.handleDisplayAddTodo}>Create New Todo</button>
            <button className={(this.state.displayCreateTodo)? "btn2" : "none"} onClick={this.handleDisplayAddTodo}>Cancel</button>
          </div>
          <div className={(this.state.displayCreateTodo)? "create-todo-form" : "none"}>
            <input className="add-todo-input" placeholder="Enter Todo Title" type="text" name="todoName" onChange={this.handleChange} value={this.state.todoName} />
            <button className="btn1" onClick={this.handleAddTodo}>Create</button>
          </div>
        </div>
        {todos_render}
      </div>
    )
  }
}


export default compose(
    graphql(getTodosQuery, {name : "getTodosQuery"}),
    graphql(createTodoMutation, {name : "createTodoMutation"}),
    graphql(deleteTodoMutation, {name : "deleteTodoMutation"})
)(Todos)
