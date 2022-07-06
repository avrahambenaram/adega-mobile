import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface Props {
    gain: Gain
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

function GainItem(props: Props) {

    const navigation = useNavigation();

    const { gain } = props;

    function handleSeeSale() {
        navigation.navigate('gain', { id: gain.id });
    }

    return <RectButton onPress={handleSeeSale}>
        <View style={[
            styles.container,
            {
                borderColor: props.gain.cancelled ? '#dc3545' : 'lightgray'
            }
            ]}>
            <Text style={styles.textTemperature}>{gain.temperature}°C</Text>
            <Text style={styles.textDate}>{treatDate(gain.gainDate)}</Text>
            <Text style={styles.textPrice}>R$ {gain.total.toFixed(2).replace('.', ',')}</Text>
        </View>
    </RectButton>
}

export default GainItem;