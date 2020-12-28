import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Register from './components/SignUp/Register';
import Login from './components/Login/Login';
import ForgetPassword from './components/Forget Password/ForgetPassword';
import ProtectedRoute from '../src/routes/Private';
import Dashboard from './components/Dasboard/Dashboard';
// import ErrorBoundary from './ErrorBoundary';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ Register }/>
          <Route exact path="/Login" component={ Login }/>
          <Route exact path="/forget-password" component={ ForgetPassword }/>
          <ProtectedRoute path="/dashboard" component={ Dashboard }/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
