
import './App.css';
import Intro from './pages/Intro/Intro'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { useSelector } from 'react-redux';

function App() {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  
  return (
    <div className='body-wrapper'>
      <Router>
        <Switch>
          <Route exact path="/" component={Intro} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" 
            render={(props)=>
            userInfo ? (
              <Dashboard 
              {...props}
              userInfo={userInfo}
              />
            ): (<Redirect 
              to='/login'
            />)}
             />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
