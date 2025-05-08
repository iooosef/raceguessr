import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfig } from './util/ConfigContext';
import { useUser } from './auth/UserContext';
import ProfileHeader from './components/ProfileHeader';
import SVGBack from './components/SVGBack';
import MiniMap from './components/MiniMap';

const RaceGuessr = () => { 
    // if levelUrl is null, it means infinite play
    const location = useLocation();
    const { levelUrl = null } = location.state || {};
    console.log("🤞levelUrl: ", levelUrl);
    const {serverUrl} = useConfig();
    const { user, loading } = useUser();
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const navigate = useNavigate();

    const [level, setLevel] = useState(null);
    const [currentIdx, setCurrentIdx] = useState(0)
    const [subject, setSubject] = useState({});
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current || !serverUrl || !levelUrl) return;
    
        hasFetched.current = true;
    
        fetch(`${serverUrl}${levelUrl}`, {
            method: 'GET', 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setLevel(data)
            setCurrentIdx(0)
        })
        .catch(err => {
            console.error('Error fetching levels: ', err)
        });
    }, [serverUrl, levelUrl]);

    useEffect(() => {
        if (!serverUrl || !level) return;
        const currentId = level[currentIdx].id
        fetch(`${serverUrl}/subjects?id=${currentId}`, {
            method: 'GET', 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setSubject(data)
        })
        .catch(err => {
            console.error('Error fetching subject: ', err)
        });
    }, [currentIdx, level]);
    
    return(
        <div className="w-screen h-full p-6 bg-guessr flex flex-col items-center " data-theme="light">            
            <header className='w-full fixed top-0 flex justify-between p-4 z-10'>
                <ProfileHeader headerText={'Guess the country ' + (levelUrl !== null ? `(${currentIdx + 1}/${level?.length})` : '')} />
                <div>
                    <a onClick={() => navigate('/levels')}  type="button">
                        <SVGBack className='h-[50px] text-white font-bold text-4xl cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-110' />
                    </a>
                </div>
            </header>
            <div className='max-h-full pt-16'>
                <img src={`${serverUrl}/subjects/A${currentIdx + 10}.jpg`} className='h-full max-w-full block m-auto' />
            </div>
            <MiniMap />
        </div>
    )
}

export default RaceGuessr;