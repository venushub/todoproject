// import React, {Component} from 'react'
// import {getFileQuery} from '../queries/queries'
// import { graphql, compose } from 'react-apollo';
//
//
// class FileDownload extends Component {
//
//   constructor(props){
//     super(props)
//
//     this.state = {
//       fileYes : false
//     }
//
//
//   }
//
//   componentDidMount(){
//     const fil = this.props.data.getFile.fileName  && this.props.data.getFile.fileName != undefined ? true : false
//     this.setState({
//       fileYes : fil
//     })
//   }
//
//   componentDidUpdate(prevProps){
//
//     // console.log("bruh")
//     if (this.props.data !== prevProps.data) {
//       const fil = this.props.data.getFile.fileName  && this.props.data.getFile.fileName != undefined ? true : false
//       this.setState({
//         fileYes : fil
//       })
//     }
// }
//
//
//   downloadFile = () => {
//     if( this.state.fileYes){
//
//                let filename = this.props.data.getFile.fileName
//                let fileb64Data = this.props.data.getFile.fileBase64
//                let fileExtn  = this.props.data.getFile.fileExtension
//                let strMimeType = "";
//                if(fileb64Data!=null && fileb64Data!="")
//                           {
//                              if(fileExtn != "application/pdf")
//                                    {
//                                           let strMimeType = fileExtn;
//                                           let base64Prefix = "data:"+fileExtn+";base64,";
//                                    }
//                                  else
//                                         {
//                                                let base64Prefix ="data:application/octet-stream;base64,";
//                                         }
//                                  //download(base64Prefix+fileb64Data,filename,strMimeType);
//                           }
//                    else
//                           {
//                           alert("Sorry cannot download your file at the moment")
//                           }
//             };
//
//             }
//
//
//   render(){
//
//     // const files = this.props.data.allFilesForComment  && this.props.data.allFilesForComment != undefined ? this.props.data.allFilesForComment : []
//     // console.log("props", this.props)
//     //
//     // let files_render = files.map((file) => {
//     //   return(
//     //     <FileItem file={file} />
//     //   )
//     // })
//     console.log("fileee downloaddd", this.props)
//
//     //this.downloadFile()
//     return(
//         <p>Hi</p>
//     )
//   }
// }
//
// export default compose(
//   graphql(getFileQuery, {
//     options : (props) => {
//       return {
//         variables : {
//           fileId : props.fileId
//         }
//       }
//     }
//   })
// )(FileDownload)
