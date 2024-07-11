import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, SCREEN_HEIGHT } from 'react-native-responsive-sizes';
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
    bioInput: {
        width: SCREEN_WIDTH,
        paddingHorizontal: size(18),
        marginTop: size(10),
        color: '#fff',
        height: SCREEN_HEIGHT / 4,
        fontSize: fontSize(14)
    },
    bioLimit: {
        textAlign: 'right',
        color: '#aaa',
        fontSize: fontSize(10),
        paddingHorizontal: size(14),
    }
});
