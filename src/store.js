import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
//@todo

const firebaseConfig = {
  apiKey: "AIzaSyCvXlqxhYA2NYCUXlclhJrXYXafEZggDNQ",
  authDomain: "reactclientpanel-71819.firebaseapp.com",
  databaseURL: "https://reactclientpanel-71819.firebaseio.com",
  projectId: "reactclientpanel-71819",
  storageBucket: "reactclientpanel-71819.appspot.com",
  messagingSenderId: "539755047023"
};
//react-redux-firebase-config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
//initialize firebase instance
firebase.initializeApp(firebaseConfig);
//initialize firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

//Create initial state
const initialState = {};
//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
