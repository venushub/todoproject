import React, {Component} from 'react'
import {getFileQuery} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import FileDownload from './FileDownload'
import { saveAs } from 'file-saver';
var FileSaver = require('file-saver');

class FileItem extends Component {

  constructor(props){
    super(props)

    this.state={
      fileId : '0'
    }

  }

  downloadFile = () => {
    let blobby = this.dataURItoBlob(this.props.file.fileBase64)
    FileSaver.saveAs(blobby, this.props.file.fileName);
  }

  dataURItoBlob = (dataURI)  => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}



  render(){

    // const files = this.props.data.allFilesForComment  && this.props.data.allFilesForComment != undefined ? this.props.data.allFilesForComment : []
    // console.log("props", this.props)
    //
    // let files_render = files.map((file) => {
    //   return(
    //     <FileItem file={file} />
    //   )
    // })
    console.log("fileee yaaaaa", this.props)
    return(
      <div>
        <button onClick={this.downloadFile} className="file-here">{this.props.file.fileName}</button>
        </div>
    )
  }
}

export default FileItem
