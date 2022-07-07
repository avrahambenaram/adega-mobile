import React from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import url from '../../services/url';

interface Props {
    id: string
    name: string
    image: string
    purchasePrice: number
    salePrice: number
    quantity: number
    [index: string]: any
    sale?: boolean
    entrance?: boolean
}

function ProductCard(props: Props) {

    const navigation = useNavigation();

    function handleSeeProduct() {
        navigation.navigate('product', { id: props.id });
    }

    return <RectButton onPress={handleSeeProduct}>
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={{ uri: `${url}/product/image/${props.image}` }}
            />
            <View style={styles.infoContainer}>
                <View style={styles.infoNameContainer}>
                    <Text style={styles.infoName}>{props.name}</Text>
                    <Text style={styles.infoQuantity}>{props.quantity}x</Text>
                </View>
                <View style={styles.infoPricesContainer}>
                    {!props.sale ? <View style={[styles.infoPriceContainer, {backgroundColor: '#dc3545'}]}>
                        <Text style={styles.infoPrice}>-R$ {props.purchasePrice.toFixed(2)}</Text>
                    </View> : null}
                    {!props.entrance ?  <View style={[styles.infoPriceContainer, {backgroundColor: '#1e7e34'}]}>
                        <Text style={styles.infoPrice}>+R$ {props.salePrice.toFixed(2)}</Text>
                    </View> : null}
                </View>
            </View>
        </View>
    </RectButton>
}

export default ProductCard;