import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Entrances from '../pages/Entrances';
import Products from '../pages/Products';
import Sales from '../pages/Sales';

function Drawer() {
    const { Screen, Navigator } = createDrawerNavigator();

    return <Navigator
        initialRouteName="products"
        drawerStyle={{
            backgroundColor: '#F7F7F7',
            padding: 0,
            margin: 0
        }}
        drawerContentOptions={{
            activeTintColor: '#FFF',
            activeBackgroundColor: '#007bff',
            inactiveTintColor: '#007bff',
            inactiveBackgroundColor: 'transparent',
            itemStyle: {
                width: '100%',
                transform: [{
                    translateX: -10
                }],
                marginVertical: 5
            }
        }}
    >
        <Screen name="products" component={Products} options={{
            drawerLabel: 'Produtos'
        }}/>
        <Screen name="entrances" component={Entrances} options={{
            drawerLabel: 'Entradas'
        }}/>
        <Screen name="sales" component={Sales} options={{
            drawerLabel: 'Vendas'
        }}/>
    </Navigator>
}

export default Drawer;