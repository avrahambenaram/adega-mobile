import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 34,
        backgroundColor: '#FFF',
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textProduct: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#000'
    },

    textDate: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#ffc107'
    },

    textPrice: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#28a745'
    }
})

export default styles;