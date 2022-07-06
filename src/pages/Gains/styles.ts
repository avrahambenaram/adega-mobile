import { StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    headerContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.05,
        color: '#FFF'
    },

    headerFilterContainer: {
        height: '50%',
        borderRadius: 20,
        backgroundColor: '#FFF',
        marginRight: 10,
        overflow: 'hidden',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerFilterText: {
        fontFamily: 'Nunito400',
        fontSize: width * 0.035,
        color: '#000',
        marginHorizontal: 10
    },

    main: {
        width: '100%',
        height: '80%'
    },

    mainContent: {
        alignItems: 'center',
        padding: 10
    },

    section: {
        width: '90%',
        height: 'auto'
    },

    sectionTitle: {
        fontFamily: 'Nunito600',
        fontSize: 20,
        color: '#000'
    },

    sectionSubtitleContainer: {
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center'
    },

    sectionSubtitle: {
        fontFamily: 'Nunito600',
        fontSize: 12.5,
        color: '#000'
    }
})

export default styles;