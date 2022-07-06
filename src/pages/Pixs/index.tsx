import { View, ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';

import styles from './styles';
import Header from '../../components/Header';

function Pixs() {

    const pixs: Array<Pix> = useSelector((store: any) => store.pix);

    function treatDate(txt: string) {
        function treatNumber(n: number) {
            if (n < 10) {
                return `0${n}`;
            } else {
                return `${n}`;
            }
        }

        const [newYear, newMonth, hours] = txt.split('-');
        const [newDay, newHour, newMinute, newSecond] = hours.split(':');

        const d = new Date();
        d.setFullYear(parseInt(newYear));
        d.setMonth(parseInt(newMonth));
        d.setDate(parseInt(newDay));
        d.setHours(parseInt(newHour));
        d.setMinutes(parseInt(newMinute));
        d.setSeconds(parseInt(newSecond));
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();
        const h = d.getHours();
        const m = d.getMinutes();
        return `${treatNumber(day)}/${treatNumber(month)}/${year} ${treatNumber(h)}:${treatNumber(m)}`;
    }

    function treatValue(txt: string | number) {
        const value = parseFloat(txt as any);
        return value.toFixed(2).replace('.', ',')
    }

    return <View style={styles.container}>
        <Header/>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            {pixs.map((pix, index) => {
                return <View style={styles.pixContainer} key={index}>
                    <Text style={styles.pixText}>{treatDate(pix.horario)}</Text>
                    <Text style={styles.pixText}>R$ {treatValue(pix.valor)}</Text>
                </View>
            })}
        </ScrollView>
    </View>
}

export default Pixs;