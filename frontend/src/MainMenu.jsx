import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgVideo from './assets/menu-bg.mp4';
import bannerLogo from './assets/banner-logo.png'
import bannerTagline from './assets/banner-tagline.png'
import SignOutIcon from './assets/signout-btn.png';
import { useConfig } from './util/ConfigContext';
import { useUser } from './auth/UserContext';

import ProfileHeader from './components/ProfileHeader';

const MainMenu = () => {
    const {serverUrl} = useConfig();
    const { user, loading } = useUser();
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user || loading === false) {
            setIsUserLoaded(true);
        }
    }, [user, loading]);

    useEffect(() => {
        if (!serverUrl) return;
    }, [serverUrl]);


    const menuBtnStyle = {
        padding: '0.5rem 1.2rem',
        fontStyle: 'italic',
        fontWeight: '900',
        fontSize: '1.8rem',
        lineHeight: '2.25rem',
        color: '#fff'
    }

    if (loading || !isUserLoaded) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center relative'>
            <video autoPlay='true' muted='true' loop='true' className='w-full h-full fixed top-0 left-0 object-cover z-0' >
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <header className='w-full fixed top-0 flex justify-between p-4'>
                <ProfileHeader />
                <div>
                    <a onClick={() => navigate('/logout')}  type="button">
                        <img src={SignOutIcon} alt="sign out button" className='h-[50px] transition-all duration-300 ease-in-out transform hover:scale-105' />
                    </a>
                </div>
            </header>
            <main className='absolute flex flex-col items-center z-10'>                
                <div className="max-w-[450px] mt-[-80px] mb-[50px]">
                    <img src={bannerLogo} alt="logo" style={{marginBottom: '-100px'}}/>
                    <img src={bannerTagline} alt="logo" className="mt-2" />
                </div>
                <nav className='flex flex-col justify-center gap-5' style={{fontFamily: 'Roboto Condensed Variable'}}>
                    <a onClick={() => navigate('/levels')} className='rounded-full cursor-pointer text-center transition-all duration-300 ease-in-out transform hover:scale-105' 
                        style={{...menuBtnStyle, background: '#2EBE33'}}>PLAY</a>
                    <a onClick={() => navigate('/leaderboards')} className='rounded-full cursor-pointer text-center transition-all duration-300 ease-in-out transform hover:scale-105' 
                        style={{...menuBtnStyle, background: '#5d5d5d'}}>LEADERBOARDS</a>
                    <a onClick={() => navigate('/how2play')} className='rounded-full cursor-pointer text-center transition-all duration-300 ease-in-out transform hover:scale-105' 
                        style={{...menuBtnStyle, background: '#5d5d5d'}}>HOW TO PLAY</a>
                    <a onClick={() => navigate('/about')} className='rounded-full cursor-pointer text-center transition-all duration-300 ease-in-out transform hover:scale-105' 
                        style={{...menuBtnStyle, background: '#5d5d5d'}}>ABOUT US</a>
                </nav>
            </main>
        </div>
    );
}

export default MainMenu;