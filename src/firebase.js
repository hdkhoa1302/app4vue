import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDjBc2t8mpvSYYmXat6TPYjm-YkQZJrU9w",
    authDomain: "chatbox-3f314.firebaseapp.com",
    databaseURL: "https://chatbox-3f314.firebaseio.com",
    projectId: "chatbox-3f314",
    storageBucket: "chatbox-3f314.appspot.com",
    messagingSenderId: "194683647484",
    appId: "1:194683647484:web:52dcaf6843b735be41ee79",
    measurementId: "G-YDXV169MWK"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics()
  export default firebase;