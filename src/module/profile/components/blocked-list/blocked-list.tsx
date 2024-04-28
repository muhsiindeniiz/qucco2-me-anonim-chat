import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {firestore} from '../../../../db/Firebase/config';
import useStayLoggedin from '../../../../utils/useStayLoggedin';
import styles from './blocked-list.style';
import {doc, getDoc, deleteDoc, setDoc} from 'firebase/firestore';

interface ListItem {
  key: string;
  userId: string;
  username: string;
}

const rowSwipeAnimatedValues: {[key: string]: Animated.Value} = {};
Array(20)
  .fill('')
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

const BlockedList: React.FC = () => {
  const id = useStayLoggedin();
  const [listData, setListData] = useState<ListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      setIsLoading(true);
      try {
        const blockedUsersRef = doc(firestore, 'blocked', id);
        const blockedUsersDoc = await getDoc(blockedUsersRef);
        if (blockedUsersDoc.exists()) {
          const blockedUsersData = blockedUsersDoc.data();
          if (
            blockedUsersData &&
            blockedUsersData.users &&
            Array.isArray(blockedUsersData.users)
          ) {
            const usersList: ListItem[] = blockedUsersData.users.map(
              (user: any, index: number) => ({
                key: `${index}`,
                userId: user.userId,
                username: user.username,
              }),
            );
            setListData(usersList);
          } else {
            console.warn('Blocked users data is invalid:', blockedUsersData);
          }
        } else {
          console.warn('Blocked users data not found for user:', id);
        }
      } catch (error) {
        console.error('Error fetching blocked users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlockedUsers();
  }, [id]);

  const deleteRow = async (rowMap: any, rowKey: string, userId: string) => {
    try {
      const userRef = doc(firestore, 'blocked', id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedUsers = userData.users.filter(
          (user: any) => user.userId !== userId,
        );
        await setDoc(userRef, {users: updatedUsers});
        const updatedList = listData.filter(item => item.userId !== userId);
        setListData(updatedList);
        closeRow(rowMap, rowKey);
      } else {
        console.warn('Blocked users data not found for user:', id);
      }
    } catch (error) {
      console.error('Error removing user from blocked list: ', error);
    }
  };

  const closeRow = (rowMap: any, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onSwipeValueChange = (swipeData: {key: string; value: number}) => {
    const {key, value} = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = ({item}: {item: ListItem}) => (
    <TouchableHighlight style={styles.rowFront} underlayColor="#06101B">
      <Text style={styles.username}>{item.username}</Text>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data: {item: ListItem}, rowMap: any) => (
    <View>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data.item.userId)}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                    inputRange: [45, 90],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            style={styles.trash}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          disableRightSwipe
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange}
        />
      )}
    </View>
  );
};

export default BlockedList;
