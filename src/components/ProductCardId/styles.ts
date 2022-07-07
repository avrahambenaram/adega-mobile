import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: width * 0.4,
        height: 210,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        justifyContent: 'space-between',
        alignItems: 'center'
    },

    icon: {
        width: '100%',
        height: 120,
        marginTop: 20,

        resizeMode: 'contain'
    },

    infoContainer: {
        width: '100%'
    },

    infoNameContainer: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    infoName: {
        width: '80%',
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#000'
    },

    infoQuantity: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#d39e00'
    },

    infoPricesContainer: {
        width: '100%',
        height: 20,

        flexDirection: 'row'
    },

    infoPriceContainer: {
        flexGrow: 1,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    infoPrice: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#FFF'
    }
})

export default styles;