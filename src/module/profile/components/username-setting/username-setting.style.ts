import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, width } from 'react-native-responsive-sizes';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06101B',
    },
    properties: {
        marginTop: size(20),
        width: SCREEN_WIDTH,
        paddingLeft: size(20),
        backgroundColor: '#131D28',
    },
    page: {
        paddingVertical: size(12),
        paddingRight: size(10),
        borderBottomWidth: 1,
    },
    borderBottomActive: {
        borderBottomColor: '#555',
    },
    borderBottomPassive: {
        borderBottomColor: '#081727',
    },
    input: {
        color: '#fff',
    },
    button: {
        maxWidth: SCREEN_WIDTH,
        paddingVertical: size(12),
        paddingHorizontal: size(10),
        backgroundColor: '#081727',
        marginHorizontal: size(20),
        marginTop: size(20),
        borderRadius: size(1000)
    },
    saveText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: fontSize(12)
    }
});
