import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    main: {
        width: screen.width,
        height: screen.height * 0.9
    },

    mainContent: {
        paddingVertical: 10
    },

    pixContainer: {
        width: '100%',
        height: 50,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    pixText: {
        fontSize: 17,
        fontFamily: 'Nunito400',
        color: '#000'
    }
})

export default styles;