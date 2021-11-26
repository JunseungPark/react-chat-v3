import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


function App() {

  const {user} = useContext(AuthContext)

  return (
    <Router>
      <Routes>
          <Route exact path="/" element={user? <Home/> : <Register/>}>
          </Route>
          <Route exact path="/login" element={user? <Navigate to="/"/> : <Login/>}>
          </Route>
          <Route exact path="/register" element={user? <Navigate to="/"/> : <Register/>}>
          </Route>
          <Route exact path="/messenger" element={!user ? <Navigate to="/"/> : <Messenger/>}>
          </Route>
          <Route exact path="/profile/:username" element={<Profile/>}>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
