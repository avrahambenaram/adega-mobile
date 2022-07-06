import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    headerText: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.05,
        color: '#FFF'
    },

    main: {
        width: '100%',
        height: '80%'
    },

    h1: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.05,
        color: '#000',
        marginLeft: 20,
        marginTop: 10
    },

    subtitle: {
        fontFamily: 'Nunito400',
        fontSize: 16,
        color: '#000',
        marginLeft: 20,
        marginTop: 2
    },

    productsContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: 250,
        marginLeft: Dimensions.get('window').width * 0.05
    },

    productsContainerContent: {
        alignItems: 'center'
    },

    table: {
        width: '90%',
        marginLeft: Dimensions.get('window').width * 0.05
    },

    tr: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    ttitle: {
        fontFamily: 'Nunito400',
        fontSize: 20,
        color: '#000'
    },

    ttext: {
        fontFamily: 'Nunito400',
        fontSize: 16,
        color: '#000'
    },

    finalValue: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    finalValueText: {
        fontFamily: 'Nunito400',
        fontSize: 16,
        color: '#000'
    },

    finalValuePrice: {
        fontFamily: 'Nunito400',
        fontSize: 14,
        color: '#000'
    },

    finalValueMoney: {
        fontFamily: 'Nunito400',
        fontSize: 16,
        color: '#28a745'
    },

    finalValuePriceText: {
        fontFamily: 'Nunito400',
        fontSize: 14,
        color: '#28a745'
    },

    footer: {
        width: '100%',
        height: '10%',
        backgroundColor: '#bd2130',

        justifyContent: 'center',
        alignItems: 'center'
    },

    footerText: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.045,
        color: '#FFF'
    }
})

export default styles;