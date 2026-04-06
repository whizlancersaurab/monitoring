import { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,

} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import Layout from './layout/Layout';
import MyProfile from './pages/MyProfile';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>

      <Routes>
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        {/* <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
        /> */}
      </Routes>
    </>
  );
}

export default App;
