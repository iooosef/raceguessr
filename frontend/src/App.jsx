import React, { useEffect, useRef } from 'react';
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
import RaceGuessr from './RaceGuessr'
import Leaderboards from './Leaderboards';
import About from './About';
import BGM from './assets/bgm.mp3'
import HowToPlay from './HowToPlay';

export default function App() {
  const location = useLocation();
  const audioRef = useRef(null);
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.05;
    audio.play().catch(() => {}); // Handle autoplay restrictions
  }, []);

  useEffect(() => {
    // Reinitialize FlyonUI components on page change
    const loadFlyonui = async () => {
      const flyonui = await import('flyonui/flyonui');
      window.HSStaticMethods.autoInit();
    };
    loadFlyonui();
  }, [location.pathname]);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <audio ref={audioRef} src={BGM} loop autoPlay />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/me" element={<Me />} />

        <Route element={<ProtectedRoutes  allowedRoles={['ADMIN', 'USER']} />}>
              <Route path="/menu" element={<MainMenu />} />
              <Route path="/leaderboards" element={<Leaderboards />} />
              <Route path="/levels" element={<LevelSelect />} />
              <Route path="/levels/tags" element={<LevelTagSelect />} />
              <Route path="/raceguessr" element={<RaceGuessr />} />
              <Route path="/about" element={<About />} />
              <Route path="/how2play" element={<HowToPlay />} />
        </Route>
      </Routes>
    </div>
  );
}