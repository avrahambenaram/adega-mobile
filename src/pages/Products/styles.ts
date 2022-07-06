import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    header: {
        width: '90%',
        height: '80%',
        backgroundColor: 'transparent',

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    headerSearchContainer: {
        height: '80%',
        borderRadius: 20,
        backgroundColor: '#FFF',
        marginRight: 10,

        justifyContent: 'center',
        alignItems: 'center'
    },

    headerInput: {
        width: '90%',
        height: '90%',

        fontFamily: 'Nunito400',
        fontSize: width * 0.04,
        color: '#000'
    },

    main: {
        width: '100%',
        height: '80%'
    },

    mainContent: {
        alignItems: 'center',
        paddingVertical: 10
    },

    footerText: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.045,
        color: '#FFF'
    }
})

export default styles;