import { StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    headerTitle: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.045,
        color: '#FFF',

        marginRight: 50
    },

    main: {
        width: '100%',
        height: '90%'
    },

    mainContent: {
        paddingVertical: 40,
        alignItems: 'center'
    },

    productIconTitle: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#000'
    },

    productIconContainer: {
        width: 150,
        height: 150,
        backgroundColor: '#FFF',

        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        justifyContent: 'space-around',
        alignItems: 'center'
    },

    productIcon: {
        width: 150,
        height: 150
    },

    productWithoutIcon: {
        width: 100,
        height: 100
    },

    section: {
        width: '80%',
        height: 'auto',

        marginVertical: 20
    },

    sectionTitle: {
        fontFamily: 'Nunito700',
        fontSize: width * 0.043,
        color: '#000',

        marginBottom: 15
    },

    sectionItem: {
        width: '100%',
        height: 30,

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    sectionItemInputInfoContainer: {
        height: 50,

        borderRadius: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: '#007bff'
    },

    sectionItemInputTitle: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#000'
    },

    sectionItemInputContainer: {
        width: '100%',

        flexDirection: 'row',
        alignItems: 'center'
    },

    sectionItemInputText: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#007bff'
    },

    sectionItemInput: {
        flexGrow: 1,

        marginLeft: 5,
        height: 30,
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#000'
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
        fontSize: width * 0.045,
        color: '#FFF'
    }
})

export default styles;