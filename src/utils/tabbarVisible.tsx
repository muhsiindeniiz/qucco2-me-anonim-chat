import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setVisible} from '../redux/tabbarVisibleSlice/tabbarVisibleSlice';

const useVisible = (navigation: any, action: boolean) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setVisible(action));
    });

    return unsubscribe;
  }, [dispatch, navigation, action]);
};

export default useVisible;
