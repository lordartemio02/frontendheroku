import React, { Component } from 'react';
import axios from "axios";

class FileUpload extends Component {
    custom_file_upload_url = `https://whispering-peak-01746.herokuapp.com/loadFiles`;
    constructor(props) {
        super(props);
        this.state = {
            image_file: null,
            image_preview: '',
        }
    }

    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }
    handleSubmitFile = () => {
        if (this.state.image_file !== null){
            let formData = new FormData();
            formData.append('file', this.state.image_file);

            console.log(this.state.image_file);
            axios.post(
                this.custom_file_upload_url,
                formData,
            )
            .then(res => {
                console.log(`Success` + res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    render() {
        return (
            <div className="container">
                <div className='blockImg'>
                    <h1 className='h1'>
                        Add New file
                    </h1>
                    <input
                        className='button'
                        type="file"
                        onChange={this.handleImagePreview}
                    />
                    <br />

                    <input className='button' type="submit" onClick={this.handleSubmitFile} value="Upload file"/>
                </div>
                <img className="image" src={this.state.image_preview} alt="image preview"/>
            </div>
        );
    }
}

export default FileUpload;