import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
// Add the Firebase products that you want to use
import "firebase/firestore";
import "firebase/auth";

import activities from "../json/activity.json";
// import jsonInfo from "../json/jsonInfo.json";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};
firebase.initializeApp(firebaseConfig);

const activitiesCollectionRef = firebase.firestore().collection("Activity");
const activitiesDocRef = activitiesCollectionRef.doc("json");
const allActivitiesCollectionRef = activitiesDocRef.collection("allActivity");

export const getJSON = (url) => {
      switch (url) {
          case "/":
              return activities;
          default:
              return activities;
      }
  };

export const feedActivities = () => {
    activities.forEach((activity) => {
      const docRef = allActivitiesCollectionRef.doc();
      const id = docRef.id;
      // Store Data for Aggregation Queries
      docRef.set({
        ...activity,
        id:id
      });
    })
}

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
  };
  