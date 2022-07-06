function entranceReducer(state: Array<Entrance> = [], actions: any) {
    const newState = [...state];
    switch (actions.type) {
        case 'add-entrance':
            newState.unshift(actions.value);
            return newState;
        case 'remove-entrance':
            const index = state.findIndex(entrance => entrance.id === actions.id);
            newState[index].cancelled = true;
            return newState;
        case 'set-entrances':
            return actions.value;
        default:
            return state;
    }
}

export default entranceReducer;