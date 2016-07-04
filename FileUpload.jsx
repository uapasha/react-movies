import React from 'react';
import ReactDOM from 'react-dom';

const fileUploadUrl="http://localhost:3000/api/v1/movies/upload/";

export default class FileUpload extends React.Component{

    uploadFile(e) {
        e.preventDefault();
        console.log(ReactDOM.findDOMNode(this.refs.file));
        var fileData = new FormData();
        fileData.append( 'moviesFile', ReactDOM.findDOMNode(this.refs.file).files[0] );
        
        //data.append('user', 'hubot')

        fetch(fileUploadUrl, {
            method: 'POST',
            body: fileData
        }).then(function(data){
                    alert(data)
        }).catch((error) => console.error(error));
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
        </fieldset>
    }
}