import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, width } from 'react-native-responsive-sizes';
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
    accountLabel: {
        color: '#FF461C',
    },
    switch: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    },
    logo: {
        width: size(100),
        height: size(100),
        objectFit: 'contain',
        marginTop: size(20),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    version: {
        fontSize: fontSize(10),
        color: '#fff',
        textAlign: 'center',
        marginTop: size(10)
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#052747',
        alignItems: 'center',
        paddingTop: size(20),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    modalTitle: {
        marginBottom: size(5),
        textAlign: 'center',
        fontSize: fontSize(14),
        color: '#fff',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#fff',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - width(34),
        backgroundColor: '#23374A',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    cancelButton: {
        padding: 10,
        borderBottomLeftRadius: size(12),
        flexGrow: 1,
        borderBottomStartRadius: 10,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: fontSize(12)
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#E94218',
        borderBottomEndRadius: size(12),
        flexGrow: 1,
    },
    logoutButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: fontSize(12)
    },
});
