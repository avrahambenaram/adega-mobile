import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface Props {
    entrance: Entrance
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

function EntranceItem(props: Props) {

    const navigation = useNavigation();

    const { entrance } = props;

    function handleSeeEntrance() {
        navigation.navigate('entrance', { id: entrance.id });
    }

    return <RectButton onPress={handleSeeEntrance}>
        <View style={[
            styles.container,
            {
                borderColor: props.entrance.cancelled ? '#dc3545' : 'lightgray'
            }
            ]}>
            <Text style={styles.textProduct}>{entrance.products.length} produto{entrance.products.length > 1 ? 's' : ''}</Text>
            <Text style={styles.textDate}>{treatDate(entrance.entranceDate)}</Text>
            <Text style={styles.textPrice}>R$ {entrance.price.toFixed(2).replace('.', ',')}</Text>
        </View>
    </RectButton>
}

export default EntranceItem;