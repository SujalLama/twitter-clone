import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// screens
import FirstScreen from './screens/FirstScreen/FirstScreen';


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={FirstScreen} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
