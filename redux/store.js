import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import bookReducer from './bookSlice';
import clubReducer from './clubSlice';


const userPersistConfig = {
  key: 'user',
  storage,
};

const bookPersistConfig = {
  key: 'book',
  storage,
};

const clubPersistConfig = {
  key: 'club',
  storage,
};


const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedBookReducer = persistReducer(bookPersistConfig, bookReducer);
const persistedClubReducer = persistReducer(clubPersistConfig, clubReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    book: persistedBookReducer,
    club: persistedClubReducer,
  },
});

export default store;
