import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, SCREEN_HEIGHT } from 'react-native-responsive-sizes';
export default StyleSheet.create({
    properties: {
        marginTop: size(20),
        width: SCREEN_WIDTH,
        paddingLeft: size(20),
        backgroundColor: '#131D28',
    },
    page: {
        paddingVertical: size(12),
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: size(10),
        borderBottomWidth: 1,
    },
    borderBottomActive: {
        borderBottomColor: '#555',
    },
    borderBottomPassive: {
        borderBottomColor: '#06101B',
    },
    label: {
        color: '#fff',
    },
    switch: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }
});
