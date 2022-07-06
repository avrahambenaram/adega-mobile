import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity as TO, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native-paper';

import styles from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

interface ProductsQuantity {
    [index: string]: number
}

function UploadEntrance() {

    const [total, setTotal] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weekday, setWeekday] = useState(0);
    const [weekend, setWeekend] = useState(false);
    const [holiday, setHoliday] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    function reset() {
        setTotal('');
        setTemperature('');
        setWeekday(0);
        setWeekend(false);
        setHoliday(false);
        setLoading(false);
    }

    function handleToggleWeekday(newWeekday: string) {
        setWeekday(parseInt(newWeekday));
    }
    function handleToggleWeekend() {
        setWeekend(!weekend);
    }
    function handleToggleHoliday() {
        setHoliday(!holiday);
    }

    async function handleUploadGain() {
        try {
            if (!total) {
                Alert.alert('Você deve preencher o total em R$');
                return;
            }
            if (!temperature) {
                Alert.alert('Você deve colocar a temperatura antes');
                return;
            }
            setLoading(true);
            const jsonGain = {
                total: parseFloat(total),
                holiday,
                weekday,
                weekend,
                temperature: parseFloat(temperature)
            }

            await api.post('/gain', jsonGain);
            Alert.alert('Ganho do dia cadastrado com sucesso');
            setLoading(false);
        } catch(err) {
            Alert.alert('Um erro ocorreu', 'Um erro ocorreu ao cadastrar o ganho do dia')
        }
        setLoading(false);
    }

    return <View style={styles.container}>
        <Header return>
            <Text style={styles.headerText}>Cadastrar ganho</Text>
        </Header>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preencha os dados</Text>
                <View style={styles.sectionHr}/>
                <View style={styles.sectionRowDiv}>
                    <Text style={styles.sectionText}>Ganho em R$</Text>
                    <Text style={styles.sectionText}>Temperatura em °C</Text>
                </View>
                <View style={styles.sectionRowDiv}>
                    <TextInput
                        style={styles.sectionInput}
                        placeholder="Ganho"
                        keyboardType="number-pad"
                        value={total}
                        onChangeText={txt => setTotal(txt)}
                    />
                    <TextInput
                        style={styles.sectionInput}
                        placeholder="Temperatura"
                        keyboardType="number-pad"
                        value={temperature}
                        onChangeText={txt => setTemperature(txt)}
                    />
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Diga sobre hoje</Text>
                <View style={styles.sectionHr}/>
                <Text style={styles.sectionText}>Selecione o dia da semana</Text>
                <Picker
                    selectedValue={weekday.toString()}
                    onValueChange={handleToggleWeekday}
                >
                    <Picker.Item label="Domingo" value="0"/>
                    <Picker.Item label="Segunda-feira" value="1"/>
                    <Picker.Item label="Terça-feira" value="2"/>
                    <Picker.Item label="Quarta-feira" value="3"/>
                    <Picker.Item label="Quinta-feira" value="4"/>
                    <Picker.Item label="Sexta-feira" value="5"/>
                    <Picker.Item label="Sábado" value="6"/>
                </Picker>
                <View style={styles.sectionRowDiv}>
                    <View style={styles.sectionLabel}>
                        <Switch
                            value={weekend}
                            onValueChange={handleToggleWeekend}
                            color="#17a2b8"
                        />
                        <Text style={styles.sectionText}>Fim de semana</Text>
                    </View>
                    <View style={styles.sectionLabel}>
                        <Switch
                            value={holiday}
                            onValueChange={handleToggleHoliday}
                            color="#17a2b8"
                        />
                        <Text style={styles.sectionText}>Feriado</Text>
                    </View>
                </View>
            </View>
            {loading ? <ActivityIndicator
                color="#17a2b8"
                size="large"
            /> : null}
            <TO onPress={handleUploadGain} disabled={loading}>
                <View style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Cadastrar</Text>
                </View>
            </TO>
        </ScrollView>
    </View>
}

export default UploadEntrance