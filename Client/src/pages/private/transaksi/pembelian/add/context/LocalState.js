import React, { createContext, useReducer } from 'react';
import PurchaseReducer from './purchaseReducer';

//initial state
const initialState = {
    purchase: [
        { id: 1, nama: 'Tupperware', qty: 3, harga: 20000 },
        { id: 2, nama: 'Casing', qty: 2, harga: 60000 },
        { id: 3, nama: 'Water', qty: 1, harga: 20000 },
        { id: 4, nama: 'Laptop', qty: 4, harga: 10000 },
        { id: 5, nama: 'Tissue', qty: 1, harga: 30000 },
    ]
}

//create Context
export const PurchaseContext = createContext(initialState);

export const PurchaseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PurchaseReducer, initialState);

    //actions
    function deletePurchase(id) {
        dispatch({
            type: 'DELETE_PURCHASE',
            payload: id
        });
    }

    return <PurchaseContext.Provider
        value={{
            purchase: state.purchase,
            deletePurchase
        }}>
        {children}
    </PurchaseContext.Provider>
}