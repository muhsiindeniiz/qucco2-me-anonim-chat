import {View, Animated, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../style/RegisterScreenStyles';
import {fontSize, height, width} from 'react-native-responsive-sizes';
import {storage} from '../../../../../constants/app';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import strings from '../../../../../locale/locale';
import {ageErrorToast} from '../../../../../utils/toasts';

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
    // Kullanıcının yaşını hesapla
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // 18 yaşından küçükse uyarı ver
    if (age < 18) {
      return ageErrorToast();
    }

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
        <TouchableOpacity
          style={styles.datePickerTouchable}
          onPress={() => {
            setShow(true);
          }}>
          <Text style={styles.datePicker}>
            {date.getDate() === new Date().getDate()
              ? strings.dateofbirth
              : date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear()}
          </Text>
        </TouchableOpacity>
        {show && (
          // <RNDateTimePicker
          //   value={date}
          //   mode={'date'}
          //   display="default"
          //   onChange={(event, selectedDate) => {
          //     const currentDate = selectedDate || date;
          //     setShow(false);
          //     _handleSetDate(currentDate);
          //   }}
          // />
          <DateTimePickerModal
            isVisible={show}
            mode="date"
            onConfirm={date => {
              setShow(false);
              _handleSetDate(date);
            }}
            onCancel={() => {
              setShow(false);
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
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          style={styles.genderTouchable}>
          <Text style={styles.datePicker}>
            {gender === '' ? strings.gender : gender}
          </Text>
        </TouchableOpacity>
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
              <TouchableOpacity
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
                <Text
                  style={{
                    color: 'grey',
                    fontSize: fontSize(11),
                  }}>
                  {strings.female}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
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
                <Text
                  style={{
                    color: 'grey',
                    fontSize: fontSize(11),
                  }}>
                  {strings.male}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>
    </>
  );
};

export default GenderDateBody;
