import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.less';
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
import Favorite from './pages/Favorite'
import UserOrder from './pages/UserOrder'
import Post from './pages/Post'
import PlaceOrder from './pages/PlaceOrder'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import Order from './pages/Order'

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
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/createPost" component={CreatePost} />
          <Route path="/userorder" component={UserOrder} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/post/:activity" component={Post} />
          <Route exact path="/post/:activity/:postId" component={PostDetail} />
          <Route path="/favoritePost" component={Favorite} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/order/:orderId" component={Order} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
