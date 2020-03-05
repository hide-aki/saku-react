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
    case "UPDATE_PURCHASE":
      const objIndex = state.purchase.findIndex(
        obj => obj.id_produk === action.id_produk
      );
      const updated = { ...state.purchase[objIndex], qty: action.qty };
      console.log(updated);
      console.log(state.purchase);
    // return {
    //   ...state,
    //   purchase: state.purchase.findIndex(
    //     obj => obj.id_produk === action.id_produk
    //   )
    // };
    default:
      return state;
  }
};
