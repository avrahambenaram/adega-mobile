function awaitingSaleReducer(state: Array<AwaitingSale> = [], actions: any) {
    const newState = [...state];
    switch (actions.type) {
        case 'add-awaiting-sale':
            newState.push(actions.value);
            return newState;
        case 'change-awaiting-sale':
            const index2 = state.findIndex(sale => sale.id === actions.id);
            if (index2 !== -1) {
                newState[index2] = {
                    ...actions.value,
                    id: actions.id
                }
            }
            return newState;
        case 'remove-awaiting-sale':
            const index = state.findIndex(sale => sale.id === actions.id);
            if (index !== -1) {
                newState.splice(index, 1);
            }
            return newState;
        default:
            return state;
    }
}

export default awaitingSaleReducer;