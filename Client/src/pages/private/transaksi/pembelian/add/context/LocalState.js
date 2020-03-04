import React, { createContext, useReducer } from "react";
import PurchaseReducer from "./purchaseReducer";

//initial state
const initialState = {
  purchase: []
};

//create Context
export const PurchaseContext = createContext(initialState);

export const PurchaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PurchaseReducer, initialState);

  //actions
  function deletePurchase(id) {
    dispatch({
      type: "DELETE_PURCHASE",
      payload: id
    });
  }

  function addPurchase(purchase) {
    dispatch({
      type: "ADD_PURCHASE",
      payload: purchase
    });
  }

  return (
    <PurchaseContext.Provider
      value={{
        purchase: state.purchase,
        deletePurchase,
        addPurchase
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};
