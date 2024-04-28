import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, SCREEN_HEIGHT } from 'react-native-responsive-sizes';
export default StyleSheet.create({
    container: {
        backgroundColor: '#06101B',
        width: SCREEN_WIDTH,
        paddingHorizontal: size(20)
    },
    rowFront: {
        backgroundColor: '#06101B',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
    backRightBtn: {
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        display: 'flex',
        width: 75,
        height: 38
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        color: '#fff',
        fontSize: fontSize(20)
    },
    backTextWhite: {
        color: '#fff',
        fontSize: fontSize(12),
        fontWeight: 'bold'
    },
    username: {
        color: '#fff',
        fontWeight: 'bold'
    }
});
