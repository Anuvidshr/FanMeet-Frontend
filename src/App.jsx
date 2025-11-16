import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./assets/utils/Store";
import Body from "./assets/components/Body";
import Login from "./assets/components/Login";
import { ThemeProvider } from "./assets/utils/ThemeContext";
import Notifications from "./assets/components/Notifications";
import PrivateRoute from "./assets/components/PrivateRoute";
import Profile from "./assets/components/Profile";
import Feed from "./assets/components/Feed";
import Connection from "./assets/components/Connection"
import Request from "./assets/components/Request";
import Chat from "./assets/components/Chat";
import About from "./assets/components/About";
import Explore from "./assets/components/Explore";
import Homepage from "./assets/components/Homepage";
import FanTweet from "./assets/components/FanTweet";
import Settings from "./assets/components/Settings";
import Hp from "./fandomPages/Hp";
import Cricket from "./fandomPages/Cricket";

//kumar sanu   //udit narayan 
//kishor kumar //lata mangeshkar
//arijit singh  //kk

//sunil gawaskar kapil dev
//sachin tendulkar saurav ganguly
//virat //dhoni

//chandrakanta santanti //malgudi days//harry potter //the girl in room 105
//ali baba //tenali Raman
//



function App(){
  return(
      <>
     
     <Provider store={Store}>
      <ThemeProvider>
      <BrowserRouter basename="/">
       <Routes>
          {/* ensure deployed root goes to Homepage */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="Profile" element={<Profile/> }/>
          <Route path="homepage" element={<Homepage/> }/>
          <Route path="feed" element={<Feed/> }/>
          <Route path="explore" element={<Explore/> }/>
          <Route path="fantweet" element={<FanTweet/> }/>
          <Route path="settings" element={<Settings/> }/>
          <Route path="Connection" element={<Connection/> }/>
          <Route path="Request" element={<Request/>}/>
          <Route path="Chat/:toUserId" element={<Chat/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="fandom/a" element={<Hp/>}/>
          <Route path="fandom/f" element={<Cricket/>}/>
          <Route path="/notifications" element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          } />
          {/* catch-all: redirect unknown URLs to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </BrowserRouter>
      </ThemeProvider>
      </Provider>


      </>
  );
}
export default App;