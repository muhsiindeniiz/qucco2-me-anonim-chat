import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH } from 'react-native-responsive-sizes';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06101B',
        paddingVertical: size(20),
    },
    header: {
        paddingVertical: size(10),
        paddingHorizontal: size(14),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    setting: {
        color: '#fff',
    },
    title: {
        color: '#fff',
        fontSize: fontSize(16)
    },
    properties: {
        marginTop: size(20),
        width: SCREEN_WIDTH,
        paddingLeft: size(20),
        backgroundColor: '#131D28',
    },
    section: {
        marginBottom: size(20)
    },
    page: {
        paddingVertical: size(12),
        borderBottomColor: '#555',
        borderBottomWidth: 1,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: size(10)
    },
    label: {
        color: '#fff',
    },
    borderBottom: {
        paddingVertical: size(12),
        borderBottomColor: '#555',
        borderBottomWidth: 0
    }
});
