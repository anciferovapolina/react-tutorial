export const preloadedState = {
  history: [
    {
      squares: Array(9).fill(null),
      column: 0,
      row: 0,
      index: null,
      id: 0,
    }
  ],
  stepNumber: 0,
  xIsNext: true,
  ascendingOrder: true
};

const gameReducer = (state = preloadedState, action) => {
  switch (action.type) {
    case 'CHANGE_ORDER':
      return {
        ...state,
        ascendingOrder: action.payload
      };

    case 'MAKE_MOVE':
      return {
        ...state,
        history: [...action.payload],
      };

    case 'STEP_NUMBER':
      return {
        ...state,
        stepNumber: action.payload,
      };
    case 'X_IS_NEXT':
      return {
        ...state,
        xIsNext: action.payload,
      };

    default:
      return preloadedState;
  }
};

export default gameReducer;
