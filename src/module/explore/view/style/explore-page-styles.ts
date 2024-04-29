import {StyleSheet} from 'react-native';
import {size, width} from 'react-native-responsive-sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06101b',
    width: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    objectFit: 'contain',
  },
  searchContainer: {
    position: 'absolute',
    width: width(100),
    height: width(11),
    top: size(10),
    borderBottomWidth: size(0.3),
    borderBottomColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: width(98),
    height: width(8),
    fontSize: size(12),
    paddingLeft: size(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#535355',
    color: 'white',
    borderRadius: size(20),
  },
  searcIcon: {
    position: 'absolute',
    left: size(10),
    zIndex: 1,
  },
});
