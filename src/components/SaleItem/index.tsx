import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface Props {
    sale: Sale
}

function treatTxtDt(number: number) {
    if (number > 9) {
        return `${number}`;
    } else {
        return `0${number}`;
    }
}

function treatDate(dateStr: string) {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${treatTxtDt(day)}/${treatTxtDt(month)}/${year} - ${treatTxtDt(hours)}:${treatTxtDt(minutes)}`;
}

function SaleItem(props: Props) {

    const navigation = useNavigation();

    const { sale } = props;

    function handleSeeSale() {
        navigation.navigate('sale', { id: sale.id });
    }

    return <RectButton onPress={handleSeeSale}>
        <View style={[
            styles.container,
            {
                borderColor: props.sale.cancelled ? '#dc3545' : 'lightgray'
            }
            ]}>
            <Text style={styles.textProduct}>{sale.products.length} produto{sale.products.length > 1 ? 's' : ''}</Text>
            <Text style={styles.textDate}>{treatDate(sale.saleDate)}</Text>
            <Text style={styles.textPrice}>R$ {sale.price.toFixed(2).replace('.', ',')}</Text>
        </View>
    </RectButton>
}

export default SaleItem;