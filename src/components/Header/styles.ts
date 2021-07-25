import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '10%',
        backgroundColor: '#007bff',
        paddingHorizontal: 12,
        paddingTop: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    area: {
        width: Dimensions.get('window').width - 52,
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;