import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import jsonInfo from "../json/jsonInfo.json";
import activities from "../json/activity.json";

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
firebase.firestore().enablePersistence()
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// REFERENCE ACTIVITIES
const activitiesCollectionRef = firebase.firestore().collection("Activity");
const activitiesDocRef = activitiesCollectionRef.doc("json");
const allActivitiesCollectionRef = activitiesDocRef.collection("allActivity");

//REFERENCE AUTH
const auth = firebase.auth();

//REFERENCE POST
const post = firebase.firestore().collection("Post");
const postDocRef = post.doc("postJson");
const allPostCollectionRef = postDocRef.collection("allPost");
const allOrdersCollectionRef = firebase.firestore().collection("allOrders");

export const getActivityById = async (activityId) => {
  const doc = await allActivitiesCollectionRef.doc(activityId).get();
  return doc.data()
}

export const getActivities = async () => {
  let jsonActivity = [];
  // QUERY PRODUCTS
  let querySnapshot;
  querySnapshot = await allActivitiesCollectionRef.get();
  querySnapshot.forEach((doc) => {
    jsonActivity.push(doc.data());
  })
  return jsonActivity;
}

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

export const createPostApi = async (post) => {
  const author = auth.currentUser.displayName;
  const postRef = await allPostCollectionRef.doc();
  let date = new Date().getTime();
  const time= new Intl.DateTimeFormat( { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  const id = postRef.id;
  var like =[];
  // Store Data for Aggregation Queries
  await postRef.set({
    ...post,
    id,
    author,
    date,
    time,
    like,
  });
  return { ...post };
}

export const getPostById = async (postId) => {
  const doc = await allPostCollectionRef.doc(postId).get();
  return doc.data()
}

export const createCommentApi = async (postId, comment) => {
  const doc = await allPostCollectionRef.doc(postId);
  const user = auth.currentUser.displayName;
  let date = new Date().getTime();
  const time= new Intl.DateTimeFormat({ year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
  const commentDoc = doc.collection("allComment").doc();
  await commentDoc.set({
    user,
    ...comment,
    date,
    time,
  });
  return { ...commentDoc };
}



export const thumbsUpApi = async (postId) => {
  const doc = await allPostCollectionRef.doc(postId);
  const user = auth.currentUser.uid;
  const userLike = doc.collection("Liked").doc();
  const id = userLike.id;
  await userLike.set({
    user,
    id,
  });
  return { ...post };
}

export const checkLike = async (postId) => {
  const doc = await allPostCollectionRef.doc(postId);
  const userLike = doc.collection("Liked");
  const user = auth.currentUser.uid;
  let jsonLikes = [];
  let ifIsLiked = "false";
  const querySnapshot = await userLike.where("user", "==", user).get();
  querySnapshot.forEach((doc) => {
    jsonLikes.push(doc.data());
  });
  if (jsonLikes.length!==0){
    ifIsLiked = "true";
  }
  return ifIsLiked;
}

export const thumbsDownApi = async (postId) => {
  const doc = await allPostCollectionRef.doc(postId);
  const userLike = doc.collection("Liked");
  const user = auth.currentUser.uid;
  let jsonLikes = [];
  const querySnapshot = await userLike.where("user", "==", user).get();
  querySnapshot.forEach((doc) => {
    jsonLikes.push(doc.data());
  });
  await userLike.doc(jsonLikes[0].id).delete();
}

export const getLikesByPost = async (postId) => {
  const post = await allPostCollectionRef.doc(postId);
  const likedCollection = await post.collection("Liked");
  let jsonLikes = [];

  let querySnapshot;
    querySnapshot = await likedCollection.get();
  querySnapshot.forEach((doc) => {
    jsonLikes.push(doc.data());
  });
  return jsonLikes;
}

export const getCommentApi = async (postId) => {
  const post = await allPostCollectionRef.doc(postId);
  const commentCollection = await post.collection("allComment");
  let jsonComment = [];

  let querySnapshot;
    querySnapshot = await commentCollection.get();
  querySnapshot.forEach((doc) => {
    jsonComment.push(doc.data());
  });
  return jsonComment;
}

export const getPosts = async (url) => {
  const collection = jsonInfo.find(element => element.url === url);
  const collectionName = collection.name || "allPost";
  let jsonPosts = [];

  let querySnapshot;
  if (collectionName === "allPost")
    querySnapshot = await allPostCollectionRef.get();
  else
    querySnapshot = await allPostCollectionRef.where("activity", "==", collectionName).get();
  querySnapshot.forEach((doc) => {
    jsonPosts.push(doc.data());
  });
  const length = jsonPosts.length;
  for (let i = 0; i < length-1; i++) {
      for (let j = 0; j < length-1; j++) {
          if(jsonPosts[j].date < jsonPosts[j+1].date) {
              let temp = jsonPosts[j]
              jsonPosts[j] = jsonPosts[j+1];
              jsonPosts[j+1] = temp;
          }
      }
  }
  return jsonPosts;
}

export const getPostsForActivity = async () => {
  let jsonPosts = [];

  let querySnapshot;
    querySnapshot = await allPostCollectionRef.get();
  querySnapshot.forEach((doc) => {
    jsonPosts.push(doc.data());
  });
  return jsonPosts;
}

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const signInWithEmailPassword = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
}

export const registerWithEmailPassword = async (email, password, displayName) => {
  await auth.createUserWithEmailAndPassword(email, password);
  const user = auth.currentUser;
  await user.updateProfile({ displayName })
  return user;
}

export const updateUserInfoApi = async (email, password, displayName) => {
  console.log(email);
  console.log(password);
  console.log(displayName)
  const user = auth.currentUser;
  if(displayName)
    await user.updateProfile({ displayName });
  if(email)
    await user.updateEmail(String(email));
  if(password)
    await user.updatePassword(password);
  return user;
}

export const createOrderApi = async (order) => {
  const user = auth.currentUser.uid;
  const orderRef = await allOrdersCollectionRef.doc();
  const id = orderRef.id;
  // Store Data for Aggregation Queries
  await orderRef.set({
    ...order,
    id,
    user
  });
  return { ...order, id };
}

export const getOrderById = async (orderId) => {
  const doc = await allOrdersCollectionRef.doc(orderId).get();
  return doc.data()
}

export const getOrderByUser = async () => {
  const user = auth.currentUser.uid;
  let jsonOrders = [];

  // QUERY Orders
  const querySnapshot = await allOrdersCollectionRef.where("user", "==", user).get();
  querySnapshot.forEach((doc) => {
    jsonOrders.push(doc.data());
  });
  return jsonOrders;
}

export const signOut = () => {
  auth.signOut();
}

export const checkLoginApi = () => {
  const user = auth.currentUser;
  return user.uid?  true : false;
}