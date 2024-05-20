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
        justifyContent: 'flex-end',
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
    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: size(16)
    },
    addPhoto: {
        width: SCREEN_WIDTH / 3,
        backgroundColor: 'lightgray',
    },
    photo: {
        height: size(120),
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        paddingHorizontal: size(18),
        paddingBottom: size(6),
        marginBottom: size(3),
    },
    headerTitle: {
        color: '#ccc',
        fontSize: fontSize(10),
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    badgesContainer: {
        width: SCREEN_WIDTH,
        paddingStart: size(14),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingVertical: size(12),
        gap: 8
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
    super_message: {
        backgroundColor: '#1DC170',
    },
    followers: {
        backgroundColor: '#934FA9',
    },
    icon: {
        width: size(44),
        height: size(44),
        borderRadius: size(1000),
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionValue: {
        textAlign: 'center',
        color: '#fff',
        marginTop: size(6),
        marginBottom: size(2),
        fontSize: fontSize(12),
    },
    actionTitle: {
        color: '#fff',
        fontSize: fontSize(9),
    },
    actionContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH / 4
    },
    bedgeDescription: {
        fontSize: fontSize(10),
        color: '#fff',
        marginTop: size(6),
        marginBottom: size(12),
    },
    bioContainer: {
        borderTopWidth: 1,
        borderTopColor: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingHorizontal: size(18),
        paddingTop: size(12),
        paddingBottom: size(30),
        position: 'relative',
        marginBottom: size(12)
    },
    bioContent: {
        fontSize: fontSize(10),
        color: '#fff',
        lineHeight: size(20),
    },
    bioLimit: {
        position: 'absolute',
        bottom: size(8),
        right: size(18),
        fontSize: fontSize(8),
        color: '#fff',
        fontWeight: '500'
    },
    tagsContainer: {
        borderColor: '#333',
        borderWidth: 1,
        width: SCREEN_WIDTH,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: size(18),
        paddingVertical: size(12),
        marginBottom: size(12),
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap'
    },
    tagText: {
        fontSize: fontSize(10),
        color: '#aaa'
    },
    birthDate: {
        borderTopWidth: 1,
        borderTopColor: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingVertical: size(12),
    },
    dateContent: {
        paddingHorizontal: size(18),
        color: '#aaa',
    },
    tagBadge: {
        paddingHorizontal: 6,
        paddingVertical: 6,
        backgroundColor: '#06101B',
        borderColor: '#FF7924',
        borderWidth: 1,
        borderRadius: 6,
        color: '#FF7924'
    },
    badgeActive: {
        opacity: 1
    },
    badgePassive: {
        opacity: 0.5
    }
});
