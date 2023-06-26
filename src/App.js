import React, { useState,useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/Login/store/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem("user")){
      setIsLoggedIn(true);
    }
  },[]); 

  

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("user",'1');
    setIsLoggedIn(true);     
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn
    }} >
    
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    
    </AuthContext.Provider>
  );
}

export default App;
