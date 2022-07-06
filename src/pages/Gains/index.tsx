import React, { useState, useEffect,  useRef } from 'react';
import { View, Text, ScrollView, Animated, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';

import Header from '../../components/Header';
import GainItem from '../../components/GainItem';
import Footer from '../../components/Footer';

import api from '../../services/api';

import verifyDate from './verifyDate';

interface ApiData {
    data: Array<Gain>
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

function Gains() {

    const filterInputWidth = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();

    const gains: Array<Gain> = useSelector((store: any) => store.gain);
    const dispatch = useDispatch();

    const [filterMode, setFilterMode]  = useState<boolean>(false);
    const [gainFilter, setGainsFilter] = useState<Array<Gain>>([]);
    const [filterDateFrom, setFilterDateFrom] = useState<Date>(new Date(date));
    const [filterDateFromMode, setFilterDateFromMode] = useState<boolean>(false);
    const [filterDateTo, setFilterDateTo] = useState<Date>(new Date(date));
    const [filterDateToMode, setFilterDateToMode] = useState<boolean>(false);
    const [gainToday, setGainsToday] = useState<Array<Gain>>([]);
    const [gainYesterday, setGainsYesterday] = useState<Array<Gain>>([]);
    const [gainThisWeek, setGainsThisWeek] = useState<Array<Gain>>([]);
    const [gainThisMonth, setGainsThisMonth] = useState<Array<Gain>>([]);
    const [gainOld, setGainsOld] = useState<Array<Gain>>([]);

    function setGains() {
        const newGainsToday = gains.filter(gain => verifyDate.today(gain.gainDate));
        const newGainsYesterday = gains.filter(gain => verifyDate.yesterday(gain.gainDate));
        const newGainsThisWeek = gains.filter(gain => verifyDate.thisWeek(gain.gainDate));
        const newGainsThisMonth = gains.filter(gain => verifyDate.thisMonth(gain.gainDate));
        const newGainsOld = gains.filter(gain => verifyDate.old(gain.gainDate));

        setGainsToday(newGainsToday);
        setGainsYesterday(newGainsYesterday);
        setGainsThisWeek(newGainsThisWeek);
        setGainsThisMonth(newGainsThisMonth);
        setGainsOld(newGainsOld);
    }
    async function fetchGains() {
        try {
            const { data: gains } = await api.get('gain') as ApiData;

            dispatch({
                type: 'set-gains',
                value: gains
            })
        } catch(err) {
            alert('Erro ao carregar os ganhos');
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

    function handleUploadGain() {
        navigation.navigate('upload-gain');
    }

    useEffect(() => {
        fetchGains();
    }, [])
    useEffect(() => {
        setGains();
    }, [gains])

    useEffect(() => {
        async function run() {
            try {
                const from = filterDateFrom.getTime();
                const to = filterDateTo.getTime();
                const { data: gains } = await api.get(`gain?timeFrom=${from}&timeTo=${to}`) as ApiData;

                setGainsFilter(gains);
            } catch(err) {
                alert('Erro ao carregar as ganhos do filtro');
            }
        }
        run()
    }, [filterDateFrom, filterDateTo])

    return <View style={styles.container}>
        <Header>
            <View style={styles.headerContainer}>
                {!filterMode ? <Text style={styles.headerText}>Ganhos</Text> : null}
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
                {gainFilter.map(gain => <GainItem key={gain.id} gain={gain} />)}
                {!gainFilter[0] ? <View style={styles.sectionSubtitleContainer}>
                    <Text style={styles.sectionSubtitle}>Não foi possível encontrar seus ganhos</Text>
                </View> : null}
            </View> : null}
            {gainToday[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Hoje</Text>
                {gainToday.map(gain => <GainItem key={gain.id} gain={gain} />)}
            </View> : null}
            {gainYesterday[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ontem</Text>
                {gainYesterday.map(gain => <GainItem key={gain.id} gain={gain} />)}
            </View> : null}
            {gainThisWeek[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Essa semana</Text>
                {gainThisWeek.map(gain => <GainItem key={gain.id} gain={gain} />)}
            </View> : null}
            {gainThisMonth[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Esse mês</Text>
                {gainThisMonth.map(gain => <GainItem key={gain.id} gain={gain} />)}
            </View> : null}
            {gainOld[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Antigo</Text>
                {gainOld.map(gain => <GainItem key={gain.id} gain={gain} />)}
            </View> : null}
        </ScrollView>
        <Footer>
            <RectButton onPress={handleUploadGain}>
                <Text style={styles.headerText}>Cadastrar ganho</Text>
            </RectButton>
        </Footer>
    </View>
}

export default Gains;