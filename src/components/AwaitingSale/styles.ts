import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#000',

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'Nunito400',
        fontSize: 18,
        color: '#000'
    },

    textPrice: {
        fontFamily: 'Nunito400',
        fontSize: 18,
        color: '#28a745'
    }
})

export default styles;