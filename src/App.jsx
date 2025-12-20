import { BrowserRouter,Routes,Route } from "react-router-dom";
import Body from "./assets/components/Body";
import Login from "./assets/components/Login";
import { Provider } from 'react-redux'
import Store from '../src/assets/utils/Store'
import 'react-toastify/dist/ReactToastify.css';
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
import Anime from "./fandomPages/Anime";
import { ThemeProvider } from "./assets/utils/ThemeContext";

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
          <Route path="/" element={<Body/>}>   
              <Route index element={<Homepage/>}/>
              <Route path="login" element={<Login/>}/>
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
          </Route>
          {/* Fandom Routes - outside Body for clean full-screen */}
          <Route path="/fandom/a" element={<Hp/>}/>
          <Route path="/fandom/f" element={<Cricket/>}/>
          <Route path="/fandom/anime" element={<Anime/>}/>
       </Routes>
      </BrowserRouter>
      </ThemeProvider>
      </Provider>


      </>
  );
}
export default App;