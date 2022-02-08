import React, { Component } from 'react';

export default class UploadPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
    };
    this.onChange = this.onChange.bind(this);
    // this.resetFile = this.resetFile.bind(this);
  }
  onChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }

  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  render() {
    return (
      <div>
        <img
          style={{ width: '100', height: '100', marginRight: '20px' }}
          src={this.state.file}
          className="rounded float-left"
        />
        <input type="file" onChange={this.onChange} />
        {/* {this.state.file && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={this.resetFile}>Remove File</button>
          </div>
        )} */}
      </div>
    );
  }
}
