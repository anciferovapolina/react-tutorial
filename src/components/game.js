import React from 'react';
import { connect } from 'react-redux';
import { changeOrderAction } from '../redux/actions';
import { List } from './list';
import { Board } from './board';
import { ListItem } from './list-item';
import { size } from '../constants';

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
          move: 0,
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      ascendingOrder: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares: squares,
          column: (i % size) + 1,
          row: Math.trunc(i / size) + 1,
          index: i,
          move: history.length ? history.length : 0,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  toggleOrder() {
    this.setState({
      ascendingOrder: !this.state.ascendingOrder
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    console.log(this.props);
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { square: winner, winSquares } = calculateWinner(current.squares) ?
      calculateWinner(current.squares) :
      {
        winner: null,
        winSquares: null
      };

    const moves = history.map((item, index) => {
      const desc = index ?
        'Go to move #' + index + ' column: ' + item.column
        + ' row: ' + item.row : 'Go to game start';

      return (
        <ListItem key={item.move}
                  desc={desc}
                  onClick={(event) => this.jumpTo(item.move, event)}
                  historyIndex={history[item.move].index}
                  currentIndex={current.index}
                  move={item.move}
        />
      );
    });

    // console.log('history: ', history);
    // console.log('current.squares: ', current.squares);
    // console.log('current: ', current);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (!winner && history.length === size * size + 1) {
      status = 'The game is a draw!'
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    if (!this.state.ascendingOrder) {
      moves.sort((a, b) => b.props.move - a.props.move);
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
          <button onClick={() => this.toggleOrder()}>Change order</button>
          <List>{moves}</List>
        </div>
      </div>
    );
  }
}

const ConnectedOrderState = connect((state => ({ascendingOrder: state.gameReducer.ascendingOrder})), { changeOrderAction })(Game);

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
      return { square: squares[a], winSquares: [a, b, c] };
    }
  }
  return null;
}

export default Game;
