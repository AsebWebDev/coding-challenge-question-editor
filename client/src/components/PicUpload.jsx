import React, { Component } from "react";
import { MDBBtn } from 'mdbreact';

import api from '../api';


class PicBox extends Component {

constructor(props) {
  super(props)
  this.state = {
    picturePreview: null,
    fileForUpload: null
  }
}

handleFileUploadChange = (e) => {
  e.preventDefault();  
  const file = e.target.files[0];
  this.setState({
    fileForUpload: file,
    picturePreview: URL.createObjectURL(file)
  })
}

handleFileUpload = (e) => {
  e.preventDefault();  
  if (this.state.fileForUpload) {
    api.addPicture(this.state.fileForUpload)
      .then(data => {
        this.setState({message: "Upload Successfull!"})
      })
      .catch(err => console.log(err))
  } else this.setState({message: "please choose a file"});

  setTimeout(() => {
    this.setState({ message: null });
  }, 3000);
}

render() {
  return (
      <form id="fileupload" onSubmit={e => this.handleFileUpload(e)}>
        <input type="file" onChange={e => this.handleFileUploadChange(e)}/><MDBBtn type="submit" cd color="primary">send</MDBBtn>
        {this.state.picturePreview && <img src={this.state.picturePreview} alt="uploadedpicture" />}
      </form>
    );
  }
}

export default PicBox;