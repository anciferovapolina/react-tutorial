import React from 'react';
import { connect } from 'react-redux';
import { changeOrderAction, makeMoveAction, stepNumberAction, xIsNextAction } from '../redux/actions';
import { List } from './list';
import { Board } from './board';
import { ListItem } from './list-item';
import { size } from '../constants';

export class Game extends React.Component {
  handleClick(i) {
    const history = this.props.history.slice(0, this.props.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.props.xIsNext ? 'X' : 'O';

    this.props.makeMoveAction(
      {
        history: {
        squares: squares,
        column: (i % size) + 1,
        row: Math.trunc(i / size) + 1,
        index: i,
        id: history.length ? history.length : 0,
      },
        stepNumber: history.length,
        xIsNext: !this.props.xIsNext,
      }
    );
  }

  toggleOrder() {
    this.props.changeOrderAction(!this.props.ascendingOrder);
  }

  jumpTo(step) {
    this.props.stepNumberAction(step);
    this.props.xIsNextAction((step % 2) === 0);
  }

  render() {
    console.log(this.props);
    const history = this.props.history;
    const current = history[this.props.stepNumber];
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
        <ListItem key={item.id}
                  desc={desc}
                  onClick={(event) => this.jumpTo(item.id, event)}
                  historyIndex={history[item.id].index}
                  currentIndex={current.index}
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
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    if (!this.props.ascendingOrder) {
      moves.sort((a, b) => b.props.id - a.props.id);
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

const mapStateToProps = (state) => ({
  ascendingOrder: state.gameReducer.ascendingOrder,
  history: state.gameReducer.history,
  stepNumber: state.gameReducer.stepNumber,
  xIsNext: state.gameReducer.xIsNext,
});
const mapDispatchToProps = { changeOrderAction, makeMoveAction, stepNumberAction, xIsNextAction };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
