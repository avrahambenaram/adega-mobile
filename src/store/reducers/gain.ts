function gainReducer(state: Array<Gain> = [], actions: any) {
    const newState = [...state];
    switch (actions.type) {
        case 'add-gain':
            newState.unshift(actions.value);
            return newState;
        case 'remove-gain':
            const index = state.findIndex(gain => gain.id === actions.id);
            newState[index].cancelled = true;
            return newState;
        case 'set-gains':
            return actions.value;
        default:
            return state;
    }
}

export default gainReducer;