import React, { useState, useEffect,  useRef } from 'react';
import { View, Text, ScrollView, Animated, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import Header from '../../components/Header';
import EntranceItem from '../../components/EntranceItem';
import Footer from '../../components/Footer';

import api from '../../services/api';

import verifyDate from './verifyDate';

interface ApiData {
    data: Array<Entrance>
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

function Entrances() {

    const filterInputWidth = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();

    const [filterMode, setFilterMode]  = useState<boolean>(false);
    const [entranceFilter, setEntrancesFilter] = useState<Array<Entrance>>([]);
    const [filterDateFrom, setFilterDateFrom] = useState<Date>(new Date(date));
    const [filterDateFromMode, setFilterDateFromMode] = useState<boolean>(false);
    const [filterDateTo, setFilterDateTo] = useState<Date>(new Date(date));
    const [filterDateToMode, setFilterDateToMode] = useState<boolean>(false);
    const [entranceToday, setEntrancesToday] = useState<Array<Entrance>>([]);
    const [entranceYesterday, setEntrancesYesterday] = useState<Array<Entrance>>([]);
    const [entranceThisWeek, setEntrancesThisWeek] = useState<Array<Entrance>>([]);
    const [entranceThisMonth, setEntrancesThisMonth] = useState<Array<Entrance>>([]);
    const [entranceOld, setEntrancesOld] = useState<Array<Entrance>>([]);

    async function fetchEntrances() {
        try {
            const { data: entrances } = await api.get('entrance') as ApiData;

            const newEntrancesToday = entrances.filter(entrance => verifyDate.today(entrance.entranceDate));
            const newEntrancesYesterday = entrances.filter(entrance => verifyDate.yesterday(entrance.entranceDate));
            const newEntrancesThisWeek = entrances.filter(entrance => verifyDate.thisWeek(entrance.entranceDate));
            const newEntrancesThisMonth = entrances.filter(entrance => verifyDate.thisMonth(entrance.entranceDate));
            const newEntrancesOld = entrances.filter(entrance => verifyDate.old(entrance.entranceDate));

            setEntrancesToday(newEntrancesToday);
            setEntrancesYesterday(newEntrancesYesterday);
            setEntrancesThisWeek(newEntrancesThisWeek);
            setEntrancesThisMonth(newEntrancesThisMonth);
            setEntrancesOld(newEntrancesOld);
        } catch(err) {
            alert('Erro ao carregar as entradas');
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

    function handleUploadEntrance() {
        navigation.navigate('upload-entrance');
    }

    useEffect(() => {
        fetchEntrances();
        navigation.addListener('focus', () => {
            fetchEntrances();
        })
    }, [])

    useEffect(() => {
        async function run() {
            try {
                const from = filterDateFrom.getTime();
                const to = filterDateTo.getTime();
                const { data: entrances } = await api.get(`entrance?timeFrom=${from}&timeTo=${to}`) as ApiData;

                setEntrancesFilter(entrances);
            } catch(err) {
                alert('Erro ao carregar as entradas do filtro');
            }
        }
        run()
    }, [filterDateFrom, filterDateTo])

    return <View style={styles.container}>
        <Header>
            <View style={styles.headerContainer}>
                {!filterMode ? <Text style={styles.headerText}>Entradas</Text> : null}
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
                {entranceFilter.map(entrance => <EntranceItem key={entrance.id} entrance={entrance} />)}
                {!entranceFilter[0] ? <View style={styles.sectionSubtitleContainer}>
                    <Text style={styles.sectionSubtitle}>Não foi possível encontrar suas entradas</Text>
                </View> : null}
            </View> : null}
            {entranceToday[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Hoje</Text>
                {entranceToday.map(entrance => <EntranceItem key={entrance.id} entrance={entrance} />)}
            </View> : null}
            {entranceYesterday[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ontem</Text>
                {entranceYesterday.map(entrance => <EntranceItem key={entrance.id} entrance={entrance} />)}
            </View> : null}
            {entranceThisWeek[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Essa semana</Text>
                {entranceThisWeek.map(entrance => <EntranceItem key={entrance.id} entrance={entrance} />)}
            </View> : null}
            {entranceThisMonth[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Esse mês</Text>
                {entranceThisMonth.map(entrance => <EntranceItem key={entrance.id} entrance={entrance} />)}
            </View> : null}
            {entranceOld[0] ? <View style={styles.section}>
                <Text style={styles.sectionTitle}>Antigo</Text>
                {entranceOld.map(entrance => <EntranceItem key={entrance.id} entrance={entrance} />)}
            </View> : null}
        </ScrollView>
        <Footer>
            <RectButton onPress={handleUploadEntrance}>
                <Text style={styles.headerText}>Cadastrar entrada</Text>
            </RectButton>
        </Footer>
    </View>
}

export default Entrances;