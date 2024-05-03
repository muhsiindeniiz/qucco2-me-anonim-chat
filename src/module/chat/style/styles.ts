import {StyleSheet} from 'react-native';
import {fontSize, height} from 'react-native-responsive-sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: height(7),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
  headerTitle: {
    fontSize: fontSize(15),
    color: 'black',
    fontWeight: '500',
  },
  searchContainer: {
    width: '100%',
    height: height(7),
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    top: height(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    width: '100%',
    height: height(70),
    position: 'absolute',
    top: height(14),
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
