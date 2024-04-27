import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import slides from '../constants/slides';
import OnboardingItem from '../components/onboarding-ıtem';
import Paginator from '../components/paginator';
import {height, size} from 'react-native-responsive-sizes';
import strings from '../../../locale/locale';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavProp} from '../../../navigation/stack/auth-stack/auth-stack-types';

const Onboarding = () => {
  const navigation = useNavigation<AuthStackNavProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={slides}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          renderItem={({item}) => <OnboardingItem item={item} />}
          keyExtractor={item => item.id.toString()}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
          activeOpacity={0.8}
          style={styles.signupButton}>
          <Text style={styles.signupText}>{strings.signow}</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: size(10)}}>
          <Text style={{color: 'white'}}>{strings.alreadyUsing}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            activeOpacity={0.8}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {strings.login}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height(20),
    backgroundColor: '#23374A',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  signupButton: {
    width: '70%',
    height: size(50),
    borderWidth: size(1),
    borderRadius: size(10),
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: 'white',
    fontSize: size(18),
    textAlign: 'center',
  },
});
