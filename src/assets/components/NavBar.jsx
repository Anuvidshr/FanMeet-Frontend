import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect } from "react"; // { added import }
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";
import { authUtils } from "../../utils/auth";
import { useTheme } from "../utils/ThemeContext";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  
  // Check if we're on the login page
  const isLoginPage = location.pathname === '/login';

  // If user is already logged in and lands on /login, redirect to homepage
  useEffect(() => {
    if (user && isLoginPage) {
      navigate("/", { replace: true });
    }
  }, [user, isLoginPage, navigate]);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/logout`, {}, {
        withCredentials: true,
        headers: authUtils.getAuthHeaders()
      });
      
      // Clear the token from localStorage
      authUtils.clearToken();
      
      dispatch(removeUser());
      toast.success("Logout Successful! 🥺");
      
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      toast.error("Logout failed! Please try again.");
    }
  };

  // Theme-specific styles
  const navbarStyles = {
    dark: "bg-gray-800/90",
    light: "bg-purple-800/80"
  };

  const borderStyles = {
    dark: "border-gray-700/50",
    light: "border-purple-800/50"
  };

  const currentNavbar = navbarStyles[theme] || navbarStyles.dark;
  const currentBorder = borderStyles[theme] || borderStyles.dark;
   
  return (
    <>
     <div className={`navbar ${currentNavbar} backdrop-blur-sm border-b ${currentBorder} shadow-lg mx-auto relative z-[10000]`}>
  
  {/* Left Section: Logo */}
  <div className="flex-0">
     {/* FanMeet Logo - NO BOX */}
     <Link to="/" title="Go to Login Page" className="group relative flex items-center space-x-2 transition-all duration-300 hover:scale-110">
       
       {/* Logo Text with Cursive Styling */}
       <div className="relative">
         <span className={`text-xl sm:text-2xl font-bold italic bg-clip-text text-transparent transition-all duration-300 ${
           theme === 'light' 
             ? 'bg-gradient-to-r from-yellow-200 via-blue-100 to-cyan-200 group-hover:from-purple-100 group-hover:via-blue-200 group-hover:to-cyan-200' 
             : 'bg-gradient-to-r from-purple-100 via-blue-200 to-cyan-200 group-hover:from-purple-300 group-hover:via-blue-300 group-hover:to-cyan-300'
         }`} style={{ fontFamily: 'cursive' }}>
           Fan
         </span>
         <span className={`text-xl sm:text-2xl font-bold italic bg-clip-text text-transparent transition-all duration-300 ${
           theme === 'light' 
             ? 'bg-gradient-to-r from-cyan-200 via-blue-100 to-yellow-100 group-hover:from-cyan-200 group-hover:via-blue-200 group-hover:to-purple-100' 
             : 'bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-100 group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-300'
         }`} style={{ fontFamily: 'cursive' }}>
           Meet
         </span>
         
         {/* Animated Underline */}
         <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-500"></div>
         
         {/* Floating Particles */}
         <div className="absolute -top-1 -right-1 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
         <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 delay-150"></div>
       </div>
       
       {/* Sparkle Effect */}
       <div className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
         🌟
       </div>
     </Link>
  </div>
  
  {/* Center Section: Navigation Icons */}
  <div className="flex-1 flex justify-center">
    {user && !isLoginPage && (
      <div className="hidden md:flex items-center gap-8">
        {/* Homepage Icon */}
        <Link to="/" title="Homepage" className="group relative flex items-center justify-center text-l hover:scale-125 transition-all duration-300 hover:drop-shadow-lg">
          <span className="group-hover:animate-bounce">Home</span>
        </Link>
        
        {/* Explore Icon */}
        <Link to="/explore" title="Explore" className="group relative flex items-center justify-center text-l hover:scale-125 transition-all duration-300 hover:drop-shadow-lg">
          <span className="group-hover:animate-bounce">Explore</span>
        </Link>
        
        {/* FanTweet Icon */}
        <Link to="/fantweet" title="FanTweet" className="group relative flex items-center justify-center text-l hover:scale-125 transition-all duration-300 hover:drop-shadow-lg">
          <span className="group-hover:animate-bounce">FanTweet</span>
        </Link>

        {/* Connection Icon */}
        <Link to="/connection" title="Your Connections" className="group relative flex items-center justify-center text-l hover:scale-125 transition-all duration-300 hover:drop-shadow-lg">
          <span className="group-hover:animate-bounce">Connections</span>
        </Link>

        {/* theme Icon */}
        <Link to="/settings" title="Settings" className="group relative flex items-center justify-center text-l hover:scale-125 transition-all duration-300 hover:drop-shadow-lg">
          <span className="group-hover:animate-bounce">Settings</span>
        </Link>
        
      </div>
    )}
  </div>

  {/* Right Section: User Menu */}
  <div className="flex-0 flex gap-4">
          
    {user ? (
      <div className="dropdown dropdown-end flex justify-between gap-4 ">
        <div className="mt-1.5 bg-gradient-to-r from-amber-200/30 to-yellow-100/10 rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-2 border-0 sm:border border-gray-700/50 shadow flex items-center justify-center h-6 sm:h-8 md:h-10 min-w-[120px] sm:min-w-[160px] md:min-w-[200px]">
              <p className={`font-semibold text-xs sm:text-sm md:text-base text-center leading-none whitespace-nowrap ${theme === 'light' ? 'text-purple-200' : 'text-white'}`}>
                <span className="hidden sm:inline">Welcome,&nbsp;</span>
                <span className="sm:hidden">Hi&nbsp;</span>
                <span className="bg-gradient-to-r from-blue-200 to-purple-100 bg-clip-text text-transparent font-bold">
                  {user?.firstname || user?.firstName || user?.name || "User"}&nbsp;!
                </span>
              </p>
        </div>
        <div tabIndex={0} role="button" title="View Profile Menu" className="btn btn-ghost btn-circle avatar mr-5">
          <div className="w-15  rounded-full ring-2 ring-blue-500/50">
            <img
              alt="User Avatar"
              src={user?.photoUrl || user?.profileImage || user?.avatar || "https://via.placeholder.com/40?text=U"} />
          </div>
        </div>
       
        <ul
          tabIndex={0}
          className={`menu menu-sm dropdown-content rounded-2xl z-[10001] mt-3 w-56 p-3 shadow-2xl border ${theme === 'light' ? 'bg-green-100/95 border-green-300/50 backdrop-blur-sm' : 'bg-gray-800/95 backdrop-blur-sm border-gray-700/50'}`}>
          <li><Link to="/" title="Homepage" className={`rounded-xl px-4 py-2 ${theme === 'light' ? 'text-gray-800 hover:bg-green-200/70' : 'text-white hover:bg-gray-700/70'}`}>🏠 Homepage</Link></li>
          <li><Link to="/explore" title="Explore FanMeet" className={`rounded-xl px-4 py-2 ${theme === 'light' ? 'text-gray-800 hover:bg-green-200/70' : 'text-white hover:bg-gray-700/70'}`}>🔍 Explore</Link></li>
          <li><Link to="/fantweet" title="View FanTweets" className={`rounded-xl px-4 py-2 ${theme === 'light' ? 'text-gray-800 hover:bg-green-200/70' : 'text-white hover:bg-gray-700/70'}`}>💬 FanTweet</Link></li>
          <li><Link to="/connection" title="Your Connections" className={`rounded-xl px-4 py-2 ${theme === 'light' ? 'text-gray-800 hover:bg-green-200/70' : 'text-white hover:bg-gray-700/70'}`}>🤝 Connection</Link></li>
          <li><Link to="/notifications" title="Your Notifications" className={`rounded-xl px-4 py-2 ${theme === 'light' ? 'text-gray-800 hover:bg-green-200/70' : 'text-white hover:bg-gray-700/70'}`}>🔔 Notifications</Link></li>
          <li><Link to="/settings" title="Account Settings" className={`rounded-xl px-4 py-2 ${theme === 'light' ? 'text-gray-800 hover:bg-green-200/70' : 'text-white hover:bg-gray-700/70'}`}>⚙️ Settings</Link></li>
           <li><a onClick={handleLogout} title="Sign Out" className={`rounded-xl px-4 py-2 cursor-pointer ${theme === 'light' ? 'text-gray-800 hover:bg-red-200/50' : 'text-white hover:bg-red-500/20 hover:text-red-400'}`}>🚪 Logout</a></li>
         </ul>
       </div>
     ) : (
       <div className="flex gap-2">
        
       </div>
     )}
   </div>
 </div>
 
 <style jsx>{`
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
  
  [style*="font-family: cursive"] {
    font-family: 'Great Vibes', cursive !important;
    letter-spacing: 0.05em;
  }
`}</style>

</>
  )
}

export default NavBar;