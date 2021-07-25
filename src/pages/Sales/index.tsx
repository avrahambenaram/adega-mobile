import React, { useState, useEffect,  useRef } from 'react';
import { View, Text, ScrollView, Animated, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import Header from '../../components/Header';
import SaleItem from '../../components/SaleItem';
import Footer from '../../components/Footer';

import api from '../../services/api';

import verifyDate from './verifyDate';

interface ApiData {
    data: Array<Sale>
}

const date = new Date();

function treatTxtDt(number: number) {
    if (number > 9) {
        return `${number}`;
    } else {
        return `0${number}`;
    }
}

function treatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${treatTxtDt(day)}/${treatTxtDt(month)}/${year}`;
}

function Sales() {

    const filterInputWidth = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();

    const [filterMode, setFilterMode]  = useState<boolean>(false);
    const [salesFilter, setSalesFilter] = useState<Array<Sale>>([]);
    const [filterDateFrom, setFilterDateFrom] = useState<Date>(new Date(date));
    const [filterDateFromMode, setFilterDateFromMode] = useState<boolean>(false);
    const [filterDateTo, setFilterDateTo] = useState<Date>(new Date(date));
    const [filterDateToMode, setFilterDateToMode] = useState<boolean>(false);
    const [salesToday, setSalesToday] = useState<Array<Sale>>([]);
    const [salesYesterday, setSalesYesterday] = useState<Array<Sale>>([]);
    const [salesThisWeek, setSalesThisWeek] = useState<Array<Sale>>([]);
    const [salesThisMonth, setSalesThisMonth] = useState<Array<Sale>>([]);
    const [salesOld, setSalesOld] = useState<Array<Sale>>([]);

    async function fetchSales() {
        try {
            const { data: sales } = await api.get('sale') as ApiData;

            const newSalesToday = sales.filter(sale => verifyDate.today(sale.saleDate));
            const newSalesYesterday = sales.filter(sale => verifyDate.yesterday(sale.saleDate));
            const newSalesThisWeek = sales.filter(sale => verifyDate.thisWeek(sale.saleDate));
            const newSalesThisMonth = sales.filter(sale => verifyDate.thisMonth(sale.saleDate));
            const newSalesOld = sales.filter(sale => verifyDate.old(sale.saleDate));

            setSalesToday(newSalesToday);
            setSalesYesterday(newSalesYesterday);
            setSalesThisWeek(newSalesThisWeek);
            setSalesThisMonth(newSalesThisMonth);
            setSalesOld(newSalesOld);
        } catch(err) {
            alert('Erro ao carregar as vendas');
        }
    }

    function handleToggleFilter() {
        if (!filterMode) {
            Animated.timing(filterInputWidth, {
                toValue: Dimensions.get('window').width * 0.7,
                duration: 400,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(filterInputWidth, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start()
            setFilterDateFrom(new Date(date));
            setFilterDateTo(new Date(date));
            setFilterDateFromMode(false);
            setFilterDateToMode(false);
        }
        setFilterMode(!filterMode);
    }

    function handleFilterDateFrom(evt: any) {
        if (evt.type !== 'dismissed') {
            setFilterDateFromMode(false);
            setFilterDateFrom(new Date(evt.nativeEvent.timestamp));
        } else {
            setFilterDateFromMode(false);
        }
    }

    function handleFilterDateTo(evt: any) {
        if (evt.type !== 'dismissed') {
            setFilterDateToMode(false);
            setFilterDateTo(new Date(evt.nativeEvent.timestamp));
        } else {
            setFilterDateToMode(false);
        }
    }

    function handleOpenFilterFrom() {
        setFilterDateFromMode(true);
    }

    function handleOpenFilterTo() {
        setFilterDateToMode(true);
    }

    function handleUploadSale() {
        navigation.navigate('upload-sale');
    }

    useEffect(() => {
        fetchSales();
        navigation.addListener('focus', () => {
            fetchSales();
        })
    }, [])

    useEffect(() => {
        async function run() {
            try {
                const from = filterDateFrom.getTime();
                const to = filterDateTo.getTime();
                const { data: sales } = await api.get(`sale?timeFrom=${from}&timeTo=${to}`) as ApiData;

                setSalesFilter(sales);
            } catch(err) {
                alert('Erro ao carregar as vendas do filtro');
            }
        }
        run()
    }, [filterDateFrom, filterDateTo])

    return <View style={styles.container}>
        <Header>
            <View style={styles.headerContainer}>
                {!filterMode ? <Text style={styles.headerText}>Vendas</Text> : null}
                <Animated.View
                    style={[
                        styles.headerFilterContainer,
                        {
                            width: filterInputWidth
                        }
                    ]}
                >
                    <RectButton onPress={handleOpenFilterFrom}>
                        <Text style={styles.headerFilterText}>De: {treatDate(filterDateFrom)}</Text>
                    </RectButton>
                    <RectButton onPress={handleOpenFilterTo}>
                        <Text style={styles.headerFilterText}>Até: {treatDate(filterDateTo)}</Text>
                    </RectButton>
                    {filterDateFromMode ? <DateTimePicker
                        mode="date"
                        maximumDate={filterDateTo}
                        value={filterDateFrom}
                        onChange={handleFilterDateFrom}
                    /> : null}
                    {filterDateToMode ? <DateTimePicker
                        mode="date"
                        minimumDate={filterDateFrom}
                        maximumDate={date}
                        value={filterDateTo}
                        onChange={handleFilterDateTo}
                    /> : null}
                </Animated.View>
                <RectButton onPress={handleToggleFilter}>
                    <Feather
                        name={filterMode ? 'x' : 'filter'}
                        size={20}
                        color="#FFF"
                    />
                </RectButton>
            </View>
        </Header>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            {filterMode ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Filtro</Text>
                {salesFilter.map(sale => <SaleItem key={sale.id} sale={sale} />)}
                {!salesFilter[0] ? <View style={styles.sectionSubtitleContainer}>
                    <Text style={styles.sectionSubtitle}>Não foi possível encontrar suas vendas</Text>
                </View> : null}
            </View> : null}
            {salesToday[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Hoje</Text>
                {salesToday.map(sale => <SaleItem key={sale.id} sale={sale} />)}
            </View> : null}
            {salesYesterday[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ontem</Text>
                {salesYesterday.map(sale => <SaleItem key={sale.id} sale={sale} />)}
            </View> : null}
            {salesThisWeek[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Essa semana</Text>
                {salesThisWeek.map(sale => <SaleItem key={sale.id} sale={sale} />)}
            </View> : null}
            {salesThisMonth[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Esse mês</Text>
                {salesThisMonth.map(sale => <SaleItem key={sale.id} sale={sale} />)}
            </View> : null}
            {salesOld[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Antigo</Text>
                {salesOld.map(sale => <SaleItem key={sale.id} sale={sale} />)}
            </View> : null}
        </ScrollView>
        <Footer>
            <RectButton onPress={handleUploadSale}>
                <Text style={styles.headerText}>Cadastrar venda</Text>
            </RectButton>
        </Footer>
    </View>
}

export default Sales;