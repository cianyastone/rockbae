import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';
import Activity from './pages/Activity'
import ActivityDetail from './pages/ActivityDetail'
import Prefer from './pages/Prefer'
import Cart from './pages/Cart'
import Feed from './pages/Feed'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Profile from './pages/ProfilePage'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import PlaceOrder from './pages/PlaceOrder'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'

import { StoreProvider } from "./store";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Activity} />
          <Route exact path="/Home" component={Activity} />
          <Route path="/activity/:activityId" component={ActivityDetail} />
          <Route path="/Prefer" component={Prefer} />
          <Route path="/Cart" component={Cart} />
          <Route exact path="/feeder" component={Feed} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/createPost" component={CreatePost} />
<<<<<<< HEAD
          <Route path="/post" component={Post} />
          <Route path="/post/:activity/:postId" component={PostDetail} />
=======
          <Route path="/post" component={PostDetail} />
          <Route path="/activity/:activityId" component={ActivityDetail} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
>>>>>>> 7fae29ee5b3bd6f8687182126440aa6bffbf0f3d
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
