import React, { useEffect, useState } from 'react';
import bgVideo from './assets/menu-bg.mp4';
import bannerLogo from './assets/banner-logo.png'
import bannerTagline from './assets/banner-tagline.png'
import SignOutIcon from './assets/signout-btn.png';
import { useConfig } from './util/ConfigContext';
import { useUser } from './auth/UserContext';

import ProfileHeader from './components/ProfileHeader';

const MainMenu = () => {
    console.log("MainMenu here")
    const {serverUrl} = useConfig();
    const { user, loading } = useUser();
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        if (user || loading === false) {
            setIsUserLoaded(true);
        }
    }, [user, loading]);

    useEffect(() => {
        if (!serverUrl) return;
    }, [serverUrl]);


    const menuBtnStyle = {
        minWidth: '300px',
        padding: '0.5rem',
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
                    <a href='/logout' type="button">
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
                    <button className='rounded-full transition-all duration-300 ease-in-out transform hover:scale-105' 
                        style={{...menuBtnStyle, background: '#2EBE33'}}>PLAY</button>
                    <button className='rounded-full transition-all duration-300 ease-in-out transform hover:scale-105' 
                        style={{...menuBtnStyle, background: '#5d5d5d'}}>LEADERBOARDS</button>
                </nav>
            </main>
        </div>
    );
}

export default MainMenu;