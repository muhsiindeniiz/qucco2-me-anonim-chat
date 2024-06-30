import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import styles from './style/explore-page-styles';
import strings from '../../../locale/locale';
import Feather from 'react-native-vector-icons/Feather';
import {fontSize, size} from 'react-native-responsive-sizes';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ExploreStackNavProp} from '../../../navigation/stack/explore-stack/explore-stack-types';
import {setVisible} from '../../../redux/tabbar-visible-slice/tabbar-visible-slice';
import {UserType} from '../../../constants/types';
import {useNavigation} from '@react-navigation/native';
import useVisible from '../../../utils/tabbarVisible';

const Explore = () => {
  const [search, setSearch] = React.useState('');
  const navigation = useNavigation<ExploreStackNavProp>();
  const currentUser = useSelector(
    (state: RootState) => state.shuffle.currentUser,
  );
  useVisible(navigation, false);
  const dispatch = useDispatch();
  const _handlePress = (item: UserType) => {
    navigation.navigate('ChatStack', {
      screen: 'NewChat',
      params: {
        item,
        currentUser,
      },
    });
    dispatch(setVisible(true));
  };
  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => _handlePress(item)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: size(0.3),
          borderBottomColor: 'grey',
          padding: size(10),
          zIndex: 3,
        }}>
        <Image
          source={{uri: item.photo}}
          style={{
            width: size(60),
            height: size(60),
            borderRadius: size(60),
            zIndex: 2,
            backgroundColor: 'grey',
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: fontSize(12),
            position: 'absolute',
            left: size(80),
            top: size(10),
          }}>
          {item.username}
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: fontSize(10),

            position: 'absolute',
            left: size(80),
            top: size(40),
          }}>
          {item.about}
        </Text>
      </TouchableOpacity>
    );
  };

  const userData = useSelector((state: RootState) => state.shuffle.userData);

  // Randomize the userData array
  const shuffledUsers = React.useMemo(() => {
    return [...userData].sort(() => Math.random() - 0.5);
  }, [userData]);

  // Slice the first 25 users
  const randomUsers = React.useMemo(() => {
    return shuffledUsers.slice(0, Math.min(25, shuffledUsers.length));
  }, [shuffledUsers]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather
          style={styles.searcIcon}
          name="search"
          size={size(20)}
          color={'grey'}
        />
        <TextInput
          placeholder={strings.search}
          placeholderTextColor={'grey'}
          value={search}
          onChangeText={text => setSearch(text)}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.filterContainer}>
        <IonIcons
          name="filter"
          size={size(20)}
          color={'white'}
          onPress={() => console.log('Filter')}
          style={{position: 'absolute', left: size(15), zIndex: 1}}
        />
        <Text style={styles.filterText}>{strings.filter}</Text>
        <Entypo
          name="chevron-right"
          size={size(20)}
          color={'white'}
          style={{position: 'absolute', right: size(15), zIndex: 1}}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Shuffle</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              right: size(5),
            }}>
            <IonIcons
              name="person"
              size={size(10)}
              color={'grey'}
              onPress={() => console.log('Profile')}
            />
            <Text
              style={{
                color: 'grey',
                marginRight: size(2),
                fontSize: fontSize(9),
                alignSelf: 'center',
              }}>
              {} {randomUsers.length} people
            </Text>
          </View>
        </View>
        <FlatList
          data={randomUsers}
          keyExtractor={item => item.username}
          renderItem={_renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;
