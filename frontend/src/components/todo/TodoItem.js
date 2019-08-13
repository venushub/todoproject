import React, {Component} from 'react'
import {getTasksQuery, createTaskMutation, updateTodoMutation, deleteTaskMutation} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import TaskItem from './TaskItem'
let moment = require('moment');


class TodoItem extends Component {

  constructor(props){
    super(props)


    this.state = {
      taskName : '',
      taskGoalEnabled : 'no',
      taskDone : 'no',
      taskGoalDate : '',
      taskGoalTime : '',

      updateTodo : false,
      todoName : '',
      createNewTask : false
    }
  }

  handleCreateNewTask = () => {
    if(this.state.createNewTask){
      this.setState({
        createNewTask : false
      })
    } else {
      this.setState({
        createNewTask : true
      })
    }
  }

  componentDidMount(){
    this.setState({
      todoName : this.props.todo.todoName,
      taskGoalEnabled : 'no',
      taskGoalDate : moment().add(1, 'days').format('YYYY-MM-DD'),
      taskGoalTime : moment().format('hh:mm')
    })
  }

  handleEditTodoName = () => {
    if(this.state.updateTodo){
      this.setState({
        updateTodo : false,
        todoName : this.props.todo.todoName,
      })
    } else {
      this.setState({
        updateTodo : true
      })
    }
  }

  handleSetTaskGoalDateTime = () => {
    this.setState({
      taskGoalEnabled : 'yes',
      taskGoalDate : moment().add(1, 'days').format('YYYY-MM-DD'),
      taskGoalTime : moment().format('hh:mm')
    })
  }

  handleDeSetTaskGoalDateTime = () => {
    this.setState({
      taskGoalEnabled : 'no',
    })
  }



    handleChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    handleAddTask = () => {
      let taskGoalSend;
      if(this.state.taskGoalEnabled === 'yes'){
        taskGoalSend = this.state.taskGoalDate + ' ' + this.state.taskGoalTime + ':00'
      } else {
        taskGoalSend = 'no'
      }
      this.props.createTaskMutation({
          variables: {
            todoId : this.props.todo.id,
            taskName : this.state.taskName,
            taskDate : moment().format('YYYY-MM-DD hh:mm:ss'),
            taskGoalEnabled : this.state.taskGoalEnabled,
            taskGoal : taskGoalSend,
            taskDone : this.state.taskDone
          }
      }).then(res => {
        this.props.data.refetch()
        this.setState({
          taskName : '',
          taskGoalEnabled : 'no',
          taskGoalDate : moment().add(1, 'days').format('YYYY-MM-DD'),
          taskGoalTime : moment().format('hh:mm'),
          createNewTask : false
        })
      }).catch(err => {
        alert('cannot create your task right now')
      });

    }

    handleUpdateTodo = () => {
      this.props.updateTodoMutation({
          variables: {
            todoId : this.props.todo.id,
            todoName : this.state.todoName
          }
      }).then(res => {
        console.log(res)
        this.setState({
          todoName : res.data.updateTodo.todoName,
          updateTodo : false
        })
      }).catch(err => {
        alert('cannot create your task right now')
      });

    }

  handleDeleteTask = (task) => {
    this.props.deleteTaskMutation({
        variables: {
          taskId : task.id,
        }
    }).then(res => {
      this.props.data.refetch()
    }).catch(err => {
      alert('cannot delete your task right now')
    });
  }


  render(){

    let tasks = this.props.data.allTasksForTodo  && this.props.data.allTasksForTodo != undefined ? this.props.data.allTasksForTodo : []
    console.log("props", this.props)

    let tasks_render = tasks.map((task) => {
      return(
        <div className="task-wrap">
          <button className="delete-task-button" onClick={() => this.handleDeleteTask(task)}>Delete Task</button>
          <TaskItem task={task} />
        </div>
      )
    })


    // let goal_render;
    //
    // if(this.state.taskGoalEnabled === 'yes') {
    //   goal_render = <div  className="goal-title">
    //                   <input type="date" disabled={(this.state.createNewTask)? "" : "disabled"} onChange={this.handleChange} name="taskGoalDate" value={this.state.taskGoalDate} />
    //                   <input type="time"  disabled={(this.state.createNewTask)? "" : "disabled"} onChange={this.handleChange} name="taskGoalTime" value={this.state.taskGoalTime} />
    //                 </div>
    // } else {
    //   goal_render = <div  className="goal-title">
    //                   <div>No Goal Set</div>
    //                 </div>
    // }


    return(
      <div className="todo-item">
        <div className="todo-heading">
          <button className="btn2" onClick={this.handleCreateNewTask}>Create  New Task</button>
          <input type="text" className="todo-head-enabled" disabled={(this.state.updateTodo)? "" : "disabled"} name="todoName" onChange={this.handleChange} value={this.state.todoName} />
          <button className={(this.state.updateTodo)? "none" : "btn1"} onClick={this.handleEditTodoName}>edit Todo Name</button>
          <button className={(this.state.updateTodo)? "btn1" : "none"} onClick={this.handleUpdateTodo}>update Todo Name</button>
          <button className={(this.state.updateTodo)? "btn2" : "none"} onClick={this.handleEditTodoName}>Cancel</button>
        </div>

        <div className={(this.state.createNewTask)? "new-todo-div" : "none"} >
          <div className="my-box">
          <button className="btn2" onClick={this.handleCreateNewTask} >Cancel</button>
          <input placeholder="Enter Task Name Here" className="new-todo-input" type="text" name="taskName" onChange={this.handleChange} value={this.state.taskName} />
          </div>
          <div className="new-task-goal-div">
            <div className="goal-head btn1">Goal</div>
            <div className="goal-title">
            <input type="date" className={(this.state.taskGoalEnabled === "yes")? "" : "none"}  onChange={this.handleChange} name="taskGoalDate" value={this.state.taskGoalDate} />
            <input type="time"  className={(this.state.taskGoalEnabled === "yes")? "" : "none"}  onChange={this.handleChange} name="taskGoalTime" value={this.state.taskGoalTime} />
            <div className={(this.state.taskGoalEnabled === "yes")? "none" : ""}>No Goal Set</div>
            </div>
            <button  className={(this.state.taskGoalEnabled === "yes")? "none" : "btn1"} onClick={this.handleSetTaskGoalDateTime}>Set Goal</button>
            <button className={(this.state.taskGoalEnabled === "yes")? "btn1" : "none"} onClick={this.handleDeSetTaskGoalDateTime}>Delete Goal</button>
          </div>
          <button className="add-task-button" onClick={this.handleAddTask}>Add</button>
        </div>
          {tasks_render}
      </div>
    )
  }

}

export default compose(
  graphql(getTasksQuery, {
    options : (props) => {
      return {
        variables : {
          todoId : props.todo.id
        }
      }
    }
  }),
  graphql(createTaskMutation, {name : "createTaskMutation"}),
  graphql(updateTodoMutation, {name : "updateTodoMutation"}),
  graphql(deleteTaskMutation, {name : "deleteTaskMutation"}),
)(TodoItem)
