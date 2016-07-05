import React from 'react';
import ReactDOM from 'react-dom';

//const fileUploadUrl="/api/v1/movies/upload/";
const fileUploadUrl="https://react-movies-uapasha-c9.c9users.io/api/v1/movies/upload/";

export default class FileUpload extends React.Component{
    
    // TODO change notification avout file upload.
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
        .then((response) => response.json()
        )
        .then((result) => {
            if (result.fail !== true){
                this.setState({
                    uploadSuccessful: true,
                })
            }
        })
        .catch((error) => console.error(error));
    }

    render(){
        return<fieldset className="uploader">
            <legend>Upload File</legend>
            <form ref="uploadForm"
                  encType="multipart/form-data"
                  onSubmit={this.uploadFile.bind(this)}>
                <input ref="file" 
                        type="file" 
                        name="moviesFile" 
                        className="upload-file"
                        accept='.txt'/>
                <input type="submit" value="Upload File" name="submit"/>
            </form>
            <p className="message">{this.state.uploadSuccessful ? 'File uploaded' : ''}</p>
        </fieldset>
    }
}