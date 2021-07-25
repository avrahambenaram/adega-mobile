import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard';

import styles from './styles';

import api from '../../services/api';

const initialState: SaleId = {
    cancelled: false,
    items: [],
    id: '',
    payment: [],
    price: 0,
    products: [],
    saleDate: '',
    saleDay: 0,
    saleHour: 0,
    saleMinute: 0,
    saleMonth: 0,
    saleSecond: 0,
    saleTime: 0,
    saleYear: 0
}

interface GetData {
    data: SaleId
}

function Sale() {

    const { params } = useRoute();
    const navigation = useNavigation();

    const [sale, setSale] = useState<SaleId>(initialState);
    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(true);

    function treatPrice(price: number) {
        return price.toFixed(2).toString().replace('.', ',');
    }

    function treatType(type: string) {
        switch (type) {
            case 'credit':
                return 'Crédito'
            case 'debt':
                return 'Débito'
            case 'money':
                return 'Dinheiro'
            default:
                return 'Dinheiro'
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

    async function fetchSale() {
        try {
            const { id } = params as any;
            const { data: newSale } = await api.get(`sale/${id}`) as GetData;
            newSale.products.map((product, index) => {
                newSale.items[index].quantity = product.quantity;
            })
            setSale(newSale);
            setDate(new Date(newSale.saleDate));
        } catch(err) {
            alert('Um erro ocorreu ao carregar sua venda');
        }
        setLoading(false);
    }

    async function cancelSale() {
        try {
            const { id } = params as any;
            await api.delete(`sale/${id}`);
            alert('Venda cancelada com sucesso');
            navigation.goBack();
        } catch(err) {
            alert('Um erro ocorreu ao cancelar a venda');
        }
    }

    function handleCancelSale() {
        Alert.alert(
            'Você está prestes a cancelar uma venda',
            `Produtos: ${sale.products.length}\nValor: R$ ${treatPrice(sale.price)}`,
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
        fetchSale();
    }, [])

    return <View style={styles.container}>
        <Header return>
            <Text style={styles.headerText}>Venda</Text>
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
                data={sale.items}
                renderItem={({ item }) => <ProductCard {...item} sale/>}
                keyExtractor={(_, index) => `${index}`}
            />
            <Text style={styles.h1}>Data e horário da venda</Text>
            <Text style={styles.subtitle}>{treatDate()}</Text>
            <Text style={styles.h1}>Pagamento</Text>
            <View style={styles.table}>
                <View style={styles.thead}>
                    <Text style={styles.ttitle}>Forma</Text>
                    <Text style={styles.ttitle}>Valor</Text>
                </View>
                {sale.payment.map((payment, index) => {
                    return <View key={index} style={styles.tr}>
                        <Text style={styles.ttext}>{treatType(payment.paymentType)}</Text>
                        <Text style={styles.ttext}>R$ {treatPrice(payment.pay)}</Text>
                    </View>
                })}
                <Text style={styles.finalValuePrice}>Resumo:</Text>
                {sale.items.map((product, index) => {
                    return <View key={product.id} style={styles.finalValue}>
                        <Text style={styles.finalValuePrice}>{product.name}</Text>
                        <Text style={styles.finalValuePriceText}>R$ {treatPrice(sale.products[index].price)}</Text>
                    </View>
                })}
                <View style={styles.finalValue}>
                    <Text style={styles.finalValueText}>Valor total:</Text>
                    <Text style={styles.finalValueMoney}>R$ {treatPrice(sale.price)}</Text>
                </View>
            </View>
        </ScrollView>
        {!sale.cancelled ? <View style={styles.footer}>
            <RectButton onPress={handleCancelSale}>
                <Text style={styles.footerText}>Cancelar Venda</Text>
            </RectButton>
        </View> : null}
    </View>
}

export default Sale;