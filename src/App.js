import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';
import Home from './pages/Home'
import Activity from './pages/Activity'

import { StoreProvider } from "./store";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:pageName" component={Home} />
          <Route path="/activity/:activityId" component={Activity} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
