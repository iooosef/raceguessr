import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import MiniMap from "./components/MiniMap";
import Login from "./Login";
import Register from "./Register";
import MainMenu from "./MainMenu";
import Me from "./auth/Me";
import Logout from './auth/Logout';
import '@fontsource-variable/roboto-condensed';

import { ConfigProvider } from './util/ConfigContext';
import { UserProvider } from './auth/UserContext'; 
import ProtectedRoutes from './auth/ProtectedRoutes';
import LevelSelect from './LevelSelect';
import LevelTagSelect from './LevelTagSelect';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Reinitialize FlyonUI components on page change
    const loadFlyonui = async () => {
      const flyonui = await import('flyonui/flyonui');
      window.HSStaticMethods.autoInit();
    };
    loadFlyonui();
  }, [location.pathname]);

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/me" element={<Me />} />

        <Route element={<ProtectedRoutes  allowedRoles={['ADMIN', 'USER']} />}>
              <Route path="/menu" element={<MainMenu />} />
              <Route path="/levels" element={<LevelSelect />} />
              <Route path="/levels/tags" element={<LevelTagSelect />} />
        </Route>
      </Routes>
    </div>
  );
}