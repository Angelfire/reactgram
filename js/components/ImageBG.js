import React from 'react';

// Image Background
export default class ImageBG extends React.Component {
  render() {
    return (
      <div className="image-bg" style={{backgroundImage: 'url('+ this.props.image + ')'}}></div>
    )
  }
}
