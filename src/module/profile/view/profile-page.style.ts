import { StyleSheet } from 'react-native';
import { width, size, fontSize, SCREEN_WIDTH, SCREEN_HEIGHT } from 'react-native-responsive-sizes';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06101B',
    },
    header: {
        paddingTop: size(10),
        marginBottom: size(10),
        paddingHorizontal: size(14),
    },
    setting: {
        color: '#fff',
    },
    profilePicture: {
        alignItems: 'center',
        marginTop: size(15),
    },
    picture: {
        width: size(150),
        height: size(150),
        borderRadius: size(1000),
        objectFit: 'cover',
        borderColor: '#fff',
        borderWidth: 5,
    },
    username: {
        fontSize: fontSize(18),
        color: '#fff',
        textAlign: 'center',
        marginTop: size(10),
    },
    seeProfile: {
        fontSize: fontSize(10),
        color: '#ddd',
        marginTop: size(10),
    },
    actionContainer: {
        alignItems: 'center',
    },
    infoActions: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: size(24),
        width: SCREEN_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        gap: size(30),
    },
    actionIcon: {
        color: '#fff',
    },
    likes: {
        backgroundColor: '#EC28C8',
    },
    conversations: {
        backgroundColor: '#1DC170',
    },
    followers: {
        backgroundColor: '#934FA9',
    },
    icon: {
        width: size(46),
        height: size(46),
        borderRadius: size(1000),
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionValue: {
        textAlign: 'center',
        color: '#fff',
        marginVertical: size(6),
        fontSize: fontSize(14),
        fontWeight: 'normal',
    },
    actionTitle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: fontSize(9),
    },
    profileActions: {
        marginTop: size(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareProfile: {
        paddingHorizontal: width(24),
        justifyContent: 'center',
        paddingVertical: size(16),
        borderRadius: size(1000),
        width: SCREEN_WIDTH - width(20),
        backgroundColor: '#23374A',
        borderWidth: 2,
        borderColor: '#23374A',
        display: 'flex',
        flexDirection: 'row',
        gap: size(10),
    },
    editProfile: {
        paddingHorizontal: width(24),
        justifyContent: 'center',
        paddingVertical: size(16),
        borderRadius: size(1000),
        width: SCREEN_WIDTH - width(20),
        display: 'flex',
        flexDirection: 'row',
        gap: size(10),
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: size(10)
    },
    actionText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: size(14),
    },
    centeredView: {

    },
});
