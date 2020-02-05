import React from 'react';

export class ListItem extends React.Component {
  render() {
    return (
      <li>
        <button onClick={this.props.onClick}
                className={this.props.historyIndex === this.props.currentIndex ?
                  'selected' : ''}>
          {this.props.desc}
        </button>
      </li>
    )
  }
}
