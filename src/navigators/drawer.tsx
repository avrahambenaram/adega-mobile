import { useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

import Entrances from '../pages/Entrances';
import Products from '../pages/Products';
import Sales from '../pages/Sales';
import Gains from '../pages/Gains';
import Pixs from '../pages/Pixs';

import AwaitingSale from '../components/AwaitingSale';

const screen = Dimensions.get('screen');
const modalizeConfig = {
    width: screen.width,
    height: screen.height * 0.07
}

function Drawer() {
    const { Screen, Navigator } = createDrawerNavigator();

    const modalize = useRef<Modalize>(null);

    const awaitingSales = useSelector((store: any) => store.awaitingSale);

    return <>
    <Navigator
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
        <Screen name="gains" component={Gains} options={{
            drawerLabel: 'Ganhos'
        }}/>
        <Screen name="pixs" component={Pixs} options={{
            drawerLabel: 'Pix histórico'
        }}/>
    </Navigator>
    {awaitingSales.length > 0 ? <>
    <Modalize
        ref={modalize}
        modalHeight={screen.height * 0.65}
        modalStyle={{backgroundColor:'#F7F7F7'}}
        alwaysOpen={modalizeConfig.height}
        >
        <LinearGradient
            colors={['#F7F7F7', '#007bff']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.gradient}
        >
            <Text style={styles.gradientText}>Vendas em espera</Text>
        </LinearGradient>
        <FlatList
            data={awaitingSales}
            renderItem={({ item }) => <AwaitingSale item={item}/>}
            keyExtractor={awaitingSale => awaitingSale.id}
            style={styles.flatlist}
        />
    </Modalize>
    <View style={styles.awaitingSalesView}/>
    </> : null}
    </>
}

const styles = StyleSheet.create({
    awaitingSalesView: {
        width: modalizeConfig.width,
        height: modalizeConfig.height
    },

    awaitingSales: {
        width: modalizeConfig.width,
        height: modalizeConfig.height
    },

    gradient: {
        width: modalizeConfig.width,
        height: modalizeConfig.height,

        justifyContent: 'center',
        alignItems: 'center'
    },

    gradientText: {
        fontFamily: 'Nunito400',
        fontSize: 18,
        color: '#fff'
    },

    flatlist: {
        width: modalizeConfig.width,
        height: screen.height * 0.65 - modalizeConfig.height
    }
})

export default Drawer;