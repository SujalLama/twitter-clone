import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// screens
import FirstScreen from './screens/FirstScreen/FirstScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Profile from './screens/Profile/Profile';


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={FirstScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
