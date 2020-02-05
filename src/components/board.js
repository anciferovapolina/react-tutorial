import React from 'react';
import { Square } from './square';
import { size } from '../constants';

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        isWinSquare={this.props.winSquares?.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        selected={this.props.index === i && !this.props.winSquares?.includes(i)}
        key={i}
      />
    );
  }

  render() {
    let boardRow = [];
    let squares = [];

    for (let i = 0; i < size * size; i++) {
      const square = this.renderSquare(i);
      squares.push(square);
    }

    for (let i = 0; i < size; i++) {
      let arr = squares.slice(i * size, i * size + size);
      const div = (
        <div className="board-row" key={i}>
          {arr}
        </div>
      );
      boardRow.push(div);
    }

    return (
      <div>
        {boardRow}
      </div>
    );
  }
}
