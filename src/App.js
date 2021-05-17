import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// screens
import FirstScreen from './screens/FirstScreen/FirstScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Profile from './screens/Profile/Profile';
import Notification from './screens/Notification/Notification';

//Protect routes
import PrivateRoute from './ProtectedRoute';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={FirstScreen} />
        <Route path="/login" component={LoginScreen} />
        <PrivateRoute path="/home">
            <HomeScreen />
          </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
          </PrivateRoute>
        <PrivateRoute path="/notifications">
          <Notification />
          </PrivateRoute>
      </Switch>
    </Router>
    </>
  );
}

export default App;
