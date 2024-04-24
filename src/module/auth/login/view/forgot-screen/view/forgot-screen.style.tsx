import {StyleSheet} from 'react-native';
import {width, height, size, fontSize} from 'react-native-responsive-sizes';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B61B9',
  },
  header: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    width: '100%',
    height: height(5),
    top: height(6),
  },

  headerText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: fontSize(23),
    fontWeight: 'bold',
  },
  next: {
    position: 'absolute',
    right: width(5),
    width: width(19),
    maxHeight: 100,
    maxWidth: 100,
    height: width(19),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: size(1000),
    backgroundColor: '#343875',
    opacity: 0.8,
  },
  nextText: {
    color: 'white',
    fontSize: fontSize(17),
  },
  body: {
    position: 'absolute',
    width: '100%',
    height: height(20),
    top: height(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: width(90),
    height: height(6),
    color: 'white',

    borderColor: 'white',
    borderRadius: size(10),
    fontSize: fontSize(14),
    marginBottom: height(5),
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    height: height(8),
    top: height(70),

    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotButton: {
    position: 'absolute',
    left: width(5),
  },
  forgotText: {
    color: 'white',
    fontSize: fontSize(12),
  },
  borderMail: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',

    zIndex: 1,
  },
});
