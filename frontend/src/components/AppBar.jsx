import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Appbar({ user }) {
  const [isInvoked, setIsInvoked] = useState(false);
  const appbarRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    if (appbarRef.current && !appbarRef.current.contains(event.target)) {
      setIsInvoked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={appbarRef}
      className="flex justify-between items-center p-5 shadow relative bg-white"
    >
      <button className="font-bold text-xl" onClick={()=>{navigate('/student/dashboard')}}>BMSET Hostels</button>
      <div className="flex items-center relative">
        <div className="mr-10 font-medium">
          Hello, <span className="text-blue-500">{user}</span>
        </div>
        <button
          className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => setIsInvoked((prev) => !prev)}
        >
          {user[0].toUpperCase()}
        </button>
        <div>
          {isInvoked && (
            <div className="bg-slate-50 absolute right-0 top-8 mt-2 w-48 py-2 rounded-lg shadow-lg flex flex-col items-center">
              <button
                onClick={() => navigate("/profile")}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 opacity-80 duration-75"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 opacity-80 duration-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
