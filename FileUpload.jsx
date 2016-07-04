import React from 'react';
import ReactDOM from 'react-dom';


export default class FileUpload extends React.Component{

    uploadFile(e) {
        e.preventDefault()
        console.log(ReactDOM.findDOMNode(this.refs.file));
        var fd = new FormData();
        fd.append( 'moviesFile', ReactDOM.findDOMNode(this.refs.file).files[0] );

        $.ajax({
            url: 'https://react-movies-uapasha-c9.c9users.io/api/v1/movies/upload',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                alert(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

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