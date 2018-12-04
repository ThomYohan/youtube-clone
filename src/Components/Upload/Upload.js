import React, { Component } from 'react';
import './Upload.css';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import uTubeUpload from '../../images/uTubeUpload.png';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      url: 'http://via.placeholder.com/450x450',
      user_id: 1,
      category: '',
      title: "",
      video_desc: "",
      thumbnail: 'thumbnails.jpg'
    };
    this.submitVideo = this.submitVideo.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  getSignedRequest = ([file]) => {

    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        console.log(file)
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        console.log(response)
        this.setState({ isUploading: false, url });
        console.log(url)

      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  submitVideo(event){
    let {url, user_id, category, title, video_desc, thumbnail} = this.state
    axios.post('/api/upload', {url, user_id, category, title, video_desc, thumbnail})
        .then( () => console.log('successfully saved video info to db'))
        .catch( err => console.log(err))
    event.prevenDefault();
  }

  render() {
    const { url, isUploading } = this.state;
    return (
      <div className="upload-page">
        <h1>Upload</h1>
        <h1>{url}</h1>
        <video src={url} alt="" width="450px"/>

        <div className="upload-area">
          <Dropzone
            onDropAccepted={this.getSignedRequest}
            style={{
              position: 'relative',
              width: '40vw',
              height: '30vh',
              borderWidth: 7,
              margin: 10,
              borderColor: 'rgb(102, 102, 102)',
              borderStyle: 'dashed',
              borderRadius: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.75rem',
            }}
            accept="video/*"
            multiple={false}
            >
            {isUploading ? <GridLoader /> : 
              <div className='upload-box'>
                <img src={uTubeUpload} />
                <p>Select file to upload</p>
              </div>}
          </Dropzone>
        </div>

        <form onSubmit={this.submitVideo}>
          <label>
            Category
            <select required name="category" onChange={this.handleInput}>
              <option value="" disabled selected>Select one</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="gaming">Gaming</option>
              <option value="movies">Movies</option>
              <option value="tv-shows">TV Shows</option>
              <option value="news">News</option>
              <option value="other">Other</option>          
            </select>
          </label>
          <input required type="text" placeholder="Title..." name="title" onChange={this.handleInput} />
          <textarea type="text" placeholder="Description..." name="video_desc" onChange={this.handleInput} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Upload;
