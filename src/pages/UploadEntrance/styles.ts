import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    headerText: {
        fontFamily: 'Nunito400',
        fontSize: 20,
        color: '#FFF',
        marginRight: 20
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
        fontSize: 20,
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    sectionProductImage: {
        width: 24,
        height: 24
    },

    sectionProductName: {
        fontFamily: 'Nunito400',
        fontSize: 14,
        color: '#000',

        marginLeft: 5
    },

    sectionProductQuantity: {
        fontFamily: 'Nunito400',
        fontSize: 16,
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
        color: '#dc3545'
    },

    sectionFooterPriceText: {
        fontFamily: 'Nunito400',
        fontSize: 14,
        color: '#dc3545'
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
        fontSize: 22,
        color: '#FFF'
    }
})

export default styles;