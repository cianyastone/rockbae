import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';
import Home from './pages/Home'
import Activity from './pages/Activity'
import Prefer from './pages/Prefer'

import { StoreProvider } from "./store";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/Prefer" component={Prefer} />
          <Route exact path="/" component={Home} />
          <Route exact path="/:pageName" component={Home} />
          <Route path="/activity/:activityId" component={Activity} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
