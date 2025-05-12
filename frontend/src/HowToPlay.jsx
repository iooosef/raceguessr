import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgVideo from './assets/tutorial.mp4';
import SignOutIcon from './assets/signout-btn.png';
import { useConfig } from './util/ConfigContext';
import { useUser } from './auth/UserContext';
import SVGBack from './components/SVGBack';

import ProfileHeader from './components/ProfileHeader';

const HowToPlay = () => {
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
            <video autoPlay muted loop controls className='w-full h-full fixed top-0 left-0 object-cover z-0' >
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <header className='w-full fixed top-0 flex justify-between p-4'>
                <div></div>
                <div>
                    <a onClick={() => navigate('/menu')} type="button">
                        <SVGBack className='h-[50px] text-white font-bold text-4xl cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-110' />
                    </a>
                </div>
            </header>
        </div>
    );
}

export default HowToPlay;