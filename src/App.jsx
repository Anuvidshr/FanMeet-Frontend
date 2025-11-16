import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./assets/utils/Store";
import Homepage from "./assets/components/Homepage";
import Login from "./assets/components/Login";
import Explore from "./assets/components/Explore";
import Connection from "./assets/components/Connection";
import Request from "./assets/components/Request";
import Notifications from "./assets/components/Notifications";
import Settings from "./assets/components/Settings";
import FanTweet from "./assets/components/FanTweet";
import NavBar from "./assets/components/NavBar";
import { ThemeProvider } from "./assets/utils/ThemeContext";
import PrivateRoute from "./assets/components/PrivateRoute";

function App() {
  return (
    <Provider store={Store}>
      <ThemeProvider>
        <BrowserRouter basename="/">
          <NavBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>} />
            <Route path="/connection" element={<PrivateRoute><Connection /></PrivateRoute>} />
            <Route path="/request" element={<PrivateRoute><Request /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/fantweet" element={<PrivateRoute><FanTweet /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;