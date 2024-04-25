import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, SCREEN_HEIGHT } from 'react-native-responsive-sizes';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06101B',
    },
    profile: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2.3,
        objectFit: 'cover',
        display: 'flex',
        justifyContent: 'space-between',
    },
    closeAction: {
        paddingTop: size(10),
        marginBottom: size(10),
        paddingHorizontal: size(14),
        display: 'flex',
        alignSelf: 'flex-start',
    },
    close: {
        color: '#fff',
    },
    username: {
        fontSize: fontSize(18),
        color: '#fff',
        marginLeft: size(14),
    },
    active: {
        fontSize: fontSize(8),
        color: '#fff',
        marginBottom: size(24),
        marginLeft: size(14),
    },
    bioContainer: {
        marginVertical: size(30),
    },
    biography: {
        color: '#fff',
        paddingHorizontal: size(12),
        fontSize: fontSize(14),
    },
    createdAt: {
        textAlign: 'right',
        color: '#fff',
        fontSize: fontSize(10),
        paddingHorizontal: size(14),
    }
});
