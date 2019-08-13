import React, {Component} from 'react'
import {getCommentsQuery, createCommentMutation, updateTaskMutation, deleteCommentMutation, createFileMutation} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import CommentItem from './CommentItem'
let moment = require('moment');

class TaskItem extends Component {

  constructor(props){
    super(props)

    this.state = {
      commentName : '',

      taskName : '',
      taskGoalEnabled : '',
      taskGoalDate : '',
      taskGoalTime : '',
      taskDone : '',
      updateTask : false,


      fileName : '',
      fileExtension : '',
      fileBase64 : '',
      file : ''
    }

  }


  componentDidMount(){
    let taskGoalEnabledSend;
    let taskGoalDateSend;
    let taskGoalTimeSend;
    if(this.props.task.taskGoalEnabled === 'yes'){
      taskGoalEnabledSend = 'yes'
      taskGoalDateSend =  this.props.task.taskGoal.substring(0,10)
      taskGoalTimeSend =  this.props.task.taskGoal.substring(11,16)
    } else {
      taskGoalEnabledSend = 'no'
      taskGoalDateSend = moment().add(1, 'days').format('YYYY-MM-DD')
      taskGoalTimeSend = moment().format('hh:mm')
    }

    this.setState({
      taskName : this.props.task.taskName,
      taskGoalEnabled : taskGoalEnabledSend,
      taskGoalDate : taskGoalDateSend,
      taskGoalTime : taskGoalTimeSend,
      taskDone : this.props.task.taskDone
    })
  }

  handleSetTaskGoalDateTime = () => {
    this.setState({
      taskGoalEnabled : 'yes',
      taskGoalDate : moment().add(1, 'days').format('YYYY-MM-DD'),
      taskGoalTime : moment().format('hh:mm')
    })
  }

