export default (state, action) => {
  switch (action.type) {
    case "ADD_PURCHASE":
      const cekIndex = state.purchase.findIndex(
        idx => idx.id_produk === action.payload.id_produk
      );
      if (cekIndex >= 0) {
        const objArr = state.purchase.map(data => {
          if (data.id_produk === action.payload.id_produk) {
            data.qty += 1;
            return data;
          }
          return data;
        });
        return {
          ...state,
          purchase: objArr
        };
      } else {
        return {
          ...state,
          purchase: [action.payload, ...state.purchase]
        };
      }
    /* falls through */
    case "DELETE_PURCHASE":
      return {
        ...state,
        purchase: state.purchase.filter(
          purchase => purchase.id_produk !== action.payload
        )
      };
    /* falls through */
    case "UPDATE_PURCHASE":
      if (action.payload.qty <= 0) {
        return state;
      }
      const objIndex = state.purchase.findIndex(
        obj => obj.id_produk === action.payload.id_produk
      );
      if (objIndex >= 0) {
        const objArr = state.purchase.map(data => {
          if (data.id_produk === action.payload.id_produk) {
            data.qty = action.payload.qty;
            return data;
          }
          return data;
        });
        return {
          ...state,
          purchase: objArr
        };
      }
    /* falls through */
    default:
      return state;
  }
};
