function saleReducer(state: Array<Sale> = [], actions: any) {
    const newState = [...state];
    switch (actions.type) {
        case 'add-sale':
            newState.unshift(actions.value);
            return newState;
        case 'remove-sale':
            const index = state.findIndex(sale => sale.id === actions.id);
            newState[index].cancelled = true;
            return newState;
        case 'set-sales':
            return actions.value;
        default:
            return state;
    }
}

export default saleReducer;