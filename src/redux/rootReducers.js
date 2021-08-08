import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import filtersReducer from '../container/crud/fireStore/Filters/firestore/filtersReducer';
import groupsReducer from '../container/crud/fireStore/Groups/firestore/groupsReducer';
import organizationsReducer from '../container/crud/fireStore/Organizations/firestore/organizationsReducer';
import authReducer from './authentication/reducers';
import cartData from './cart/reducers';
import chartContentReducer from './chartContent/reducers';
import { chatReducer, groupChatReducer, SingleChatGroupReducer, SingleChatReducer } from './chat/reducers';
import Contact from './contact/reducers';
import { emailReducer, SingleEmailReducer } from './email/reducers';
import { fsCrudReducer, fsSingleCrudReducer } from './firestore/reducers';
import galleryReducer from './gallary/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import { readMessageReducer } from './message/reducers';
import Note from './note/reducers';
import { readNotificationReducer } from './notification/reducers';
import orderReducer from './orders/reducers';
import { productReducer, SingleProductReducer } from './product/reducers';
import Profile from './profile/reducers';
import { projectReducer, SingleProjectReducer } from './project/reducers';
import { sellersReducer } from './sellers/reducers';
import { teamReducer } from './team/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import themeUsersReducer from './themeUsers/reducers';
import Todo from './todo/reducers';

// import { userReducer } from './users/reducers';

const rootReducers = combineReducers({
  fb: firebaseReducer,
  fs: firestoreReducer,
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  orders: orderReducer,
  sellers: sellersReducer,
  groupsReducer,
  filtersReducer,
  organizationsReducer,
  // users: userReducer,
  team: teamReducer,
  auth: authReducer,
  gallery: galleryReducer,
  email: emailReducer,
  emailSingle: SingleEmailReducer,
  products: productReducer,
  product: SingleProductReducer,
  chatSingle: SingleChatReducer,
  chatSingleGroup: SingleChatGroupReducer,
  chat: chatReducer,
  groupChat: groupChatReducer,
  projects: projectReducer,
  project: SingleProjectReducer,
  ChangeLayoutMode,
  chartContent: chartContentReducer,
  crud: fsCrudReducer,
  singleCrud: fsSingleCrudReducer,
  cart: cartData,
  Todo,
  Note,
  Contact,
  Profile,
});

export default rootReducers;
