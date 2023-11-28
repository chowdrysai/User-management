import './App.css';
import Dashboard from './Page/Dashboard';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserDetails from './Page/Dashboard/Details';
import SignUp from './Page/Dashboard/SignUp';
import SignIn from './Page/Dashboard/SignIn';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("userData"));

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userData") {
        setToken(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {token ? (
            <Route path='/' element={<Navigate to='/home' replace />} />
          ) :
            <Route path='/' element={<Navigate to='/register' replace />} />
          }
          <Route path='/home' element={<Dashboard />} />
          <Route path="/api/users/:userId" element={<UserDetails />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
