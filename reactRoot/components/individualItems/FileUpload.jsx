import React from 'react';
import ReactDOM from 'react-dom';

const fileUploadUrl="http://localhost:3000/api/v1/movies/upload/";

export default class FileUpload extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            uploadSuccessful: false
        }
    }

    uploadFile(e) {
        e.preventDefault();

        this.setState({
            uploadSuccessful: false
        });
        
        var fileData = new FormData();

        fileData.append( 'moviesFile', ReactDOM.findDOMNode(this.refs.file).files[0] );
        ReactDOM.findDOMNode(this.refs.file).value = '';

        fetch(fileUploadUrl, {
            method: 'POST',
            body: fileData
        })
        .then(() => {
            this.setState({
                uploadSuccessful: true
            })
        })
        .catch((error) => console.error(error));
    }

    render(){
        return<fieldset className="uploader">
            <legend>Upload File</legend>
            <form ref="uploadForm"
                  encType="multipart/form-data"
                  onSubmit={this.uploadFile.bind(this)}>
                <input ref="file" type="file" name="moviesFile" className="upload-file"/>
                <input type="submit" value="Upload File" name="submit"/>
            </form>
            <p className="message">{this.state.uploadSuccessful ? 'File uploaded' : ''}</p>
        </fieldset>
    }
}