import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, SCREEN_HEIGHT } from 'react-native-responsive-sizes';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06101B',
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
    dynamicForm: {
        marginTop: size(20),
        width: SCREEN_WIDTH
    }
});
