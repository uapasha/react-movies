import React from 'react';
import ReactDOM from 'react-dom';

//const fileUploadUrl="/api/v1/movies/upload/";
const fileUploadUrl="https://react-movies-uapasha-c9.c9users.io/api/v1/movies/upload/";

export default class FileUpload extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            uploadSuccessful: false,
            numUploaded: 0,
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
        // .then((response) => response.json()
        // )
        .then((result) => {
            console.log(result.numSaved)
            this.setState({
                uploadSuccessful: true,
                numUploaded: result.numSaved
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
            <p className="message">{this.state.uploadSuccessful && this.state.numUploaded ? 
                this.state.numUploaded + ' movies were added to database' : ''}</p>
        </fieldset>
    }
}