import { StyleSheet } from 'react-native';
import { size, fontSize } from 'react-native-responsive-sizes';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D3D4D',
        paddingVertical: size(20),
        marginTop: size(30),
        alignItems: 'center',
    },
    rocket: {
        color: 'orange',
        fontSize: size(30),
    },
    message: {
        color: '#fff',
        fontSize: fontSize(16),
        fontWeight: 'bold',
    },
    description: {
        color: '#fff',
        fontSize: fontSize(12),
        marginTop: size(12),
    },
    promoteButton: {
        paddingHorizontal: size(40),
        backgroundColor: 'white',
        paddingVertical: size(16),
        borderRadius: size(1000),
        marginTop: size(22),
    },
    text: {
        color: '#DC6D30',
        fontWeight: 'bold',
        fontSize: fontSize(12),
    },
});
