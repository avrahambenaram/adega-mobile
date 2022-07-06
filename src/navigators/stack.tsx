import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Drawer from './drawer';
import UploadEntrance from '../pages/UploadEntrance';
import UploadProduct from '../pages/UploadProduct';
import UploadSale from '../pages/UploadSale';
import UploadGain from '../pages/UploadGain';
import Entrance from '../pages/Entrance';
import Product from '../pages/Product';
import Sale from '../pages/Sale';
import Gain from '../pages/Gain';

function Stack() {
    const { Navigator, Screen } = createStackNavigator();

    return <View style={{ width: '100%', height: '100%' }}>
        <NavigationContainer>
            <Navigator headerMode="none" initialRouteName="drawer">
                <Screen name="drawer" component={Drawer}/>
                <Screen name="upload-entrance" component={UploadEntrance} />
                <Screen name="upload-product" component={UploadProduct}/>
                <Screen name="upload-sale" component={UploadSale}/>
                <Screen name="upload-gain" component={UploadGain}/>
                <Screen name="entrance" component={Entrance} />
                <Screen name="product" component={Product}/>
                <Screen name="sale" component={Sale} />
                <Screen name="gain" component={Gain} />
            </Navigator>
        </NavigationContainer>
    </View>
}

export default Stack;