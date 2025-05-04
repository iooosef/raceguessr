import React from 'react';
import bgVideo from './assets/menu-bg.mp4';
import bannerLogo from './assets/banner-logo.png'
import bannerTagline from './assets/banner-tagline.png'
import SignOutIcon from './assets/signout-btn.png';

const MainMenu = () => {
    const menuBtnStyle = {
        minWidth: '300px',
        padding: '0.5rem',
        fontStyle: 'italic',
        fontWeight: '900',
        fontSize: '1.8rem',
        lineHeight: '2.25rem',
        color: '#fff'
    }

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center relative'>
            <video autoPlay='true' muted='true' loop='true' className='w-full h-full fixed top-0 left-0 object-cover z-0' >
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <header className='w-full fixed top-0 flex justify-between p-4'>
                <div id='user-info-container' className='px-4 py-2 flex items-center gap-5 italic font-bold rounded-2xl
                    transition-all duration-300 ease-in-out transform hover:scale-105'
                    style={{background: '#2c3e50', fontFamily: 'Roboto Condensed Variable', fontSize: '1.2em'}}>
                    <span className='text-white'>Display Name</span>
                    <span style={{color: '#f1c40f'}}>Score: 00000</span>
                </div>
                <div>
                    <button type="button">
                        <img src={SignOutIcon} alt="sign out button" className='h-[50px] transition-all duration-300 ease-in-out transform hover:scale-105' />
                    </button>
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