import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, width } from 'react-native-responsive-sizes';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06101B',
    },
    header: {
        paddingTop: size(14),
        paddingHorizontal: size(14),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: size(4)
    },
    title: {
        color: '#fff',
        fontSize: fontSize(14),
        fontWeight: '700',
        position: 'absolute',
        left: '50%',
        top: size(14)
    },
    close: {
        color: '#fff',
        fontSize: fontSize(14),
        fontWeight: '500',
    },
    active: {
        color: '#fff',
    },
    disabled: {
        color: '#aaa'
    },
    addTagContainer: {
        width: SCREEN_WIDTH,
        borderWidth: 1,
        borderColor: '#333',
        paddingVertical: 10
    }
});
