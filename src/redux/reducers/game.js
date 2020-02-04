const initialState = {
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

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_ORDER':
      return {
        ...state,
        ascendingOrder: action.payload
      };

    case 'MAKE_MOVE':
      return {
        ...state,
        moveList: { ...action.payload }
      };

    default:
      return initialState;
  }
};

export default gameReducer;
