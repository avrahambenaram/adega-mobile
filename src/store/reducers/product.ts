function productReducer(state: Array<Product> = [], actions: any) {
    const newState = [...state];
    switch (actions.type) {
        case 'add-product':
            newState.unshift(actions.value);
            return newState;
        case 'remove-product':
            const index = state.findIndex(product => product.id === actions.id);
            newState.splice(index, 1);
            return newState;
        case 'set-products':
            return actions.value;
        default:
            return state;
    }
}

export default productReducer;