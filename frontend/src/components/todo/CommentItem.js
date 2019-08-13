import React, {Component} from 'react'
import {getFilesQuery, createFileMutation} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import FileItem from './FileItem'
let moment = require('moment');


class CommentItem extends Component {

  constructor(props){
    super(props)

    this.state = {
      fileName : '',
      fileExtension : '',
      fileBase64 : '',
      file : ''
    }

  }


  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }


  handleAddFile = () => {
    this.props.createFileMutation({
        variables: {
          commentId : this.props.comment.id,
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
    const selectedFile = this.refs.myfile.files[0];

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



  render(){

    const files = this.props.data.allFilesForComment  && this.props.data.allFilesForComment != undefined ? this.props.data.allFilesForComment : []
    console.log("props filessssssss", this.props)

    let files_render = files.map((file) => {
      return(
        <FileItem file={file} />
      )
    })


              // <input  type="file" id="file" ref="myfile" onChange={this.changedFile} />
              // <div>{this.state.fileName}</div>
              // <button onClick={this.handleAddFile}>Add</button>

    return(
      <div className="comment-1">
        <div className="comment-item-head"><div className="comment-item-title">"<i>{this.props.comment.commentName}</i>"</div>{files_render}</div>
        <div className="comment-file">

        <label className={(this.state.fileName !== "")? "btn1 br0" : "none"}>{this.state.fileName}</label>
        <label className="btn1" htmlFor={("newfile" + this.props.comment.id)}>Add File</label>
        <input className="none" type="file" id={("newfile" + this.props.comment.id)} ref="myfile" onChange={this.changedFile} />
        <button className="btn2" onClick={this.handleAddFile}>Add</button>
        </div>
      </div>
    )
  }
}


export default compose(
  graphql(getFilesQuery, {
    options : (props) => {
      return {
        variables : {
          commentId : props.comment.id
        }
      }
    }
  }),
  graphql(createFileMutation, {name : "createFileMutation"})
)(CommentItem)
