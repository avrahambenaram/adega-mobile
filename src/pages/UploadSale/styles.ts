import { StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    main: {
        width: '100%',
        height: '10%'
    },

    mainContent: {
        padding: 10,

        alignItems: 'center'
    },

    section: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    sectionTitleContainer: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    sectionTitle: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.04,
        color: '#000'
    },

    sectionHr: {
        width: '100%',
        height: 1,
        backgroundColor: '#000',

        marginBottom: 10
    },

    sectionInput: {
        fontFamily: 'Nunito400',
        fontSize: 14,
        color: '#000',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 6,

        width: '100%',
        height: 30
    },

    sectionProduct: {
        width: '100%',
        padding: 8,
        marginVertical: 2,
        borderWidth: 1,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    sectionProductInfoContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    sectionProductInfoContainer2: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    sectionProductImage: {
        width: 24,
        height: 24
    },
    
    sectionText: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#000'
    },

    sectionProductName: {
        width: '75%',
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#000',

        marginLeft: 5
    },

    sectionProductQuantity: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#ffc107'
    },

    sectionProductOutOfStock: {
        fontFamily: 'Nunito400',
        fontSize: 16,
        color: '#dc3545'
    },

    sectionFooter: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    sectionFooterText: {
        fontFamily: 'Nunito400',
        fontSize: 16,
        color: '#000'
    },

    sectionFooterPrice: {
        fontFamily: 'Nunito400',
        fontSize: 14,
        color: '#000'
    },

    sectionFooterMoney: {
        fontFamily: 'Nunito400',
        fontSize: 16,
        color: '#28a745'
    },

    sectionFooterPriceText: {
        fontFamily: 'Nunito400',
        fontSize: 14,
        color: '#28a745'
    },

    uploadButton: {
        width: 220,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6c757d',
        marginVertical: 40,

        justifyContent: 'center',
        alignItems: 'center'
    },

    uploadButtonText: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.05,
        color: '#FFF'
    },

    pixQrCode: {
        width: width * 0.6,
        height: width * 0.6
    },

    pixKeyContainer: {
        marginTop: 10,
        flexDirection: 'row'
    },

    pixTitle: {
        fontSize: 16,
        fontFamily: 'Nunito700',
        color: '#000',
        marginRight: 5
    },

    pixText: {
        fontSize: 16,
        fontFamily: 'Nunito400',
        color: '#000',
        marginLeft: 5
    }
})

export default styles;