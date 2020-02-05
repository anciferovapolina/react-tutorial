import React from 'react';

export class Square extends React.Component {
  render() {
    return (
      <button className={
        this.props.selected ? 'selected square' :
          this.props.isWinSquare ? 'win-squares square' : 'square'}
              onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}
