import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import store from './src/store';

import Stack from './src/navigators/stack';

import url from './src/services/url';

const socket = io(url);
export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito400: Nunito_400Regular,
    Nunito600: Nunito_600SemiBold,
    Nunito700: Nunito_700Bold
  })

  useEffect(() => {
    async function prevent() {
      preventAutoHideAsync();
    }
    async function hide() {
      hideAsync();
    }
    if (!fontsLoaded) {
      prevent();
    } else {
      hide();
    }
  }, [fontsLoaded])

  useEffect(() => {

    async function load() {
      try {
        const awaitingSalesJSON = await AsyncStorage.getItem('awaiting-sales');
        if (awaitingSalesJSON !== null) {
          store.dispatch({
            type: 'set-awaiting-sale',
            value: JSON.parse(awaitingSalesJSON as any)
          })
        } else {
          await AsyncStorage.setItem('awaiting-sales', JSON.stringify([]));
        }
      } catch(err) {
        console.log(err);
      }
    }

    socket.on('product-new', (product: Product) => {
      store.dispatch({
        type: 'add-product',
        value: product
      })
      ToastAndroid.show('Novo produto cadastrado', ToastAndroid.LONG);
    })
    socket.on('product-change', (product: Product) => {
      store.dispatch({
        type: 'change-product',
        value: product,
        id: product.id
      })
      ToastAndroid.show('Um produto foi alterado', ToastAndroid.LONG);
    })
    socket.on('product-delete', (product: Product) => {
      store.dispatch({
        type: 'remove-product',
        id: product.id
      })
      ToastAndroid.show('Um produto foi deletado', ToastAndroid.LONG);
    })

    socket.on('entrance-new', (entrance: Entrance) => {
      store.dispatch({
        type: 'add-entrance',
        value: entrance
      })
      ToastAndroid.show('Nova entrada cadastrada', ToastAndroid.LONG);
    })
    socket.on('entrance-delete', (entrance: Entrance) => {
      store.dispatch({
        type: 'remove-entrance',
        id: entrance.id
      })
      ToastAndroid.show('Uma entrada foi cancelada', ToastAndroid.LONG);
    })

    socket.on('sale-new', (sale: Sale) => {
      store.dispatch({
        type: 'add-sale',
        value: sale
      })
      ToastAndroid.show('Nova venda cadastrada', ToastAndroid.LONG);
    })
    socket.on('sale-delete', (sale: Sale) => {
      store.dispatch({
        type: 'remove-sale',
        id: sale.id
      })
      ToastAndroid.show('Uma venda foi cancelada', ToastAndroid.LONG);
    })

    socket.on('gain-new', (gain: Gain) => {
      store.dispatch({
        type: 'add-gain',
        value: gain
      })
      ToastAndroid.show('Novo ganho cadastrado', ToastAndroid.LONG);
    })
    socket.on('gain-delete', (gain: Gain) => {
      store.dispatch({
        type: 'remove-gain',
        id: gain.id
      })
      ToastAndroid.show('Um ganho foi cancelado', ToastAndroid.LONG);
    })
    socket.on('pix-new', (pix: Pix) => {
      store.dispatch({
        type: 'add-pix',
        value: pix
      })
      console.log(pix)
      ToastAndroid.show('Um pix novo foi feito', ToastAndroid.LONG);
    })
    socket.on('pix-register', (pixs: Array<Pix>) => {
      store.dispatch({
        type: 'register-pix',
        value: pixs
      })
      console.log('Pixs', pixs)
    })
    load();
  }, [])

  if (fontsLoaded) {
    return (
      <GestureHandlerRootView style={{flex:1}}>
      <Provider store={store}>
        <View style={styles.container}>
          <Stack/>
          <StatusBar style="light" />
        </View>
      </Provider>
      </GestureHandlerRootView>
      
    );
  } else {
    return <View/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
