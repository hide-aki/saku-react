export default (state, action) => {
    switch (action.type) {
        case 'DELETE_PURCHASE':
            return {
                ...state,
                purchase: state.purchase.filter(purchase => purchase.id !== action.payload)
            }
        default:
            return state;
    }
}