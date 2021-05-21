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

import { StoreProvider } from "./store";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/Prefer" component={Prefer} />
          <Route path="/Cart" component={Cart} />
          <Route exact path="/" component={Activity} />
          <Route exact path="/feeder" component={Feed} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/Cart" component={Cart} />
          <Route path="/activity/:activityId" component={ActivityDetail} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
