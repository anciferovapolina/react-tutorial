import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let size = 3;

class Square extends React.Component {
  render() {
    return (
      <button className={
        this.props.selected ? 'selected square' :
        this.props.isWinSquare ? 'win-squares square': 'square'}
              onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
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

  generateSquares(size) {
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
    return boardRow;
  }

  render() {
    return (
      <div>
        {this.generateSquares(size)}
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

/*class List extends React.Component {
  render() {
    return (
      <ol>

      </ol>
    )
  }
}*/

/*class Sorting extends React.Component {
/!*  constructor(props) {
    super(props);
    this.sorting = this.sorting.bind(this);
  }

  sorting(order) {
    this.props.onClick(order);
  }*!/

  render() {
    return(
      <div>
        <button onClick={() => this.props.onClick('increasing')}>Increasing &uarr;</button>
        <button onClick={() => this.props.onClick('decreasing')}>Decreasing &darr;</button>
      </div>
    )
  }
}*/

class Game extends React.Component {
  constructor(props) {
    super(props);
    // this.sorting = this.sorting.bind(this);

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
      // moveList: []
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
          column: (i % size) + 1,
          row: Math.trunc(i / size) + 1,
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

  /*  sorting(order) {
      const arr = this.state.moveList;
      arr.sort((a, b) => order === 'increasing' ? a.move - b.move : b.move - a.move);
      this.setState({
        moveList: arr,
      });
    }*/

  generateList() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const arr = history.map((item, move) => ({move, item})); // move: 3, item: squares: (9) [null, null, "X", null, null, "O", null, null, "X"] column: 3 row: 3 index: 8
    /*    this.setState({
          moveList: arr,
        });*/
    return arr.map((step) => {
      const desc = step.move ?
        'Go to move #' + step.move + ' column: ' + step.item.column + ' row: ' + step.item.row :
        'Go to game start';

      return (
        <ListItem key={desc}
                  desc={desc}
                  onClick={(event) => this.jumpTo(step.move, event)}
                  historyIndex={history[step.move].index}
                  currentIndex={current.index}
                  move={step.move}
        />
      );
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const {winner, winSquares} = calculateWinner(current.squares) ? calculateWinner(current.squares) : {winner: null, winSquares: null};

    // console.log('history: ', history);
    // console.log('current.squares: ', current.squares);
    // console.log('current: ', current);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (!winner && history.length === size * size + 1) {
      status = 'The game is a draw!'
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
            winSquares={winSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {/*<Sorting onClick={this.sorting}/>*/}
          <ol>{this.generateList()}</ol>
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
      return {square: squares[a], winSquares: [a, b, c]};
    }
  }
  return null;
}
