import { StyleSheet } from 'react-native';
import { size, fontSize, SCREEN_WIDTH, width } from 'react-native-responsive-sizes';

const styles = StyleSheet.create({
    inputContainer: {
        width: SCREEN_WIDTH,
        paddingHorizontal: size(14),
        paddingVertical: size(10),
    },
    tagLists: {
        borderWidth: 1,
        borderColor: '#333',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        position: 'relative'
    },
    textInput: {
        height: size(40),
        paddingHorizontal: size(10),
        fontSize: fontSize(12),
        color: '#fff',
    },
    suggestionsList: {
        maxHeight: size(100),
        marginTop: size(5),
        zIndex: 99999
    },
    suggestionTag: {
        padding: size(5),
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: size(5),
        borderBottomColor: '#666',
        borderBottomWidth: 1
    },
    suggestionTagLabel: {
        color: '#fff',
        fontSize: fontSize(14),
    },
    selectedTagsContainer: {
        paddingHorizontal: size(14),
        paddingVertical: size(10),
        position: 'relative',
        zIndex: -1
    },
    selectedTag: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: size(10),
        backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: size(5),
        display: 'flex',
        justifyContent: 'space-between'
    },
    selectedTagLabel: {
        color: '#fff',
        fontSize: fontSize(14),
        marginRight: size(10),
    },
    closeIcon: {
        color: '#fff',
        fontSize: fontSize(16),
    },
    tagsTitle: {
        color: '#fff',
        fontSize: fontSize(10),
        fontWeight: 'bold',
        marginBottom: 14
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'darkgreen',
        paddingHorizontal: size(14),
        paddingVertical: size(4),
        borderRadius: 10000
    },
    addText: {
        color: '#fff',
        fontSize: fontSize(12),
        fontWeight: 'bold'
    }
});

export default styles;
