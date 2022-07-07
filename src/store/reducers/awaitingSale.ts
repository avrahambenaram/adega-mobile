import AsyncStorage from '@react-native-async-storage/async-storage';

async function addAwaitingSaleToStorage(newSale: AwaitingSale) {
    const awaitingSalesJSON = await AsyncStorage.getItem('awaiting-sales');
    if (awaitingSalesJSON !== null) {
        const awaitingSales: Array<AwaitingSale> = JSON.parse(awaitingSalesJSON as any);
        awaitingSales.push(newSale);
        await AsyncStorage.setItem('awaiting-sales', JSON.stringify(awaitingSales));
    }
}
async function changeAwaitingSaleFromStorage(id: number, changedSale: AwaitingSale) {
    const awaitingSalesJSON = await AsyncStorage.getItem('awaiting-sales');
    if (awaitingSalesJSON !== null) {
        const awaitingSales: Array<AwaitingSale> = JSON.parse(awaitingSalesJSON as any);
        const index = awaitingSales.findIndex(sale => sale.id === id);
        if (index !== -1) {
            awaitingSales[index] = {
                ...changedSale,
                id
            }
            await AsyncStorage.setItem('awaiting-sales', JSON.stringify(awaitingSales));
        }
    }
}
async function removeAwaitingSaleFromStorage(id: number) {
    const awaitingSalesJSON = await AsyncStorage.getItem('awaiting-sales');
    if (awaitingSalesJSON !== null) {
        const awaitingSales: Array<AwaitingSale> = JSON.parse(awaitingSalesJSON as any);
        const index = awaitingSales.findIndex(sale => sale.id === id);
        if (index !== -1) {
            awaitingSales.splice(index, 1);
            await AsyncStorage.setItem('awaiting-sales', JSON.stringify(awaitingSales));
        }
    }
}

function awaitingSaleReducer(state: Array<AwaitingSale> = [], actions: any) {
    const newState = [...state];
    switch (actions.type) {
        case 'add-awaiting-sale':
            newState.push(actions.value);
            addAwaitingSaleToStorage(actions.value);
            return newState;
        case 'change-awaiting-sale':
            const index2 = state.findIndex(sale => sale.id === actions.id);
            if (index2 !== -1) {
                newState[index2] = {
                    ...actions.value,
                    id: actions.id
                }
            }
            changeAwaitingSaleFromStorage(actions.id, actions.value);
            return newState;
        case 'remove-awaiting-sale':
            const index = state.findIndex(sale => sale.id === actions.id);
            if (index !== -1) {
                newState.splice(index, 1);
            }
            removeAwaitingSaleFromStorage(actions.id);
            return newState;
        case 'set-awaiting-sale':
            return actions.value;
        default:
            return state;
    }
}

export default awaitingSaleReducer;