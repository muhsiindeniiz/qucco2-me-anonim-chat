import {TextInput, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import styles from './style/explore-page-styles';
import strings from '../../../locale/locale';
import Feather from 'react-native-vector-icons/Feather';
import { size } from 'react-native-responsive-sizes';

const Explore = () => {
  const [search, setSearch] = React.useState('');

  const userData = useSelector((state: RootState) => state.shuffle.userData);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather style={styles.searcIcon} name="search" size={size(20)} color={'grey'} />
        <TextInput
          placeholder={strings.search}
          placeholderTextColor={'grey'}
          value={search}
          onChangeText={text => setSearch(text)}
          style={styles.searchInput}
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;
