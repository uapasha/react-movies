import React from 'react';
import ReactDOM from 'react-dom';
import FileExample from './FileExample.jsx'

const fileUploadUrl = "/api/v1/movies/upload/";
//const fileUploadUrl = "https://react-movies-uapasha-c9.c9users.io/api/v1/movies/upload/";

export default class FileUpload extends React.Component {

    // TODO change notification about file upload.
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            message:'Waiting for a file...',
            showExample:false
        };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleShowExample = this.handleShowExample.bind(this);
    }

    uploadFile(e) {
        e.preventDefault();

        //check if no file were selected
        console.log(!ReactDOM.findDOMNode(this.refs.file).files[0]);
        if (!ReactDOM.findDOMNode(this.refs.file).files[0]) {
            ReactDOM.findDOMNode(this.refs.file).value = '';
            this.setState({
                message: 'Please, select file'
            });
            return
        }
        console.log('hello')
        var fileData = new FormData();

        fileData.append('moviesFile', ReactDOM.findDOMNode(this.refs.file).files[0]);
        ReactDOM.findDOMNode(this.refs.file).value = '';

        fetch(fileUploadUrl, {
            method: 'POST',
            body: fileData
        })
            .then((response) => response.json()
            )
            .then((result) => {
                if (result.fail !== true) {
                    this.setState({
                        message: 'File uploaded',
                        fileName: ''
                    })
                } else {
                    this.setState({
                        message: 'Something went wrong. Have you loaded the right file?',
                        fileName: ''
                    })
                }

            })
            .catch((error) => console.error(error));
    }
    handleFileChange(e){
        let fileName = ReactDOM.findDOMNode(this.refs.file).files[0].name;
        this.setState({
            fileName:fileName
        })
    }
    handleShowExample(){
        this.setState({
            showExample:!this.state.showExample
        })
    }

    render() {
        return <div>
            <h2>Upload a file with movies</h2>
            <form ref="uploadForm"
                  encType="multipart/form-data"
                  onSubmit={this.uploadFile.bind(this)}>
                <input ref="file"
                       type="file"
                       name="moviesFile"
                       id="moviesFile"
                       className="uploadFile"
                       onChange={this.handleFileChange}
                       accept='.txt'/>
                <label htmlFor="moviesFile">
                    {this.state.fileName ? this.state.fileName : 'Choose a file'}
                </label>
                <input type="submit" value="Upload File" name="submit"/>
            </form>
            <p className="message">{this.state.message}</p>
            <button onClick={this.handleShowExample}>
                {this.state.showExample ? 'Hide requirements' : 'Show requirements'}
            </button>
            {this.state.showExample ? <FileExample/> : ''}
        </div>
    }
}