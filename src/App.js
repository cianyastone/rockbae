import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';
import Activity from './pages/Activity'
import ActivityDetail from './pages/ActivityDetail'
import Prefer from './pages/Prefer'
import Cart from './pages/Cart'
import Feed from './pages/Feed'

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
          <Route exact path="/:pageName" component={Activity} />
          <Route path="/activity/:activityId" component={ActivityDetail} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
