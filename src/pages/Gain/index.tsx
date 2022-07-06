import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

import styles from './styles';

import api from '../../services/api';

const initialState: Gain = {
    cancelled: false,
    gainDate: '',
    gainDay: 0,
    gainHour: 0,
    gainMinute: 0,
    gainMonth: 0,
    gainSecond: 0,
    gainTime: 0,
    gainYear: 0,
    holiday: false,
    id: '',
    temperature: 0,
    total: 0,
    weekday: 0,
    weekend: false
}

interface GetData {
    data: Gain
}

function Sale() {

    const { params } = useRoute();
    const navigation = useNavigation();

    const [gain, setGain] = useState<Gain>(initialState);
    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(true);

    function treatWeekday() {
        switch (gain.weekday) {
            case 0:
                return 'Domingo';
            case 1:
                return 'Segunda-feira';
            case 2:
                return 'Terça-feira';
            case 3:
                return 'Quarta-feira';
            case 4:
                return 'Quinta-feira';
            case 5:
                return 'Sexta-feira';
            case 6:
                return 'Sábado';
            default:
                return 'Domingo';
        }
    }
    function treatDateValue(value: number): string {
        if (value > 9) {
            return `${value}`;
        } else {
            return `0${value}`;
        }
    }

    function treatDate(): string {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${treatDateValue(day)}/${treatDateValue(month)}/${year} ${treatDateValue(hours)}:${treatDateValue(minutes)}`;
    }

    async function fetchGain() {
        try {
            const { id } = params as any;
            const { data: newGain } = await api.get(`gain/${id}`) as GetData;
            setGain(newGain);
            setDate(new Date(newGain.gainDate));
        } catch(err) {
            alert('Um erro ocorreu ao carregar sua venda');
        }
        setLoading(false);
    }

    async function cancelSale() {
        try {
            const { id } = params as any;
            await api.delete(`gain/${id}`);
            alert('Ganho cancelado com sucesso');
            navigation.goBack();
        } catch(err) {
            alert('Um erro ocorreu ao cancelar o ganho');
        }
    }

    function handleCancelGain() {
        Alert.alert(
            'Você está prestes a cancelar um ganho',
            `Total: R$${gain.total}\nTemperatura: ${gain.temperature}`,
            [{
                text: 'Não cancelar'
            }, {
                text: 'Cancelar',
                onPress: cancelSale
            }],
            {
                cancelable: true
            }
        )
    }

    useEffect(() => {
        fetchGain();
    }, [])

    return <View style={styles.container}>
        <Header return>
            <Text style={styles.headerText}>Ganho</Text>
        </Header>
        <ScrollView style={styles.main}>
            {loading ? <ActivityIndicator
                color="#17a2b8"
                size="large"
            /> : null}
            <Text style={styles.h1}>Data e horário do ganho</Text>
            <Text style={styles.subtitle}>{treatDate()}</Text>
            <View style={styles.table}>
                <Text style={styles.finalValuePrice}>Resumo:</Text>
                <View style={styles.finalValue}>
                    <Text style={styles.finalValuePrice}>Temperatura</Text>
                    <Text style={styles.finalValuePriceText}>${gain.temperature}</Text>
                </View>
                <View style={styles.finalValue}>
                    <Text style={styles.finalValuePrice}>Fim de semana</Text>
                    <Text style={styles.finalValuePriceText}>{gain.weekend ? 'Sim' : 'Não'}</Text>
                </View>
                <View style={styles.finalValue}>
                    <Text style={styles.finalValuePrice}>Feriado</Text>
                    <Text style={styles.finalValuePriceText}>{gain.holiday ? 'Sim' : 'Não'}</Text>
                </View>
                <View style={styles.finalValue}>
                    <Text style={styles.finalValuePrice}>Dia da semana</Text>
                    <Text style={styles.finalValuePriceText}>{treatWeekday()}</Text>
                </View>
                <View style={styles.finalValue}>
                    <Text style={styles.finalValueText}>Valor total:</Text>
                    <Text style={styles.finalValueMoney}>R$ {gain.total}</Text>
                </View>
            </View>
        </ScrollView>
        {!gain.cancelled ? <View style={styles.footer}>
            <RectButton onPress={handleCancelGain}>
                <Text style={styles.footerText}>Cancelar ganho</Text>
            </RectButton>
        </View> : null}
    </View>
}

export default Sale;