import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className={this.props.selected ? 'selected square' : 'square'} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        selected={this.props.index === i}
        key={i}
      />
    );
  }

  generateSquares(size) {
    let calc = 0;

    let boardRow = [];

    let square;
    let squares = [];

    const div = (i) => (
      <div className="board-row" key={i}>
        {squares}
      </div>
    );

    for (let x = 0; x < size; x++) {
      console.log('squares.length - 1: ', (squares.length - 1));
      boardRow.push(div(x));

      for (let y = 0; y < size / size; y++) {
        square = this.renderSquare(x);
        squares.push(square);
      }

      for (let z = 0; z < size; z++) {
        calc++;
        console.log('calc: ', calc);
      }
    }


    return boardRow;
  }


  render() {
    return (
      <div>
        {/*<div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>*/}{this.generateSquares(3)}
      </div>
    );
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <li>
        <button onClick={this.props.onClick}
                className={this.props.historyIndex === this.props.currentIndex ? 'selected' : ''}>
          {this.props.desc}
        </button>
      </li>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          column: 0,
          row: 0,
          index: null,
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // console.log('squares: ', squares);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
          column: (i % 3) + 1,
          row: Math.trunc(i / 3) + 1,
          index: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    console.log('history: ', history);
    console.log('current.squares: ', current.squares);
    console.log('current: ', current);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' column: ' + step.column + ' row: ' + step.row :
        'Go to game start';
      console.log('step: ', step);
      console.log('move: ', move);

      return (
        <ListItem key={move}
                  desc={desc}
                  onClick={(event) => this.jumpTo(move, event)}
                  historyIndex={history[move].index}
                  currentIndex={current.index}
                  move={move}
        />
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            index={current.index}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game/>, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
