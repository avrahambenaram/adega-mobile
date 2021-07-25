import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard';

import styles from './styles';

import api from '../../services/api';

const initialState: EntranceId = {
    cancelled: false,
    items: [],
    id: '',
    price: 0,
    products: [],
    entranceDate:  '',
    entranceDay:  0,
    entranceHour: 0,
    entranceMinute: 0,
    entranceMonth: 0,
    entranceSecond: 0,
    entranceTime: 0,
    entranceYear: 0
}

interface GetData {
    data: EntranceId
}

function Entrance() {

    const { params } = useRoute();
    const navigation = useNavigation();

    const [entrance, setEntrance] = useState<EntranceId>(initialState);
    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(true);

    function treatPrice(price: number) {
        return price.toFixed(2).toString().replace('.', ',');
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

    async function fetchEntrance() {
        try {
            const { id } = params as any;
            const { data: newEntrance } = await api.get(`entrance/${id}`) as GetData;
            newEntrance.products.map((product, index) => {
                newEntrance.items[index].quantity = product.quantity;
            })
            setEntrance(newEntrance);
            setDate(new Date(newEntrance.entranceDate));
        } catch(err) {
            alert('Um erro ocorreu ao carregar sua entrada');
        }
        setLoading(false);
    }

    async function cancelEntrance() {
        try {
            const { id } = params as any;
            await api.delete(`entrance/${id}`);
            alert('Entrada cancelada com sucesso');
            navigation.goBack();
        } catch(err) {
            alert('Um erro ocorreu ao cancelar a entrada');
        }
    }

    function handleCancelEntrance() {
        Alert.alert(
            'Você está prestes a cancelar uma entrada',
            `Produtos: ${entrance.products.length}\nValor: R$ ${treatPrice(entrance.price)}`,
            [{
                text: 'Não cancelar'
            }, {
                text: 'Cancelar',
                onPress: cancelEntrance
            }],
            {
                cancelable: true
            }
        )
    }

    useEffect(() => {
        fetchEntrance();
    }, [])

    return <View style={styles.container}>
        <Header return>
            <Text style={styles.headerText}>Entrada</Text>
        </Header>
        <ScrollView style={styles.main}>
            <Text style={styles.h1}>Produtos</Text>
            {loading ? <ActivityIndicator
                color="#17a2b8"
                size="large"
            /> : null}
            <FlatList
                style={styles.productsContainer}
                contentContainerStyle={styles.productsContainerContent}
                horizontal
                data={entrance.items}
                renderItem={({ item }) => <ProductCard {...item} entrance/>}
                keyExtractor={(_, index) => `${index}`}
            />
            <Text style={styles.h1}>Data e horário da entrada</Text>
            <Text style={styles.subtitle}>{treatDate()}</Text>
            <Text style={styles.h1}>Pagamento</Text>
            <View style={styles.table}>
                <View style={styles.thead}>
                    <Text style={styles.ttitle}>Forma</Text>
                    <Text style={styles.ttitle}>Valor</Text>
                </View>
                <Text style={styles.finalValuePrice}>Resumo:</Text>
                {entrance.items.map((product, index) => {
                    return <View key={product.id} style={styles.finalValue}>
                        <Text style={styles.finalValuePrice}>{product.name}</Text>
                        <Text style={styles.finalValuePriceText}>R$ {treatPrice(entrance.products[index].price)}</Text>
                    </View>
                })}
                <View style={styles.finalValue}>
                    <Text style={styles.finalValueText}>Valor total:</Text>
                    <Text style={styles.finalValueMoney}>R$ {treatPrice(entrance.price)}</Text>
                </View>
            </View>
        </ScrollView>
        {!entrance.cancelled ? <View style={styles.footer}>
            <RectButton onPress={handleCancelEntrance}>
                <Text style={styles.footerText}>Cancelar Entrada</Text>
            </RectButton>
        </View> : null}
    </View>
}

export default Entrance;