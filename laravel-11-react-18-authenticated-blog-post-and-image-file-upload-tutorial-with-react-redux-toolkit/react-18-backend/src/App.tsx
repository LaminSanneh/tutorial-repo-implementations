import "./App.css";
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import RegisterComponent from "./components/RegisterComponent";
import UserProfileComponent from "./components/UserProfileComponent";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Link to={"login"}>Login</Link><> </>
        <Link to={"register"}>Register</Link><> </>
        <Link to={"profile"}>Profile</Link><> </>
        <Link to={"logout"}>Logout</Link>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/logout" element={<LogoutComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/profile" element={<UserProfileComponent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
