import React from 'react';

class InformationNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      align: "left", 
      title: props.title, 
      content: props.content
    };
  }
  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <p>{this.state.content}</p>
      </div>
    );
  }
}
  
export default InformationNode;