

import { useDispatch, useSelector } from 'react-redux';
import store from './store';


// Create your own dispatch and selector hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);

// Access the types of RootState and AppDispatch from the store
export const getRootState = () => store.getState(); // This gives you access to the current state
export const getAppDispatch = () => store.dispatch; // This gives you access to the dispatch method

