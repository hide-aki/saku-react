export default (state, action) => {
  switch (action.type) {
    case "ADD_PURCHASE":
      return {
        ...state,
        purchase: [action.payload, ...state.purchase]
      };
    case "DELETE_PURCHASE":
      return {
        ...state,
        purchase: state.purchase.filter(
          purchase => purchase.id_produk !== action.payload
        )
      };
    default:
      return state;
  }
};
