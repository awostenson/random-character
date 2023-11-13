import React from 'react';
import Button from '@mui/material/Button';

class GenerateNewButton extends React.Component {

  render() {
    return (
      <div element class=".Generate-button">
        <Button variant="outlined" onClick={this.props.refresh}>Generate New</Button>
      </div>
    );
  }
}

export default GenerateNewButton;