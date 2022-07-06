import React from 'react';
import { View, Dimensions, Text, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import styles from './styles';

interface Props {
    return?: boolean
    children?: any
    sale?: AwaitingSale
    uploadSale?: boolean
    awaitingSaleId?: number
}

const width = Dimensions.get('window').width;

function Header(props: Props) {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    function handleBackSale() {
        if (props.sale && !props.awaitingSaleId) {
            dispatch({
                type: 'add-awaiting-sale',
                value: props.sale
            })
            ToastAndroid.show('Há uma nova venda em espera', ToastAndroid.LONG);
        }
        if (props.sale && props.awaitingSaleId) {
            dispatch({
                type: 'change-awaiting-sale',
                id: props.awaitingSaleId,
                value: props.sale
            })
            ToastAndroid.show('Uma venda em espera foi alterada', ToastAndroid.LONG);
        }
        navigation.goBack();
    }

    function handleCloseSale() {
        if (props.awaitingSaleId) {
            dispatch({
                type: 'remove-awaiting-sale',
                id: props.awaitingSaleId
            })
            ToastAndroid.show('Uma venda em espera foi deletada', ToastAndroid.LONG);
        }
        navigation.goBack();
    }

    function handlePress() {
        if (props.return) {
            navigation.goBack();
        } else {
            (navigation as any).openDrawer();
        }
    }

    if (props.uploadSale) {
        return <View style={styles.container}>
            <RectButton onPress={handleBackSale}>
                <Feather
                    name='arrow-left'
                    size={width * 0.1}
                    color="#FFF"
                />
            </RectButton>
            <Text style={styles.text}>Cadastrar venda</Text>
            <RectButton onPress={handleCloseSale}>
            <Feather
                    name='x'
                    size={width * 0.1}
                    color="#FFF"
                />
            </RectButton>
        </View>
    }

    return <View style={styles.container}>
        <RectButton onPress={handlePress}>
            <Feather
                name={props.return ? 'arrow-left' : 'menu'}
                size={width * 0.1}
                color="#FFF"
            />
        </RectButton>
        <View style={styles.area}>
            {props.children}
        </View>
    </View>
}

export default Header;