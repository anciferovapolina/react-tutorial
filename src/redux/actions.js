/*export const changeOrderAction = (order) => {
  return {
    type: 'CHANGE_ORDER',
    payload: order
  }
};

export const makeMoveAction = (payload) => {
  return {
    type: 'MAKE_MOVE',
    payload
  }
};*/

export const changeOrderAction = (isAscendingOrder) => ({
  type: 'CHANGE_ORDER',
  payload: {
    ascendingOrder: isAscendingOrder,
  }
});

export const makeMoveAction = (payload) => ({
  type: 'MAKE_MOVE',
  payload
});
