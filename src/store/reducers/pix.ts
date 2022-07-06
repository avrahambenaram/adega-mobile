function pixReducer(state: Array<Pix> = [], actions: any) {
    const newState = [...state];
    switch (actions.type) {
        case 'add-pix':
            newState.unshift(actions.value);
            return newState;
        case 'register-pix':
            return actions.value;
        case 'remove-pix':
            newState.splice(actions.index, 1);
            return newState;
        default:
            return state;
    }
}

export default pixReducer;