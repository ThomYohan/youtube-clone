import React, { Component } from 'react';
import './Upload.css';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import uTubeUpload3 from '../../images/uTubeUpload3.png';
import Swal from 'sweetalert2';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      url: '',
      user_id: 0,
      category: '',
      title: "",
      video_desc: "",
      thumbnail: 'thumbnails.jpg',
      userInfo: {},
      vidDuration: ''
    };
    this.submitVideo = this.submitVideo.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    axios.get('/api/userinfo')
    .then( (res) => {
      this.setState({userInfo: res.data, user_id: res.data.user_id})
      if(!this.state.user_id){
        Swal ({
          type: 'warning',
          title: 'Oops...',
          text: 'Sign in to access this feature',
          onClose: () => {
            this.props.history.push('/')
          }
        })
      }
    })
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
    let vid = document.getElementById('uploaded-video-thumbnail')
    console.log(vid.duration)
    let {duration} = vid
    let minutes = Math.floor((duration)/60)
    let second = Math.floor((duration) % 60)
    let seconds = ('0' + second).slice(-2)
    let strDuration = `${minutes}:${seconds}`
    console.log(strDuration)
    // this.setState({vidDuration: strDuration})
    let {url, user_id, category, title, video_desc, thumbnail} = this.state
    axios.post('/api/upload', {url, user_id, category, title, video_desc, thumbnail, strDuration})
        .then( () => console.log('successfully saved video info to db'))
        .catch( err => console.log(err))
    event.preventDefault();
  }

  render() {
    const { url, isUploading } = this.state;
    
    return (
      <div className="upload-page">
        <div className="upload-section" >
          <video id="uploaded-video-thumbnail" src={url} alt="video_preview" controls/>

          <div className="upload-area">
            <Dropzone
              onDropAccepted={this.getSignedRequest}
              style={{
                position: 'relative',
                width: '40vw',
                height: '30vh',
                borderWidth: 3,
                margin: 0,
                borderColor: 'rgb(175, 175, 175)',
                borderRadius: 15,
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
                  <img id='upload-icon-btn' src={uTubeUpload3} alt='u tube upload' />
                  <p>Select file to upload</p>
                </div>}
            </Dropzone>
          </div>

          <form className='upload-form' onSubmit={this.submitVideo}>
            <select required name="category" className='category' onChange={this.handleInput}>
              <option value="" disabled selected>Select a category</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="gaming">Gaming</option>
              <option value="movies">Movies</option>
              <option value="tv-shows">TV Shows</option>
              <option value="news">News</option>
              <option value="other">Other</option>          
            </select>
            <input required type="text" placeholder="Title... (Max 80)" name="title" onChange={this.handleInput} className='title' maxLength="80" />
            <textarea type="text" placeholder="Description..." name="video_desc" className='description' onChange={this.handleInput} />
            <p>{}</p>
            <input className='submit' type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Upload;