  handleTaskDone = () => {
    let newTaskDone;
    if(this.state.taskDone === "yes"){
      newTaskDone = "no"
    } else {
      newTaskDone = "yes"
    }
    this.setState({
      taskDone : newTaskDone,
    }, () => {
      this.handleUpdateTask()
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



  handleUpdateTask = () => {
    let taskGoalSend;
    if(this.state.taskGoalEnabled === 'yes'){
      taskGoalSend = this.state.taskGoalDate + ' ' + this.state.taskGoalTime + ':00'
    } else {
      taskGoalSend = 'no'
    }
    this.props.updateTaskMutation({
        variables: {
          taskId : this.props.task.id,
          taskName : this.state.taskName,
          taskGoalEnabled : this.state.taskGoalEnabled,
          taskGoal : taskGoalSend,
          taskDone : this.state.taskDone,
        }
    }).then(res => {
        this.setState({
            taskName : res.data.updateTask.taskName,
            taskGoalEnabled : res.data.updateTask.taskGoalEnabled,
            taskGoal : res.data.updateTask.taskGoal,
            taskDone : res.data.updateTask.taskDone,
            updateTask : false
        })
    }).catch(err => {
      let taskGoalEnabledSend;
      let taskGoalDateSend;
      let taskGoalTimeSend;
      if(this.props.task.taskGoalEnabled === 'yes'){
        taskGoalEnabledSend = 'yes'
        taskGoalDateSend =  this.props.task.taskGoal.padStart(0,11)
        taskGoalTimeSend =  this.props.task.taskGoal.padStart(13,18)
      } else {
        taskGoalEnabledSend = 'no'
        taskGoalDateSend = moment().add(1, 'days').format('YYYY-MM-DD')
        taskGoalTimeSend = moment().format('hh:mm')
      }

      this.setState({
        taskName : this.props.task.taskName,
        taskGoalEnabled : taskGoalEnabledSend,
        taskGoalDate : taskGoalDateSend,
        taskGoalTime : taskGoalTimeSend,
        taskDone : this.props.task.taskDone
      })
      alert('cannot create your task right now')

    });

  }

  handleAddComment = () => {
    this.props.createCommentMutation({
        variables: {
          taskId : this.props.task.id,
          commentName : this.state.commentName,
          commentDate : moment().format('YYYY-MM-DD hh:mm:ss')
        }
    }).then(res => {
      console.log("resssss", res)
      if(this.state.file !== ''){
          this.handleAddFile(res.data.createComment.id)
      }
      this.props.data.refetch()
    }).catch(err => {
      alert('cannot create your task right now')
    });

  }

  handleDeleteComment = (comment) => {
    this.props.deleteCommentMutation({
        variables: {
          commentId : comment.id,
        }
    }).then(res => {
      this.props.data.refetch()
    }).catch(err => {
      alert('cannot delet your comment right now')
    });
  }

  handleAddFile = (commentid) => {
    this.props.createFileMutation({
        variables: {
          commentId : commentid,
          fileName : this.state.fileName,
          fileExtension : this.state.fileExtension,
          fileBase64 : this.state.fileBase64,
          fileDate : moment().format('YYYY-MM-DD hh:mm:ss')
        }
    }).then(res => {
      this.props.data.refetch()
      this.setState({
        fileName : '',
        fileExtension : '',
        fileBase64 : '',
        file : ''
      })
    }).catch(err => {
      alert('cannot create your file right now')
    });

  }



    getBase64 = (file) => {
     var reader = new FileReader();
       reader.readAsDataURL(file);

       // console.log("file type is blobbb")

     reader.onload =  () => {
       // console.log(reader.result);
       this.setState({
         fileBase64 : reader.result
       })
     };
     reader.onerror =  (error) => {
       // console.log('Error: ', error);
     };
    }


    changedFile = (e) => {

      this.setState({
        file : e.target.value,
        fileName : e.target.value.split(/.*[\/|\\]/)[1],
        fileExtension : e.target.value.split(/.*[\/|\\]/)[1].split('.').pop(),
      })
      const selectedFile = this.refs.myfilehere.files[0];

      if(e.target.value !== '' && e.target.value !== null){
        if(selectedFile.size < 3000000){
          this.getBase64(selectedFile)
        } else {
            alert('your file size is overwhelming')
        }
      }
      else {
        alert('You havent selected any file')
      }
    };

    handleEditTask = () => {
      if(this.state.updateTask){
        let taskGoalEnabledSend;
        let taskGoalDateSend;
        let taskGoalTimeSend;
        if(this.props.task.taskGoalEnabled === 'yes'){
          taskGoalEnabledSend = 'yes'
          taskGoalDateSend =  this.props.task.taskGoal.padStart(0,11)
          taskGoalTimeSend =  this.props.task.taskGoal.padStart(13,18)
        } else {
          taskGoalEnabledSend = 'no'
          taskGoalDateSend = moment().add(1, 'days').format('YYYY-MM-DD')
          taskGoalTimeSend = moment().format('hh:mm')
        }

        this.setState({
          updateTask : false,
          taskName : this.props.task.taskName,
          taskGoalEnabled : taskGoalEnabledSend,
          taskGoalDate : taskGoalDateSend,
          taskGoalTime : taskGoalTimeSend,
          taskDone : this.props.task.taskDone
        })
      } else {
        this.setState({
          updateTask : true
        })
      }
    }



  render(){

      console.log("task  prosssssss", this.props.task)

    const comments = this.props.data.allCommentsForTask  && this.props.data.allCommentsForTask != undefined ? this.props.data.allCommentsForTask : []
    console.log("props", this.props)

    let comments_render = comments.map((comment) => {
      return(
        <div className="comment-div">
        <button className="delete-comment-button" onClick={() => this.handleDeleteComment(comment)}>Delete Comment</button>
          <CommentItem comment={comment} />

        </div>
      )
    })


    return(
      <div className={(this.state.taskDone === "yes")? "tasks-div-com" : "tasks-div"} >
      <button onClick={this.handleTaskDone} className="done-btn">{(this.state.taskDone === "yes")? "Not Done" : "Done"}</button>
      <div className="task-heading">
        <input type="text" className="task-head-enabled"  disabled={(this.state.updateTask)? "" : "disabled"} name="taskName" onChange={this.handleChange} value={this.state.taskName} />
        <button className={(this.state.updateTask)? "none" : "btn1"} onClick={this.handleEditTask}>Edit Task</button>
        <button className={(this.state.updateTask)? "btn1" : "none"} onClick={this.handleUpdateTask}>Update Task</button>
        <button className={(this.state.updateTask)? "btn2" : "none"} onClick={this.handleEditTask}>Cancel</button>
      </div>

      <div className="goal-div">
        <div className="goal-head btn1 bt0">Goal</div>
        <div  className={(this.state.updateTask) ? "goal-title bt0" : "goal-title disabledme bt0"}>
        <input type="date"  disabled={(this.state.updateTask)? "" : "disabled"} className={(this.state.taskGoalEnabled === "yes")? "" : "none"}  onChange={this.handleChange} name="taskGoalDate" value={this.state.taskGoalDate} />
        <input type="time"   disabled={(this.state.updateTask)? "" : "disabled"} className={(this.state.taskGoalEnabled === "yes")? "" : "none"}  onChange={this.handleChange} name="taskGoalTime" value={this.state.taskGoalTime} />
        <div  className={(this.state.taskGoalEnabled === "yes") ? "none" : (this.state.updateTask) ? "" : "disabledme"}>No Goal Set</div>
        </div>
        <button  disabled={(this.state.updateTask)? "" : "disabled"} className={(this.state.taskGoalEnabled === "yes")? "none" : "btn1 bt0"} onClick={this.handleSetTaskGoalDateTime}>Set Goal</button>
        <button disabled={(this.state.updateTask)? "" : "disabled"} className={(this.state.taskGoalEnabled === "yes")? "btn1 bt0" : "none"} onClick={this.handleDeSetTaskGoalDateTime}>Delete Goal</button>
      </div>
        {comments_render}
        <div className="box2">
          <input className="comment-input" type="text" placeholder="add comment here" name="commentName" onChange={this.handleChange} value={this.state.commentName} />
          <label className={(this.state.fileName !== "")? "btn1 br0" : "none"}>{this.state.fileName}</label>
          <label className="btn1" htmlFor={"newfile1" + this.props.task.id}>Add File</label>
          <input className="none" type="file" id={"newfile1" + this.props.task.id} ref="myfilehere" onChange={this.changedFile} />
          <button className="btn2" onClick={this.handleAddComment}>Add New Comment</button>
        </div>
      </div>
    )

  }
}


export default compose(
  graphql(getCommentsQuery, {
    options : (props) => {
      return {
        variables : {
          taskId : props.task.id
        }
      }
    }
  }),
  graphql(createCommentMutation, {name : "createCommentMutation"}),
  graphql(updateTaskMutation, {name : "updateTaskMutation"}),
  graphql(deleteCommentMutation, {name : "deleteCommentMutation"}),
  graphql(createFileMutation, {name : "createFileMutation"})
)(TaskItem)
