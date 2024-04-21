import {View, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './RegisterScreenStyles';
import {fontSize, height, width} from 'react-native-responsive-sizes';
import {AText, ATouchable} from '../../../components';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {storage} from './RegisterScreen';
type GenderDateBodyProps = {
  handleSetDate: (date: Date) => void;
  handleSetGender: (gender: string) => void;
};

const GenderDateBody = ({
  handleSetDate,
  handleSetGender,
}: GenderDateBodyProps) => {
  const [date, setDate] = useState<Date>(
    new Date() || storage.getString('date'),
  );
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(storage.getString('gender') || '');
  const [animation] = useState(new Animated.Value(0));
  const _handleSetDate = (date: Date) => {
    setDate(date);
    handleSetDate(date);
    storage.set('date', date.toString());
  };
  const _handleSetGender = (gender: string) => {
    setGender(gender);
    handleSetGender(gender);
    storage.set('gender', gender);
  };
  useEffect(() => {
    if (open) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [animation, open]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-height(3), 20],
  });

  return (
    <>
      <View style={styles.body}>
        <Animated.View
          style={{
            borderBottomWidth: 1,
            borderColor: 'white',
            zIndex: 1,
            position: 'absolute',
            width: width(90),
            height: height(1),
            top: height(10),
            left: width(5),
          }}
        />
        <ATouchable
          style={styles.datePickerTouchable}
          onPress={() => {
            setShow(true);
          }}>
          <AText style={styles.datePicker}>
            {date.getDate() === new Date().getDate()
              ? 'Date of Birth'
              : date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear()}
          </AText>
        </ATouchable>
        {show && (
          <RNDateTimePicker
            value={date}
            mode={'date'}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShow(false);
              _handleSetDate(currentDate);
            }}
          />
        )}
        <Animated.View
          style={{
            borderBottomWidth: 1,
            borderColor: 'white',
            zIndex: 1,
            position: 'absolute',
            width: width(90),
            height: height(1),
            top: height(17),
            left: width(5),
          }}
        />
        <ATouchable
          onPress={() => {
            setOpen(true);
          }}
          style={styles.genderTouchable}>
          <AText style={styles.datePicker}>
            {gender === '' ? 'Gender' : gender}
          </AText>
        </ATouchable>
        <Animated.View
          style={{
            transform: [{translateY}],
          }}>
          {open && (
            <View
              style={{
                position: 'absolute',
                width: width(90),
                height: height(15),
                top: height(3),
                left: width(-45),
                borderRadius: 10,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                zIndex: 1,
              }}>
              <ATouchable
                onPress={() => {
                  setOpen(false);
                  _handleSetGender('Female');
                }}
                style={{
                  width: '95%',
                  borderBottomWidth: 1,
                  height: height(5),
                  justifyContent: 'center',
                  paddingLeft: 10,
                  marginBottom: 10,
                }}>
                <AText
                  style={{
                    color: 'grey',
                    fontSize: fontSize(11),
                  }}>
                  Female
                </AText>
              </ATouchable>
              <ATouchable
                onPress={() => {
                  setOpen(false);
                  _handleSetGender('Male');
                }}
                style={{
                  borderBottomWidth: 1,
                  width: '95%',
                  height: height(5),
                  justifyContent: 'center',
                  paddingLeft: 10,
                }}>
                <AText
                  style={{
                    color: 'grey',
                    fontSize: fontSize(11),
                  }}>
                  Male
                </AText>
              </ATouchable>
            </View>
          )}
        </Animated.View>
      </View>
    </>
  );
};

export default GenderDateBody;
