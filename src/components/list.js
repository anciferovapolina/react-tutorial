import React from 'react';

export class List extends React.Component {
  render() {
    return (
      <ol>
        {this.props.children}
      </ol>
    )
  }
}
